---
title: Pulsar client produce
---

Otherwise known as _producing_ a message. Pulsar will create a new topic (if it doesn't already exist) named "{{topic_name}}".

```bash
./bin/pulsar-client --url "{{url}}/{{tenant_name}}/{{namespace}}/" produce "{{topic_name}}" --messages "Hello there"
```

There will be quite a bit of feedback output to the screen. Upon a successful publish, the last line should be...

> [main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 1 messages successfully produced
