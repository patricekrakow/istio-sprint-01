```text
$ az group create --name patrice-group-2021-02-01 --location westeurope
... see below ...
```

```text
$ az aks create \
  --resource-group patrice-group-2021-02-01 \
  --name patrice-cluster-01-2021-02-01 \
  --enable-managed-identity \
  --generate-ssh-keys
SSH key files '/home/patrice_krakow/.ssh/id_rsa' and '/home/patrice_krakow/.ssh/id_rsa.pub' have been generated under ~/.ssh to allow SSH access to the VM. If using machines without permanent storage like Azure Cloud Shell without an attached file share, back up your keys to a safe location
... see below ...
```

```text
$ az aks get-credentials \
  --resource-group patrice-group-2021-02-01 \
  --name patrice-cluster-01-2021-02-01
Merged "patrice-cluster-01-2021-02-01" as current context in /home/patrice_krakow/.kube/config
```

```text
$ az group delete --name patrice-group-2021-02-01 --yes
az group delete --name MC_patrice-group-2021-02-01_patrice-cluster-01-2021-02-01_westeurope --yes
```
