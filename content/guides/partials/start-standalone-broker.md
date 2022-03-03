---
title: Start standalone broker
---

{{< tabs tabTotal="3">}}
{{< tab tabName="Desktop" >}}

You'll need the [Pulsar binaries]({{< ref "/content/guides/getting-started/desktop/binaries.md" >}}).

```bash
./bin/pulsar-daemon start standalone
```

{{< /tab >}}
{{< tab tabName="Docker" >}}

```bash
docker run -d -p 6650:6650 -p 8080:8080 --name pulsar apachepulsar/pulsar:latest bin/pulsar standalone
```

{{< /tab >}}
{{< tab tabName="Kubernetes" >}}

```bash
kubectl apply -f {{< baseurl >}}manifests/standalone-k8s.yaml

# Start a port forward
kubectl -n pulsar port-forward service/pulsar-broker 6650:6650
kubectl -n pulsar port-forward service/pulsar-broker 8080:8080
```

{{< /tab >}}
{{< /tabs >}}
