# 컨테이너 실행
```sh
kubectl run <NAME> --image <IMAGE>
kubectl run mynginx --image nginx
# pod/mynginx
```

# Pod 상태 정보 자세히 보기
```sh
kubectl get pod mynginx -o yaml
```

# Pod IP 확인
```sh
kubectl get pod -o wide
```

# 컨테이너 상세정보 확인
```sh
kubectl describe pod <NAME>
kubectl describe pod mynginx
# get 과 비슷하나 describe 로 확인하면 이벤트 기록까지 확인 가능
```

# 컨테이너 로깅
```sh
kubectl logs <NAME>
kubectl logs -f mynginx
```

# 컨테이너 명령 전달
```sh
kubectl exec <NAME> -- <CMD>
kubectl exec mynginx -- apt-get update
kubectl exec -it mynginx -- bash
```

# 컨테이너/호스트간 파일 복사
```sh
kubectl cp <TARGET> <SOURCE>
```

# 컨테이너 정보 수정
```sh
kubectl edit pod <NAME>
```

# 컨테이너 삭제
```sh
kubectl delete pod <NAME>
```

# yaml 기반의 컨테이너 생성
```sh
kubectl apply -f <FILE_NAME>
kubectl apply -f mynginx.yaml
# 웹에 있는 yaml 로도 가져다 사용할 수 있음

kubectl apply -f https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/pods/simple-pod.yaml
kubectl delete -f https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/pods/simple-pod.yaml
```

# Namespace
- default: 기본 네임스페이스
- kube-system: 쿠버네티스의 핵심 컴포넌트들이 들어있는 네임스페이스. 해당 네임스페이스에 네트워크 설정, DNS 서버 등 중요한 역할을 담당하는 컨테이너가 존재
- kube-public: 외부로 공개 가능한 리소스를 담고 있는 네임스페이스
- kube-node-lease: 노드가 살아있는지 마스터에 알리는 용도로 존재

```sh
kubectl run mynginx-ns --image nginx --namespace kube-system

kubectl get pod mynginx-ns -n kube-system 

kubectl delete pod mynginx-ns -n kube-system
```

```sh
kubectl get pod -n kube-system
```

# --jsonpath
```sh
kubectl get node docker-desktop -o yaml
kubectl get node docker-desktop -o wide

# jsonpath 를 이용하여 ip 얻기
kubectl get node docker-desktop -o jsonpath="{.status.addresses[0].address}"
```
자세한 내용은 링크 참조 https://kubernetes.io/docs/reference/kubectl/jsonpath

# 모든 리소스 조회
```sh
kubectl api-resources
# NAME                              SHORTNAMES   APIVERSION                        NAMESPACED   KIND
# bindings                                       v1                                true         Binding
# componentstatuses                 cs           v1                                false        ComponentStatus
# configmaps                        cm           v1                                true         ConfigMap
```
NAMESPACED true 이면 네임스페이스 레벨의 리소스이고, false 이면 클러스터 레벨 리소스
네임스페이스 리소소의 대표적인 예는 Pod, 클러스터 레벨의 대표적인 리소스는 Node

```sh
# 네임스페이스 레벨의 API 리소스만 탐색
kubectl api-resources --namespaced=true
```

# 리소스 정의 설명
```sh
kubectl explain pods
```

# 클러스터 상태 확인
```sh
kubectl cluster-info
kubectl get node
kubectl get pod -n kube-system
```

# 클라이언트 설정 파일
```sh
kubectl config <SUBCOMMAND>

kubectl config view
# apiVersion: v1
# clusters:
# - cluster:
#     certificate-authority-data: DATA+OMITTED
#     server: https://kubernetes.docker.internal:6443
#   name: docker-desktop
# contexts:
```
kubectl 툴은 내부적으로 KUBECONFIG ($HOME/.kube/config) 설정 파일을 참조하여 마스터 주소, 인증 정보 등을 관리. kubectl의 설정값을 바꾸기 위해서 해당 파일을 직접 수정할 수도 있고, kubectl config 명령을 사용할 수도 있다. 

- clusters: kubectl 툴이 바라보는 클러스터 정보를 입력. 원격에 위치한 클러스터인 경우 원격 주소가 입력
- users: 쿠버네티스 클러스터에 접속하는 사용자를 정의
- contexts: cluster와 user를 연결해주는 것을 context 라고 한다. 

# cheatsheet

https://kubernetes.io/docs/reference/kubectl/cheatsheet

# Clean up
```sh
kubectl delete pod --all
```

# 템플릿 생성
```sh
kubectl run mynginx --image nginx --dry-run=client -o yaml > temp.yaml
```
- metadata: 리소스의 메타 정보를 표기
    - labels: 리소스의 라벨정보를 표기
    - name: 리소스의 이름을 표기
- spec: 리소스의 스펙을 정의. spec 은 리소스마다 다르게 정의됨
    - containers: 1개 이상의 컨테이너를 정의
        - name: 컨테이너의 이름을 표기
        - image: 컨테이너의 이미지 주소를 지정

`kubectl run <NAME> 을 이용하면 run=<NAME> 라벨이 자동으로 추가`

# 라벨 정보 확인
```sh
# hello 라벨값 표시
k get pod mynginx -L hello
# NAME      READY   STATUS    RESTARTS   AGE   HELLO
# mynginx   1/1     Running   0          23s   world

# 전체 라벨 확인
k get pod mynginx --show-labels
# NAME      READY   STATUS    RESTARTS   AGE   LABELS
# mynginx   1/1     Running   0          70s   hello=world
```

# nodeSelector
라벨링 시스템을 이용하여 Pod 가 특정 노드에 할당되도록 설정 가능
```sh
  nodeSelector:
    disktype: ssd
```
노드의 `disktype`라벨이 ssd 인 노드에 할당. 만약 2개 이상의 노드에 동일한 라벨이 부여되어 있을 경우, 노드의 상태를 확인하여 최적의 노드를 선택해서 할당

# 실행 명령 및 파라미터 지정
- command: 컨테이너의 시작 실행 명령을 지정. 도커의 ENTRYPOINT 에 대응되는 property
- args: 실행 명령에 넘겨줄 파라미터를 지정. 도커의 CMD 에 대응되는 property
- restartPolicy: Pod 재시작 정책을 설정
    - Always: Pod 종료 시 항상 재시작을 시도(default)
    - Never: 재시작을 시도하지 않음
    - OnFailure: 실패 시에만 재시작을 시도


# 환경변수
```sh
# env.yaml
apiVersion: v1
kind: Pod
metadata:
  name: env
spec:
  containers: 
  - name: nginx
    image: nginx
    env:
    - name: hello
      value: "world!"
```

```sh
k exec env -- printenv | grep hello
# PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
# HOSTNAME=env
# hello=world! # here~
# KUBERNETES_PORT_443_TCP_PROTO=tcp
# KUBERNETES_PORT_443_TCP_PORT=443
# KUBERNETES_PORT_443_TCP_ADDR=10.96.0.1
# KUBERNETES_SERVICE_HOST=10.96.0.1
# KUBERNETES_SERVICE_PORT=443
# KUBERNETES_SERVICE_PORT_HTTPS=443
# KUBERNETES_PORT=tcp://10.96.0.1:443
# KUBERNETES_PORT_443_TCP=tcp://10.96.0.1:443
# NGINX_VERSION=1.21.1
# NJS_VERSION=0.6.1
# PKG_RELEASE=1~buster
# HOME=/root
```

# 볼륨 연결
- volumeMounts: 컨테이너 내부에 사용될 볼륨을 선언
    - mountPath: 컨테이너 내부에 볼륨이 연결될 위치를 지정
    - name: volumeMounts와 volumes을 연결하는 식별자
- volumes: Pod에서 사용할 volume 을 지정
    -name: volumeMounts와 volumes을 연결하는 식별자
    - hosPath: 호스트 서버의 연결위치를 지정

```sh
k exec volume -- ls /container-volume
```

```sh
# volume-empty.yaml
apiVersion: v1
kind: Pod
metadata:
  name: volume-empty
spec:
  containers: 
  - name: nginx
    image: nginx
    volumeMounts:
    - mountPath: /container-volume
      name: my-volume
  volumes:
  - name: my-volume
    emptyDir: {}
```
위처럼 만들면 컨테이너 내부에 데이터를 저장하는 것과 다르지 않지만 여러개가 떠있을경우 서로 디렉토리를 공유한다는 점이 다름


# 리소스 관리

## request
Pod가 보장받을 수 있는 최소 리소스 사용량을 정의
```sh
# requests.yaml
apiVersion: v1
kind: Pod
metadata:
  name: requests
spec:
  containers: 
  - name: nginx
    image: nginx
    resources:
      requests:
        cpu: "250m"
        memory: "500Mi"
```
1000m은 1core
250m은 0.25core

1Mib(2^20 bytes)

## limits
Pod가 최대로 사용할 수 있는 최대 리소스 사용량을 정의

# 상태 확인

## livenessProbe
컨테이너가 정상적으로 살아있는지 확인하기 위해 livenessProbe property를 이용. Pod가 정상동작하는지 확인하며, 자가치유를 위한 판단 기준으로 활용

## readinessProbe
Pod 생성 직후, 트래픽을 받을 준비가 완료되었는지 확인하는 property. Jenkins 서버와 같이 처음 구동하는데에 시간이 오래 걸리는 웹 서비스라면 구동이 완료된 이후에 트래픽을 받아야 함. 이런 경우, readinessProbe을 통해서 해당 Pod의 초기화가 완료되었다는 것을 쿠버네티스에 알리는 용도로 사용

```sh
# readiness-cmd.yaml
apiVersion: v1
kind: Pod
metadata:
  name: readiness-cmd
spec:
  containers: 
  - name: nginx
    image: nginx
    readinessProbe:
      exec:
        command:
        - cat
        - /tmp/ready
```

```sh
# 아래 코드 이전은 ready 가 되지 않음
kubectl exec readiness-cmd -- touch /tmp/ready
# readinessProbe 가 통과하여 ready 상태가 됨
```
명령 실행을 통해서도 정상 여부를 확인할 수 있음

# 2개 컨테이너 실행
```sh
# second.yaml
apiVersion: v1
kind: Pod
metadata:
  name: second
spec:
  containers: 
  - name: nginx
    image: nginx
  - name: curl
    image: curlimages/curl
    command: ["/bin/sh"]
    args: ["-c", "while true; do sleep 5; curl -s localhost; done"]
```

```sh
# 컨테이너가 두개라 그냥 로그를 실행하면 에러 발생
k logs -f second
# error: a container name must be specified for pod second, choose one of: [nginx curl]

# 컨테이너 지정
k logs -f second -c nginx
```

# 초기화 컨테이너
`init-container.yaml`파일 참조


# Config 설정

# ConfigMap 리소스 생성
```sh
kubectl create configmap <key> <data-source>

kubectl create configmap game-config --from-file=game.properties

kubectl get cm game-config -o yaml

# --from-literal
kubectl create configmap special-config \
    --from-literal=special.power=10 \
    --from-literal=special.strength=20

# yaml 로도 가능
kubectl apply -f monster-config.yaml
```

# 환경변수 - valueFrom
- env: 환경변수 사용을 선언
- name: 환경변수의 key를 지정
- valueFrom: 기존의 value property 대신 valueFrom 을 사용함으로써 다른 리소스의 정보를 참조하는 것을 선언
    - configMapKeyRef: ConfigMap의 키를 참조
        - name: ConfigMpa의 이름을 설정
        - key: ConfigMap내에 포함된 설정값 중 특정 설정값을 명시적으로 선택

```sh
# special-env.yaml
apiVersion: v1
kind: Pod
metadata:
  name: special-env
spec:
  restartPolicy: OnFailure
  containers:
  - name: special-env
    image: k8s.gcr.io/busybox
    command: [ "printenv" ]
    args: [ "special_env" ]
    env:
    - name: special_env
      valueFrom:
        configMapKeyRef:
          name: special-config
          key: special.power
```
`special-config 라는 ConfigMap 중 special.power 를 special-env 로 써라`

# 환경변수 - envFrom
```sh
# monster-env.yaml
apiVersion: v1
kind: Pod
metadata:
  name: monster-env
spec:
  restartPolicy: OnFailure
  containers:
  - name: monster-env
    image: k8s.gcr.io/busybox
    command: [ "printenv" ]
    # env 대신에 envFrom 사용
    envFrom:
    - configMapRef:
        name: monster-config
```
- envFrom: 기존 env 대신 envFrom 을 사용함으로써 ConfigMap 설정값을 환경변수 전체로 사용하는 것을 선언
    - configMapRef: ConfigMap의 특정키가 아닌 전체 ConfigMap을 사용하도록 설정
        - name: 사용하려는 ConfigMap의 이름을 지정

기존환경변수에 추가가 되는 듯

# Secret 리소스 생성
```sh
echo -ne admin | base64
echo ne password123 | base64
```

```sh
# user-info-stringdata.yaml
apiVersion: v1
kind: Secret
metadata:
  name: user-info-stringdata
type: Opaque
stringData:
  username: admin
  password: password123
```
stringData property를 이용하면 base64 인코딩을 직접 처리

--from-env-file 옵션을 이용하여 properties 파일로부터 Secret 을 만들수도 있음
```sh
kubectl create secret generic user-info-from-file \
    --from-env-file=user-info.properties
```

# Secret 활용
`secret-volume.yaml`, `secret-env.yaml`, `secret-envfrom.yaml` 참조