# # Dockerfile
# FROM ubuntu:20.04

# RUN apt-get update \
#     && apt-get install -y \
#       curl \
#       python-dev

# WORKDIR /root
# COPY hello.py .
# ENV my_ver 1.0

# CMD ["python", "hello.py", "guest"]

# # 환경변수 사용 dockerfile sample
# FROM ubuntu:18.04

# RUN apt-get update \
#     && apt-get install -y \
#         curl \
#         python-dev

# ARG my_ver=1.0

# WORKDIR /root
# COPY hello.py .
# ENV my_ver $my_ver
# CMD ["python", "hello.py", "guest"]

# Dockerfile - entrypoint
FROM ubuntu:20.04

RUN apt-get update \
    && apt-get install -y \
      curl \
      python-dev

WORKDIR /root
COPY hello.py .
ENV my_ver 1.0

# CMD ["python", "hello.py", "guest"]
# ENTRYPOINT ["python", "hello.py", "guest"]
ENTRYPOINT ["python", "hello.py"]