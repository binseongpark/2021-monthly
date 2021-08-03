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

# 이미지 tag 달기
```sh
docker tag nginx lemonbin/nginx

...

docker images

...

docker push lemonbin/nginx
```

# 이미지 다운로드
```sh
docker pull <IMAGE_NAME>
```

# 이미지 삭제
```sh
docker rmi <IMAGE_NAME>
```

# 도커 빌드
```sh
docker build <PATH> -t <IMAGE_NAME>:<TAG>
docker build . -t hello:1
```

```sh
docker run hello:1
docker run hello:1 echo "Hello world!"
docker run hello:1 cat hello.py
docker run hello:1 pwd

docker run -e KEY=VALUE <REGISTRY>/<IMAGE>:<TAG>
docker run -e my_ver=1.5 hello:1
```

# ARG
```sh
docker build . -t hello:2 --build-arg my_ver=2.0
docker run -e my_ver=2.5 hello:2
```
이미지 빌드, 실행 시 Dockerfile 내에 `ARG`지시자를 이용하여 덮어서 사용가능

# ENTRYPOINT
CMD 와 유사하나 실행 명령이 override 되지 않고 실행 가능한 이미지를 생성
```sh
docker run hello:3 pwd
```
위 처럼 날려도 이미지에 말려있는 ENTRYPOINT 가 실행됨

```sh
FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y \
      curl \
      python-dev

WORKDIR /root
COPY hello.py .
ENV my_ver 1.0

ENTRYPOINT ["python", "hello.py"]
```

```sh
docker run hello:4 new-guest
hello new-guest, my version is 1.0!
```
명령어가 override 가 되지 않고 python 파일에 파라미터로 전달

# Network
외부의 트래픽을 컨테이너 내부로 전달하기 위해 로컬 호스트 서버와 컨테이너의 포트를 매핑시켜 트래픽을 포워딩
```sh
docker run -p <HOST_PORT>:<CONTAINER_PORT> <IMAGE_NAME>
```

```sh
docker run -p 5000:80 -d nginx

curl localhost:5000
# <!DOCTYPE html>
# <html>
# <head>
# <title>Welcome to nginx!</title>
# <style>
# ...
```

# 공인 IP 확인
```sh
curl ifconfig.co
```

# Volume
```sh
docker run -v <HOST_DIR>:<CONTAINER_DIR> <IMAGE_NAME>
```
컨테이너는 휘발성 프로세스이기 때문에 컨테이너 내부의 데이터를 영구적으로 저장 할 수 없다. 컨테이너의 데이터를 지속적으로 보관하기 위해서는 볼륨이라는 것을 사용. 컨테이너 실행 시, 로컬 호스트의 파일시스템을 컨테이너와 연결하여 필요한 데이터를 로컬 호스트에 저장할 수 있다.

```sh
docker run -p 6000:80 -v $(pwd):/usr/share/nginx/html/ -d nginx

echo hello! >> $(pwd)/hello.txt

curl localhost:6000/hello.txt
```

# Entrypoint
ENTRYPOINT 는 override 가 되지 않지만, --entrypoint라는 옵션으로 ENTRYPOINT를 강제로 override 하는 방법이 있다
```sh
FROM ubuntu:18.04

ENTRYPOINT ["echo"]
```

```sh
docker build . -t lets-echo

docker run lets-echo hello
# hello

docker run lets-echo cat /etc/password
# cat /etc/password
# 그대로 에코만 된다

docker run --entrypoint=cat lets-echo /etc/passwd
# root:x:0:0:root:/root:/bin/bash
# daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
# bin:x:2:2:bin:/bin:/usr/sbin/nologin
# sys:x:3:3:sys:/dev:/usr/sbin/nologin
# sync:x:4:65534:sync:/bin:/bin/sync

# override 옵션을 이용하여 cat 으로 override 된 모습
```

# Clean up
```sh
docker rm $(docker ps -aq) -f
docker rmi $(docker images -q) -f
```