---
title: "Getting Started with binaries"
date: 2022-02-22T12:20:41-05:00
draft: false
summary: This guide is for getting started using the Pulsar binaries. Lets do this!
tags:
    - binaries
---

This guide is for getting started using the Pulsar binaries. Lets do this!

## Steps

### Get the Pulsar binaries

{{< guide-partial "get-the-binaries" >}}

### Start the Pulsar broker

Pulsar has quite a few supporting services (Bookkeeper, Zookeeper, etc). Within the main binary there is a `standalone` command that will run everything needed. Learn more about the command [here](https://pulsar.apache.org/docs/en/reference-cli-tools/#standalone).

```bash
# This will run the broker in the background (where you can't see logs)
./bin/pulsar-daemon start standalone

# Switch to this, in a new terminal, to run the Broker in the current thread
#./bin/pulsar standalone
```

### Send a message to the Broker

{{< guide-partial "pulsar-client-produce" >}}

### Get messages from the Broker

{{< guide-partial "pulsar-client-consume" >}}

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
