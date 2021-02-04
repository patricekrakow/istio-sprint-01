```text
$ docker --version
Docker version 19.03.12, build 48a66213fe
```

```text
$ cd ~/environment/istio-sprint-01/scenario-00/s0-client-x-v1.0.0
$ docker build --tag patrice1972/s0-client-x:1.0.0 .
...
Successfully tagged patrice1972/s0-client-x:1.0.0
```

```text
$ docker run --network="host" patrice1972/s0-client-x:1.0.0
```

```text
$ docker login
...
Login Succeeded
```

```text
$ docker push patrice1972/s0-client-x:1.0.0
...
```
