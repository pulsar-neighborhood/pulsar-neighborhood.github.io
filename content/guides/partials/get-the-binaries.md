---
title: Get the binaries
---

Pulsar is developed for 64-bit Java. To run the binaries you need either the Java Runtime Environment(JRE) or Java Developer Kit(JDK) version 8 or later installed. Installers and more info [available here](https://adoptopenjdk.net/installation.html).

With a Java environment in place, all popular 64-bit desktops are supported - Windows, Linux, and MacOS. The tarball is around 300mb, so please be patient while downloading.

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
