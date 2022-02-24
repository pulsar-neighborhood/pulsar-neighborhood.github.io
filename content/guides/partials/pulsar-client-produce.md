---
title: Pulsar client produce
---

Otherwise known as _producing_ a message. Pulsar will create a new topic named "my-first-topic" automatically.

```bash
./bin/pulsar-client produce "my-first-topic" --messages "Hello there"
```

There will be quite a bit of feedback output to the screen. Upon a successful publish, the last line should be...

```bash
...
[main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 1 messages successfully produced
```
