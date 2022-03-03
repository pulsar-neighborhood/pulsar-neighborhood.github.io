---
title: "Managing a Pulsar cluster with Terraform"
date: 2022-03-03T11:07:39-05:00
draft: false
type: guide
categories: # must be lowercase shishkabob
    - cluster-administration
tags:
    - terraform
    - administration
level: 200
summary: Use a community supported Terraform provider to manage Pulsar clusters
imgUrl:
author:
    name: David Dieruf
    imgUrl:
---

In this guide we will be using [quantummetric Terraform provider](https://registry.terraform.io/providers/quantummetric/pulsar/latest) with a pre-made Terraform manifest to create a tenant, namespace, and topic within an existing Pulsar cluster.

{{< warning >}}
This terraform provider does not create Pulsar clusters (or a broker). This is for managing existing cluster(s).
{{< /warning >}}

## Prerequisites

[Terraform Cli](https://www.terraform.io/downloads.html) 0.10+

## Steps

### Start a standalone broker

{{< guide-partial file="start-standalone-broker" >}}

### Get the deployment manifest

This manifest uses the `pulsar_cluster`, `pulsar_tenant`, `pulsar_namespace`, and `pulsar_topic` providers to chain together a topic creation. You can go much further than with these providers! Read more about the providers [here](https://github.com/quantummetric/terraform-provider-pulsar).

```bash
wget {{< baseurl >}}manifests/terraform.tf
```

### Deploy the manifest

```bash
terraform init
terraform apply
```

### Send a message to the Broker

{{< guide-partial file="pulsar-client-produce" tenant-name="tf-tenant" namespace="tf-namespace" topic-name="tf-topic" >}}

### Get messages from the Broker

{{< guide-partial file="pulsar-client-consume" tenant-name="tf-tenant" namespace="tf-namespace" topic-name="tf-topic" >}}

## Summary

Pretty easy eh? We created a (quick) pulsar instance, applied a Terraform config, and proved the new topic by producing/consuming messages. The config was a bare minimum example that created a new tenant, namespace, and topic. Now it's time to get a little deeper in to what these providers are really do. Read more about all their features [here](https://github.com/quantummetric/terraform-provider-pulsar).
