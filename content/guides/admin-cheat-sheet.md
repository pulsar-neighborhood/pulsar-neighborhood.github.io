---
title: "Admin cheat sheet of commands"
date: 2022-02-24T13:42:16-05:00
draft: false
type: guide
categories: # must be lowercase shishkabob
    - cheat-sheet
tags:
    - pulsar-admin
level: 100
summary:  Cheat sheet of admin commands
---

## Prerequisites

To run these commands you'll need the binaries installed...

{{< guide-partial "get-the-binaries" >}}

## Admin commands

List tenants

```bash
bin/pulsar-admin tenants list
```

List namespaces within a tenant

```bash
bin/pulsar-admin namespaces list "public"
```

List topics within a namespace

```bash
bin/pulsar-admin topics list "public/default"
```

Create a persistent topic

```bash
bin/pulsar-admin topics create "persistent://public/default/a-new-topic"
```

Create a non-persistent topic

```bash
bin/pulsar-admin topics create "non-persistent://public/default/a-new-topic"
```

Forcefully delete a topic (close all producers/consumers/replicators & delete schemas)

```bash
bin/pulsar-admin topics delete -f -d "persistent://public/default/a-new-topic"
```

Get stats about a topic (includes active subscriptions, active publishers, messages in, and other interesting things)

```bash
bin/pulsar-admin topics stats "persistent://public/default/a-new-topic"
```

List message for a subscription

```bash
bin/pulsar-admin topics peek-messages --count 1 -s "my-subscription" "persistent://public/default/a-new-topic"
```

Get the latest message details

```bash
bin/pulsar-admin topics examine-messages --initialPosition latest --messagePosition 1 "persistent://public/default/a-new-topic"
```

Reset subscription cursor back to 0 (the first message in the queue), in ledger 0 (the first ledger)

```bash
bin/pulsar-admin topics reset-cursor --messageId 0:0 -s "my-subscription" "persistent://public/default/a-new-topic"
```

## Troubleshooting

As you interact with the admin client, it helps to have messages loaded. Publish a message to a topic (the topic will be created as persistent, if it doesn't exist)

```bash
bin/pulsar-client produce "persistent://public/default/a-new-topic" --messages "Hello there"
```
