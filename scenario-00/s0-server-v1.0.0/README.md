```text
$ docker --version
Docker version 19.03.12, build 48a66213fe
```

```text
$ cd ~/environment/istio-sprint-01/scenario-00/s0-server-v1.0.0
$ docker build --tag patrice1972/s0-server:1.0.0 .
...
Successfully tagged patrice1972/s0-server:1.0.0
```

```text
$ docker run --publish 3000:3000 --detach patrice1972/s0-server:1.0.0
```

```text
$ docker ps
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS                    NAMES
a01f5864ff9c        patrice1972/s0-server:1.0.0   "docker-entrypoint.s…"   12 seconds ago      Up 11 seconds       0.0.0.0:3000->3000/tcp   compassionate_dubinsky
```

```text
$ docker logs a01f5864ff9c --follow

```

```text
$ docker rm --force a01f5864ff9c
d039235fa274
```

```text
$ docker login
...
Login Succeeded
```

```text
$ docker push patrice1972/s0-server:1.0.0
...
```
