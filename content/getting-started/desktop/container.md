---
title: "Getting Started with containers"
date: 2022-02-22T12:20:41-05:00
draft: true
type: getting-started
showNewsletterSignup: false
navLinkName: Container
summary: Getting started with Pulsar using containers on your desktop
---

## Prerequisites

You're going to need virtualization enabled on your desktop and a container runtime. Options like Docker and containerd are a great choice.

## Steps

### Start the Pulsar broker

{{< tabs tabTotal="2">}}
{{< tab tabName="Docker Cli" >}}

```bash
docker start -d -p 6650:6650 -n pulsar -p 8080:8080 apachepulsar/pulsar:2.9.1 bin/pulsar standalone
```

{{< /tab >}}
{{< tab tabName="NerdCtl" >}}

```bash
nerdctl start -d -p 6650:6650 -n pulsar -p 8080:8080 apachepulsar/pulsar:2.9.1 bin/pulsar standalone
```

{{< /tab >}}
{{< /tabs >}}

### Get the Pulsar binaries

{{< tabs tabTotal="3">}}
{{< tab tabName="Bash" >}}

```bash
wget https://archive.apache.org/dist/pulsar/pulsar-2.9.1/apache-pulsar-2.9.1-bin.tar.gz
tar xvfz ./apache-pulsar-2.9.1-bin.tar.gz
cd ./apache-pulsar-2.9.1
```

{{< /tab >}}
{{< tab tabName="Powershell" >}}

```powershell
Invoke-WebRequest -Uri https://archive.apache.org/dist/pulsar/pulsar-2.9.1/apache-pulsar-2.9.1-bin.tar.gz -OutFile apache-pulsar-2.9.1-bin.tar.gz
tar xvfz ./apache-pulsar-2.9.1-bin.tar.gz
cd ./apache-pulsar-2.9.1
```

{{< /tab >}}
{{< tab tabName="Manual" >}}

Visit the [Pulsar Downloads page](https://pulsar.apache.org/download/) and choose the current stable version.
Expand the tarball and `cd` into the new directory.

{{< /tab >}}
{{< /tabs >}}

### Send a message to the Broker

Otherwise known as _producing_ a message. Pulsar will create a new topic named "my-first-topic" automatically.

```bash
./bin/pulsar-client produce "my-first-topic" --messages "Hello there"
```

### Get messages from the Broker

Otherwise known as _consuming_ messages. Similar to producing, if the topic does not exists Pulsar will create it.

```bash
./bin/pulsar-client consume "my-first-topic"
```

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
