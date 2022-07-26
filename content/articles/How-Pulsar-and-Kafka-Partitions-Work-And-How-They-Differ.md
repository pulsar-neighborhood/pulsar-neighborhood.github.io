---
title: "How Pulsar and Kafka Partitions Work (And How They Differ)"
date: 2022-05-13T15:16:04-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    #- at-the-edge
    #- cluster-administration
    #- getting-started
    #- machine-learning
    #- moving-to-pulsar
    #- newsletter
    #- project-news
    - pulsar-architecture
    - pulsar-components
    #- use-cases
tags:
    - partitions
    #- functions
    #- storage
level: 200
summary: Both Pulsar and Kafka aim to increase the amount of data that can be consumed and processed by horizontal scaling — spreading data across many partitions. This is possible thanks to parallel processing, wherein the data producer writes to multiple partitions and the consumer reads them. 
imgUrl: https://user-images.githubusercontent.com/16946028/168374625-c69691a5-420d-4dfd-8229-d0dcf8e03934.png
author:
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: Apache Pulsar & Apache Kafka use partitions in a similar fashion, but there are subtle differences in how the underlying technology. Read more to find out.
---

The purpose of stream processing platforms is to enable real-time, high-throughput data processing. In addition, decoupling the system that produces the data from the system that processes it helps us meet scaling demands.

Apache Kafka (developed by LinkedIn) is one of the most popular stream processing platforms. Later, Apache Pulsar was created to improve on some of Kafka’s constraints — namely, simple scaling and [geo-replication](https://pulsar.apache.org/docs/en/administration-geo/).

Both solutions aim to increase the amount of data that can be consumed and processed by horizontal scaling — spreading data across many partitions. This is possible thanks to parallel processing, wherein the data producer writes to multiple partitions and the consumer reads them.

## Pulsar and Kafka Partitions

Apache Pulsar and Apache Kafka use partitions in a similar fashion. However, there are subtle differences in how the underlying technology works. First, we’ll take a look at how they work conceptually, then we’ll get into the technical differences.

With both technologies, data goes into a topic. A topic is effectively a stream or queue of data. These systems aim to provide scalable ways to maintain real-time data processing, even when writing large amounts of data to these topics. A topic can have multiple producers and multiple consumers. Each producer can write data to the topic and the consumers can read it. Furthermore, each consumer independently keeps track of their position in the stream to ensure they are completely decoupled. If one consumer dies, the others can continue.

As mentioned previously, scale is achieved with partitions. Each topic can be split into multiple partitions, which then provide multiple entry and exit points for the data. For example, assume we have a system that’s writing many messages onto a topic. With one partition, the consumer reads and processes the messages sequentially. This works at a small scale and may be desirable if the messages need to be processed sequentially.

However, if the number of messages being produced outpaces the consumer, the consumer will never reach the end of the queue and latency between message production and processing will increase. The solution is to use multiple partitions which enable multiple consumers to be set up to process many messages simultaneously.

Pulsar and Kafka each combine two approaches to decide which partition a particular message should be written to: round robin and key based. Round robin — the default behavior for both — spreads the data evenly across all partitions. The producer simply adds messages to each partition one at a time until it reaches the end. Then, it goes back to the beginning and starts again. Round-robin consumers work the same way — a single consumer takes a message from each partition one at a time before returning to the beginning.

However, if we want to increase throughput, we can create multiple consumers — these are called consumer groups in Kafka and [shared subscriptions](https://www.datastax.com/blog/2019/11/subscriptions-multiple-groups-consumers-pulsar-topic) in Pulsar. In this case, each consumer is given a specific set of partitions. For example, if there were six partitions and two consumers in the consumer group or shared subscription, each consumer would be assigned three partitions. Each consumer would follow the round robin method the same way, but only across its three partitions. This only works if the application is horizontally scalable and messages can be processed simultaneously. If a particular order is needed, another approach must be taken.

One of these approaches is key-based partitioning, where the producer decides which partition a message should go on by using a particular key. For example, imagine we want all messages concerning a particular customer to be processed in order. We could use the customer ID as the partition key so messages are always sent to the same partition. The consumer will then process the messages in this partition sequentially, maintaining their order.

Again, if we had multiple consumers in the same consumer group or shared subscription, each consumer would be assigned specific partitions so the consumer would still process messages in order. The downside of this approach is the potential for partition skew. If a single customer produces 80 percent of the data, then one partition will handle 80 percent of the data — which can reduce throughput.

### Key Differences

The main differences between Kafka and Pulsar relate to how they deal with resiliency. When dealing with large, time-dependent systems, it’s important to consider their resiliency if part of the system fails. For example, if one of the brokers hosting a partition dies, what happens to the data that’s been written to it? How do we continue consuming new data?

Kafka enables resiliency by replicating partitions across multiple brokers — ideally, at least three. One partition becomes the lead while the other two receive copies of the data. If the broker containing the lead partition dies, one of the other partitions is hot-swapped in and replication to the third partition will resume as soon as the third broker is re-instantiated. While this does provide resiliency, bringing the broker back up can be a slow process because data and state information are stored within the broker.

Pulsar, on the other hand, has stateless brokers. The brokers themselves don’t store any data. They simply handle incoming requests and the dispatching of data. This means that, unlike Kafka, any broker can quickly be spun up after a failure. Data in Pulsar is stored with [Apache BookKeeper](https://bookkeeper.apache.org/), which handles replication across multiple “bookies” (servers) and provides resiliency. If a bookie dies, then the Pulsar brokers simply start reading and writing from one of the failovers without much degradation in performance. BookKeeper handles the hard work of bringing up a new bookie.

Finally, there are other non-partition-related benefits to Apache Pulsar — like geo-replication across multiple physical locations — which are not possible in Kafka with the paid Confluent Cloud service.

## Conclusion

Apache Kafka is a tried and tested technology that enables high throughput data systems. It uses partitions to enable scale, increasing data throughput and resiliency through replication. Apache Kafka is famous for providing high throughput over low latency.

Apache Pulsar is considered favorable for lower latency. Although it uses partitions in a similar way to Kafka, the data is stored within a separate service: Apache BookKeeper. This separation means that Pulsar brokers are faster to spin up and re-instantiate compared to Kafka, as they are stateless and do not store any data. This can be a vital difference if our system requires low latency, real-time processing. We can be sure that brokers will not be out of action for as long. Learn more about [Apache Pulsar](https://pulsar.apache.org/).
