---
title: "Comparing Apache Pulsar Streaming and Kafka Streaming"
date: 2022-07-01T10:49:25-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    #- at-the-edge
    #- cluster-administration
    #- getting-started
    #- machine-learning
    - moving-to-pulsar
    #- newsletter
    #- project-news
    #- pulsar-architecture
    #- pulsar-components
    #- use-cases
tags:
    - stream-processing
level: 200
summary: This article examines how Pulsar and Kafka approach streaming by discussing their architectures and services. After briefly reviewing the definition of streaming, we’ll start our discussion with Kafka, since it’s the tool against which all others in the category are compared. We’ll then outline how Pulsar differs from and solves the problems Kafka leaves unaddressed — specifically, how it handles streaming.
imgUrl: https://user-images.githubusercontent.com/16946028/176911260-f6072ced-ce7c-4876-b1db-1faf77fce1df.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

The distributed architectures and microservices of the average application often require massive flows of data that needs to be processed in real time. This demand for data-driven and scalable applications created an industry-wide push to create more capable event streaming solutions. Among these solutions are Pulsar and Kafka, which different companies initially developed before being open-sourced and adopted by [Apache](https://www.apache.org/).

This article examines how Pulsar and Kafka approach streaming by discussing their architectures and services. After briefly reviewing the definition of streaming, we’ll start our discussion with Kafka, since it’s the tool against which all others in the category are compared. We’ll then outline how Pulsar differs from and solves the problems Kafka leaves unaddressed — specifically, how it handles streaming.

## Messaging

Because new messaging solutions have appeared so rapidly, some of the terminology is still in flux. For example, the terms “streaming” and “stream processing” are often used interchangeably. However, they’re slightly distinct concepts — though they both relate to queueing, messaging, publish/subscribe messaging, and batch processing. So, let’s define these terms to set a foundation for this discussion:

* **Messaging** is the transport, processing, and storage of data structures representing events or instructions, referred to as messages or records, typically communicating or coordinating components in a service or application. Message senders are called producers, and recipients are called consumers.

* **Streaming**, also called streaming data or event streaming, is data that is continuously generated as small messages, typically from many sources simultaneously.

* **Queueing**, also called point-to-point messaging or one-to-one messaging, is a form of asynchronous communication in which messages sent by a producer are stored in an intermediary channel (a queue) until they can be processed once by a single consumer and then deleted.

* **Batch processing** is the transport, processing, and storage of aggregate data, which must be downloaded before it can be manipulated. In the context of messaging, batch processing typically refers to the processing of small batches of data as systems like message queues generate them. Batch processing typically operates with latencies of minutes or hours.

* **Publish/subscribe messaging**, also called pub/sub, is a form of asynchronous communication in which producers publish messages to an intermediary channel (a topic) without the knowledge of the message’s consumers. Consumers subscribe to topics to consume messages.

* **Stream processing** is the transport, processing, and storage of messages at the level of individual records or micro-batches of streaming data. It allows complex or parallelized operations on multiple records, such as joins and aggregations. Stream processing operates with latencies in seconds or milliseconds.

Streaming is typically contrasted against queueing, but it’s more accurate to contrast streaming or stream processing against batch processing. As you’ll discover, some solutions — Pulsar included — use hybrid models, implementing limited queue-like functionality in a streaming pub/sub model.

You’ll also sometimes see real-time prefixed to event streaming or stream processing. In its strictest usage, real-time narrows these definitions to exclude micro-batching and emphasize the processing of infinite streams of individual events with millisecond latencies. Both concepts iterate on traditional, batch-processing-based messaging to function as a “nervous system” component for apps.

Kafka was developed at LinkedIn to provide real-time, low-latency data ingestion. Pulsar was developed as a Yahoo solution to address shortcomings in existing event streaming and open source messaging systems.

## Kafka

Kafka offers durable stream storage so that events can be processed either in real-time or retrospectively and, in theory, runs in almost any working environment, ranging from a single bare-metal server to distributed container workloads in the cloud.

Your application must either use an officially maintained Java library or one of the many community-provided clients for other languages to interface with one of Kafka’s five core APIs to implement Kafka:

* The Producer API
* The Consumer API
* The Streams API
* The Connect API
* The Admin API

The Connect API is designed to build connectors to external services, and the Admin API lets you manage and inspect Kafka objects. Still, the Streams API contributes the highest level tools for streaming.

To understand how Kafka handles streaming using the Streams API, you first need an understanding of the standard Kafka architecture and how its producer and consumer libraries handle event streams.

### Kafka Architecture

Kafka is structured as a set of servers and clients that communicate over TCP using a binary protocol. It uses a pub/sub messaging model and Apache ZooKeeper to handle metadata and administrative functions.

Server clusters can be massively distributed, but clusters spread over multiple geographic areas require additional configuration or extensions.

Clusters consist of servers acting in two roles:

* Some servers maintain external data streams to connect the cluster to other Kafka clusters and your applications.
* The other servers function as brokers, which form the storage layer and are ultimately the main nodes with which clients interact.

Clients interact with the server cluster to process event streams by writing to streams as producers or reading from streams as consumers.

Kafka defines its architecture using a few key components — some of which share names but not definitions — with concepts in Pulsar:

* A message is an immutable carrier of state change or an identification. This may be a payment, a notification, a metric, or any other action or event that can be described.
* Kafka stores each stream of messages on a broker as a sequence of records called a topic. Each topic stores events for a specified time rather than erasing them as soon as they’re consumed.
* Each topic is divided into sections called partitions.
* Each partition can be replicated, and the replicas are distributed to other cluster brokers.
* Consumers are typically organized in a consumer group.

There are several possible implementations of failover configurations using replicas, but the most straightforward uses a leader/replica arrangement. Clients reading or writing to a partition only interact with the leader partition, which then updates all its replicas.

### Implications for Streaming

Kafka’s design choices have a few implications for streaming.

Replicating partitions gives Kafka high throughput. Consumers can read from multiple partitions in parallel, which means that a group’s parallelism is determined by the number of partitions in a topic. You can set up systems to provide massive parallelism on the server-side for clients to take advantage of, and it’s easy to add large numbers of consumers without impacting performance.

However, each broker must be able to store an entire replica, so each node in a cluster requires a large storage volume. Additionally, Kafka can perform well at large scales, but the scaling process requires adding partitions and rebalancing them among brokers — typically a very error-prone and I/O-costly procedure.

Replicas also ensure that even if one or more servers fail, the cluster continues to run without any data loss. Lost replicas may affect total cluster throughput, but they can be replaced. If a server containing a topic’s leader partition fails, a new leader is selected from that partition’s replica pool on other servers.

Kafka topics decouple producers from consumers in a comparable way to most messaging systems, allowing clients to consume data at their own pace.

Kafka’s pull-based messaging for clients and its durable storage of messages on brokers ensure message replayability. For example, you can guarantee a consumer downstream receives each message at least once.

So, Kafka provides a simple, fast, and durable foundation for streaming.

### Kafka Stream Processing

In addition to consuming a stream and then performing a simple action on it, you may want to perform complex business logic on it and, optionally, publish it back into Kafka.

In theory, you could develop a stream processing application around a chain of clients using Producer and Consumer APIs. But the Streams API provides a simpler way to implement functionality like transforms directly, joins, and aggregations in a client and then send it downstream or back to the cluster.

Kafka Streams implements its parallelism by sectioning input streams and treating them as separate logical units for processing:

![image1](https://user-images.githubusercontent.com/16946028/176911506-41bcfef4-52fe-4871-9e3e-08baf23464d5.png)

* Each Kafka message maps to a data record.
* Each Kafka topic partition maps to a stream partition.
* Kafka Streams creates and assigns a task for each stream partition. The correlation between a specific task and its partition never changes.
* Each task configures its own buffer and processor topology based on its assigned partition and processes data records one at a time.
* You can assign one or more tasks to a thread to group, separate, and parallelize task processing. Threads are independent and require no coordination.

The independent nature of threads and their capability to guarantee [exactly-once processing](https://kafka.apache.org/documentation/#semantics) make Kafka suitable for sensitive applications like financial transaction processing.

## Pulsar

Pulsar combines the features of a pub/sub streaming model with those of a traditional distributed messaging system. It doesn’t distinguish between pub/sub messaging and streaming, and its stream processing functionality is integrated and deployed directly on nodes. Pulsar also natively supports multi-tenancy, which it implements above the namespace level, and geo-replication, which it implements at the instance level.

A defining feature of Pulsar is its additional separation of concerns beyond what Kafka achieves by decoupling message routing and service from message storage.

Additionally, Pulsar pushes messages to consumers rather than waiting for them to pull data. When they have finished processing a message, consumers in Pulsar send an acknowledgement, and the message is deleted.

Let’s examine how Pulsar’s architecture differs from Kafka’s to understand how it handles streaming.

### Pulsar Architecture

Pulsar is structured as a layered architecture containing servers and clients that communicate over TCP using a binary protocol.

A pulsar instance contains one or more clusters and uses a ZooKeeper cluster called the configuration store to provide native geo-replication between clusters.

A Pulsar cluster uses servers at its edge called brokers to interface with clients. Pulsar Brokers perform two primary functions:

* They connect clients to topics through an HTTP server exposing a REST interface.
* Brokers transfer data through an asynchronous TCP server called a dispatcher.

Pulsar relies on Apache BookKeeper for distributed persistent storage, so it uses a few BookKeeper concepts:

* An event or message maps to a log unit called an entry.
* A stream of entries is appended to the end of a topic’s ledger. Ledgers are append-only — entries can’t be modified once they’re written to a ledger — and are periodically closed to start a new ledger.
* Ledgers are split into fragments and distributed among servers called bookies.
* An entire ledger is distributed across an ensemble of bookies.
* Pulsar uses a cluster-specific ZooKeeper cluster to manage bookies.

Pulsar brokers can operate statelessly — they act as intermediaries between endpoints but don’t store persistent data — although, in practice, Pulsar uses a sort of limited statefulness for better performance:

* Each topic is owned by one broker that handles all read and write functions for that topic.
* A broker persists data in a topic by passing it to an ensemble. In the simplest case, a topic’s most recent entries exist in a single fragment, but fragments — and sometimes entries — are frequently distributed across multiple bookies.
* A broker can cache a topic’s managed ledger, which abstracts a single topic’s storage layer. A managed ledger contains a single writer appending to the ledger and multiple cursors representing consumers with their own positions in the stream.

### Persistent Messaging

Pulsar guarantees that messages that reach a Pulsar broker will be delivered to their intended targets.

In contrast to Kafka’s handling of undelivered messages, all messages in a Pulsar topic are retained by default, even if a consumer is disconnected. Pulsar only discards messages when a consumer acknowledges successful processing, which it does by default.

However, you can configure this behavior by using message retention to store instead messages that have been acknowledged or message expiry to set a duration past which unacknowledged messages will be deleted anyway.

Pulsar determines how messages are delivered by using one of three subscription modes for each subscription:

* Exclusive mode permits only a single consumer to attach to a subscription.
* Shared or round-robin mode distributes messages between multiple consumers.
* Failover mode permits multiple consumers but only delivers messages to one consumer, called the master consumer. When the master consumer disconnects, the next consumer in line becomes the master consumer.

Additionally, Pulsar can increase throughput for highly active topics by applying its own form of partitioning, which it implements internally as sub-topics, each with its own broker. Messages published to a partitioned topic are automatically routed to the right broker by Pulsar.

### Implications for Streaming

By decoupling the storage layer from message routing and using tiered storage, Pulsar achieves very low end-to-end latency while still guaranteeing message delivery. Cached managed ledgers allow clients to interact with Pulsar clusters without incurring disk reads or writes — sometimes achieving latencies under five milliseconds. Clients needing to read older messages in a backlog can still easily access ledgers offloaded to less expensive storage outside the ensemble.

Overall, storage in Pulsar is more easily scalable but not always as fast as Kafka’s sequential disk reads. Because data is often striped across multiple bookies, it isn’t easy to achieve comparable read speeds for large datasets.

However, topics are limited in size only by the total storage of an entire cluster of bookies, rather than being limited by the broker with the least storage in a Kafka cluster. Additionally, because Pulsar doesn’t rely on replicas, it can easily add more bookies to scale out to over a million topics per instance without needing to copy data or rebalance brokers.

Combined with Pulsar’s built-in geo-replication and multi-tenancy, these characteristics make it a strong choice for massively distributed applications that operate on extremely large files or large numbers of small messages, require guaranteed delivery, and may need characteristics of a queuing platform. However, its inability to provide exactly-once processing makes it unsuitable for highly sensitive applications, like those that handle financial transactions.

### Pulsar Stream Processing

Pulsar provides integrated stream processing capability through a lightweight computing engine called Pulsar Functions. Functions is a serverless framework that can apply logic comparable to lambda-style functions directly on the broker without the need for an external system. Functions can process an input and then publish the output to a topic in Pulsar, write it directly to BookKeeper, or write to a log topic.

Functions is a much lighter implementation of stream processing than Kafka Streams, and its state management and DAG flow capabilities are not as powerful. However, Functions provides its functionality built into every broker by default. If you need additional, specific computing capabilities, Pulsar’s support for other protocols, such as RabbitMQ, AMQP, Kafka, and Presto, lets it integrate with other tools to supplement its functionality.

## Conclusion

Apache Kafka and Apache Pulsar both offer event streaming and stream processing capabilities, but they approach the task in different ways.

Kafka’s replica-based topic storage, massive parallelization potential, and powerful stream processing capabilities make it a strong choice for systems that require high resilience and reliable storage but rely on simpler messaging patterns.

Despite excellent performance at large scales, Kafka suffers from scaling inertia: scaling up is a delicate, resource-intensive process requiring the balanced addition of large storage volumes across an entire cluster.

Kafka is well-suited for the financial sector, IoT applications, operational metrics, and autonomous vehicles.

Pulsar offers a more flexible solution with integrated geo-replication, multi-tenancy, decoupled storage and message routing layers, and integrated computing capability. It offers modes of messaging functionality that satisfy the pattern requirements of ultra-low-latency real-time event processing and batch processing, with no data loss across intrinsically and easily highly scalable systems.

Although it can handle arbitrarily large files and offers tiered storage, Pulsar is generally [slightly less performant](https://www.confluent.io/blog/kafka-fastest-messaging-system/) than [Kafka](https://www.kai-waehner.de/blog/2020/06/09/apache-kafka-versus-apache-pulsar-event-streaming-comparison-features-myths-explored/#myth-6-pulsars-performance-is-much-better-than-kafkas) when accessing messages outside of a broker’s managed ledger. It also can’t guarantee exactly-once processing, and its native solution for stream processing is limited to simple functionality.

Pulsar is a strong choice for microservices, autonomous vehicles, instant messaging, and analytics.
