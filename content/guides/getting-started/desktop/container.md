---
title: "Getting Started with containers"
date: 2022-02-22T12:20:41-05:00
draft: false
summary: Getting started with Pulsar using containers on your desktop
tags:
    - container
meta:
    description: This is a guide to starting with containers, but you need virtualization enabled on desktop & container runtime.  Docker and containerd are a great choice.
---

## Prerequisites

You're going to need virtualization enabled on your desktop and a container runtime. Options like Docker and containerd are a great choice.

## Steps

### Start a standalone broker

```bash
docker run -d -p 6650:6650 -p 8080:8080 --name pulsar apachepulsar/pulsar:latest bin/pulsar standalone
```

### Get the Pulsar binaries

{{< guide-partial file="get-the-binaries" >}}

### Send a message to the Broker

{{< guide-partial file="pulsar-client-produce" >}}

### Get messages from the Broker

{{< guide-partial file="pulsar-client-consume" >}}

### Stop the Broker

If you chose to run the Broker in the current thread `Ctrl+c` will stop the process. To stop the background process:

{{< tabs tabTotal="2">}}
{{< tab tabName="Docker Cli" >}}

```bash
docker stop pulsar 
```

{{< /tab >}}
{{< tab tabName="NerdCtl" >}}

```bash
nerdctl stop pulsar 
```

{{< /tab >}}
{{< /tabs >}}

## Summary

It doesn't get any easier than that! You've successfully started a Pulsar instance, produced messages, and consumed messages. Let's move on to something a little more challenging.

<!-- {{< guide-next-steps page1="/getting-started/desktop/container.md" >}} -->

## Troubleshooting

> Error: JAVA_HOME not set, and no java executable found in...

The `JAVA_HOME` environment variable is a way of interacting with the runtime. Usually when this value is not set, that indicates there is no Java environment installed. Refer to the prerequisites.

> Popup window: How do you want to open this file?

This is a popup that appears in Windows when you try to execute an unknown type of binary. Refer to the prerequisites to install the Java environment.
