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