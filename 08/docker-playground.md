docker run docker/whalesay cowsay 'hello world!'

docker run -d nginx
-d 옵션으로 컨테이너 실행 시, CONTAINER_ID 가 리턴

# 컨테이너 조회
```
docker ps
```

# 컨테이너 로깅
```
docker logs <CONTAINER_ID>
```
```
docker logs -f 6c327f6b09150493fa031d39ff785fb61c364428dc45c21e91a8c73dccd9e6b4
```
-f 는 follow output 옵션


# Interactive 컨테이너
이미지를 실행 시, -it 옵션을 통해 직접 컨테이너 안으로 접속하여 작업할 수도 있다. -it 는 interactive (stdin, stdout 연결), tty (터미널 연결)의 약자이다. ubuntu 이미지를 실행하여 bash 쉘을 실행한다

```sh
docker run -it ubuntu:16.04 bash

...

cat /etc/os-release
# NAME="Ubuntu"
# VERSION="16.04.7 LTS (Xenial Xerus)"
# ID=ubuntu
# ID_LIKE=debian
# PRETTY_NAME="Ubuntu 16.04.7 LTS"
# VERSION_ID="16.04"
# HOME_URL="http://www.ubuntu.com/"
# SUPPORT_URL="http://help.ubuntu.com/"
# BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
# VERSION_CODENAME=xenial
# UBUNTU_CODENAME=xenial
```