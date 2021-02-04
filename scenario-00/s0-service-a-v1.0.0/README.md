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
1def82e2577220810fdb183830d93686b38a46351118257234d893ad3e980b5a
```

```text
$ docker ps
CONTAINER ID        IMAGE                            COMMAND                  CREATED             STATUS              PORTS                    NAMES
1def82e25772        patrice1972/s0-service-a:1.0.0   "docker-entrypoint.s…"   13 seconds ago      Up 12 seconds       0.0.0.0:8080->8080/tcp   adoring_davinci
```

```text
$ docker logs 1def82e25772 --follow

```

```text
$ docker rm --force 1def82e25772
1def82e25772
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
