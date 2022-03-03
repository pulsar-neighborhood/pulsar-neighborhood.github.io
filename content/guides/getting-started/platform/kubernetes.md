---
title: "Getting Started with Kubernetes"
date: 2022-02-22T12:20:41-05:00
draft: false
summary: This guide is for getting started using the Pulsar on Kubernetes
tags:
    - kubernetes
---

This guide is for getting started using the Pulsar on Kubernetes.

## Prerequisites

Pulsar is developed in 64-bit Java. To run the binaries you need either the Java Runtime Environment(JRE) or Java Developer Kit(JDK) version 8 or later installed. Installers and more info [available here](https://adoptopenjdk.net/installation.html).

With a Java environment in place, all popular 64-bit desktops are supported - Windows, Linux, and MacOS.

## Steps

### Start the Pulsar broker

Pulsar has quite a few supporting services (Bookkeeper, Zookeeper, etc). Within the main binary there is a `standalone` command that will run everything needed. Learn more about the command [here](https://pulsar.apache.org/docs/en/reference-cli-tools/#standalone).

```bash
kubectl apply -f {{< baseurl >}}manifests/standalone-k8s.yaml

# Start a port forward
kubectl -n pulsar port-forward service/pulsar-broker 6650:6650
```

### Get the Pulsar binaries

{{< guide-partial file="get-the-binaries" >}}

### Send a message to the Broker

{{< guide-partial file="pulsar-client-produce" >}}

### Get messages from the Broker

{{< guide-partial file="pulsar-client-consume" >}}

### Stop the Broker

```bash
kubectl delete -f {{< baseurl >}}manifests/standalone-k8s.yaml
```

## Summary

<!-- {{< guide-next-steps page1="/getting-started/desktop/container.md" >}} -->

## Troubleshooting

> Error: JAVA_HOME not set, and no java executable found in...

The `JAVA_HOME` environment variable is a way of interacting with the runtime. Usually when this value is not set, that indicates there is no Java environment installed. Refer to the prerequisites.

> Popup window: How do you want to open this file?

This is a popup that appears in Windows when you try to execute an unknown type of binary. Refer to the prerequisites to install the Java environment.
