# Scenario 0

Let's have **one** _API_, called `Zenlo API`, with **two** _API endpoints_:

* `get api-ing-com /path-zenlo-01`
* `get api-ing-com /path-zenlo-02`

Let's have a _service_, called `s0-service-a`, implementing the first _API endpoint_:

* `get api-ing-com /path-zenlo-01`, as defined in `Zenlo API`

Let's have a _service_, called `s0-service-b`, (authorized) implementing the second _API endpoint_:

* `get api-ing-com /path-zenlo-02`, as defined in `Zenlo API`

Let's have a _service_, called `s0-client-x`, (authorized) calling all _API endpoints_ from both _APIs_:

* `get api-ing-com /path-zenlo-01`, as defined in `Zenlo API`
* `get api-ing-com /path-zenlo-02`, as defined in `Zenlo API`

With a mesh properly configured, we should have the following traffic:

```text
s0-client-x -- get api-ing-com /path-zenlo-01 -----> 200 | s0-service-a
s0-client-x                                   -----X     | s0-service-b
s0-client-x -- get api-ing-com /path-zenlo-02 -----X     | s0-service-a
s0-client-x                                   -----> 200 | s0-service-b
```

## Setup

```text
$ az group create --name pk-group-01 --location westeurope
... see below ...
```

```text
$ az aks create \
  --resource-group pk-group-01 \
  --name pk-cluster-01 \
  --enable-managed-identity \
  --generate-ssh-keys
SSH key files '/home/patrice_krakow/.ssh/id_rsa' and '/home/patrice_krakow/.ssh/id_rsa.pub' have been generated under ~/.ssh to allow SSH access to the VM. If using machines without permanent storage like Azure Cloud Shell without an attached file share, back up your keys to a safe location
... see below ...
```

```text
$ az aks get-credentials \
  --resource-group pk-group-01 \
  --name pk-cluster-01
Merged "pk-cluster-01" as current context in /home/patrice_krakow/.kube/config
```

```text
$ curl -L https://istio.io/downloadIstio | sh -
...
Istio 1.8.2 Download Complete!
...
$ cd istio-1.8.2/
$ export PATH=$PWD/bin:$PATH
$ cd ..
$ istioctl version
no running Istio pods in "istio-system"
1.8.2
```

```text
$ istioctl install --set profile=demo -y
✔ Istio core installed
✔ Istiod installed
✔ Ingress gateways installed
✔ Egress gateways installed
✔ Installation complete
```

```text
$ kubectl get pods --namespace istio-system
NAME                                    READY   STATUS    RESTARTS   AGE
istio-egressgateway-7fc985bd9f-w74fr    1/1     Running   0          70s
istio-ingressgateway-58f9d7d858-cnsjl   1/1     Running   0          70s
istiod-7d8f784f96-jdhzh                 1/1     Running   0          102s
```

```text
$ kubectl label namespace default istio-injection=enabled
namespace/default labeled
```

```text
$ cd ~/environment/
$ cd istio-1.8.2/
$ kubectl apply -f samples/addons
...
```

> If there are errors trying to install the addons, try running the command again. There may be some timing issues which will be resolved when the command is run again.

```text
$ export INGRESS_HOST=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
$ export INGRESS_DOMAIN=${INGRESS_HOST}.nip.io
$ echo $INGRESS_DOMAIN
40.114.187.131.nip.io
```

### Configure Kiali

```text
cat <<EOF | kubectl apply -f -
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: kiali-gateway
  namespace: istio-system
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http-kiali
      protocol: HTTP
    hosts:
    - "kiali.${INGRESS_DOMAIN}"
---
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: kiali-vs
  namespace: istio-system
spec:
  hosts:
  - "kiali.${INGRESS_DOMAIN}"
  gateways:
  - kiali-gateway
  http:
  - route:
    - destination:
        host: kiali
        port:
          number: 20001
---
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: kiali
  namespace: istio-system
spec:
  host: kiali
  trafficPolicy:
    tls:
      mode: DISABLE
---
EOF
```

```text
$ echo kiali.${INGRESS_DOMAIN}
```

<http://kiali.40.114.187.131.nip.io>


```text
$ az group delete --name pk-group-01 --yes
az group delete --name MC_pk-group-01_pk-cluster-01_westeurope --yes
```
