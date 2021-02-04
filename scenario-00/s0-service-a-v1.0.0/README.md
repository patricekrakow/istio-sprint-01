```text
$ docker --version
Docker version 19.03.12, build 48a66213fe
```

```text
$ cd ~/environment/istio-sprint-01/scenario-00/s0-service-a-v1.0.0
$ docker build --tag patrice1972/s0-service-a:1.0.0 .
...
Successfully tagged patrice1972/s0-service-a:1.0.0
```

```text
$ docker run --publish 8080:8080 --detach patrice1972/s0-service-a:1.0.0
```

```text
$ docker ps
...
```

```text
$ docker logs ... --follow

```

```text
$ docker rm --force ...
...
```

```text
$ docker login
...
Login Succeeded
```

```text
$ docker push patrice1972/s0-service-a:1.0.0
...
```
