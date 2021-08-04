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