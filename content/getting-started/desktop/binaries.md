---
title: "Getting Started with binaries"
date: 2022-02-22T12:20:41-05:00
draft: false
type: getting-started
showNewsletterSignup: false
navLinkName: Binaries
summary: This guide is for getting started using the Pulsar binaries. Lets do this!
---

This guide is for getting started using the Pulsar binaries. Lets do this!

## Prerequisites

Pulsar is developed in 64-bit Java. To run the binaries you need either the Java Runtime Environment(JRE) or Java Developer Kit(JDK) version 8 or later installed. Installers and more info [available here](https://adoptopenjdk.net/installation.html).

With a Java environment in place, all popular 64-bit desktops are supported - Windows, Linux, and MacOS.

## Steps

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

### Start the Pulsar broker

Pulsar has quite a few supporting services (Bookkeeper, Zookeeper, etc). Within the main binary there is a `standalone` command that will run everything needed. Learn more about the command [here](https://pulsar.apache.org/docs/en/reference-cli-tools/#standalone).

```bash
# This will run the broker in the background (where you can't see logs)
./bin/pulsar-daemon start standalone

# Switch to this, in a new terminal, to run the Broker in the current thread
#./bin/pulsar standalone
```

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

```bash
./bin/pulsar-daemon stop standalone
```

## Summary

It doesn't get any easier than that! You've successfully started a Pulsar instance, produced messages, and consumed messages. Let's move on to something a little more challenging.

<!-- {{< guide-next-steps page1="/getting-started/desktop/container.md" >}} -->

## Troubleshooting

> Error: JAVA_HOME not set, and no java executable found in...

The `JAVA_HOME` environment variable is a way of interacting with the runtime. Usually when this value is not set, that indicates there is no Java environment installed. Refer to the prerequisites.

> Popup window: How do you want to open this file?

This is a popup that appears in Windows when you try to execute an unknown type of binary. Refer to the prerequisites to install the Java environment.
