
# deploy

kubectl create deployment nginx --image nginx

kubectl create deployment httpd-frontend --image=httpd:2.4-alpine

kubectl create deployment hello-minikube1 --image=k8s.gcr.io/echoserver:1.4
kubectl expose deployment hello-minikube1 --type=LoadBalancer --port=8080

# scale

kubectl scale deployment httpd-frontend --replicas3 

# namespace 개수

kubectl get ns --no-headers | wc -l

# 파드의 포트를 로컬 포트로 포워딩하기

kubectl port-forward

kubectl port-forward service/redis-master 7000:redis
kubectl port-forward pods/redis-master-765d459796-258hz 7000:6379

# yaml 뽑기

kubectl run nginx --image=nginx  --dry-run=client -o yaml
kubectl create deployment --image=nginx nginx --dry-run -o yaml
kubectl create service nodeport nginx --tcp=80:80 --node-port=30080 --dry-run=client -o yaml


# 다른 네임스페이스에 붙기
db-service.dev.svc.cluster.local

service selector 의 값들은 pod 의 metadata.labels. 밑에 값들이다

# context 조회하기

kubectl config get-contexts

# context 변경하기

kubectl config use-context gcp-context

# 노드 조회하기

kubectl get nodes

# kubectl이 알고있는 위치 및 사용자 인증 정보를 확인

kubectl config view

# 특정 namespace 에 pod 조회하기

kubectl get pod -n kube-system
kubectl get pod --namespace kube-system

# 특정 namespace 에 스케쥴러 로그 보기

kubectl logs kube-scheduler-docker-desktop --namespace=kube-system

# kubectl get pods 실시간으로 찍기
kubectl get pods -w

# 설정파일 yaml 형식으로 보기
kubectl get secret app-secret -o yaml

# base64 decode 하기
echo -n 'bxlzcWw=' | base64 --decode