---
title: Pulsar client consume
---

Otherwise known as _consuming_ messages. Similar to producing, if the topic does not exists Pulsar will create it.

```bash
./bin/pulsar-client --url "{{url}}/{{tenant_name}}/{{namespace}}/" consume "{{topic_name}}" -s "{{subscription_name}}"
```

There will be quite a bit of feedback output to the screen. Upon a successful connection, the last line should be...

>[main] INFO  org.apache.pulsar.client.cli.PulsarClientTool - 1 messages successfully consumed
