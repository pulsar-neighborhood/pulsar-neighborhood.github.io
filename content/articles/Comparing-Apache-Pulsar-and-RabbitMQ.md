---
title: "Comparing Apache Pulsar and RabbitMQ"
date: 2022-07-01T10:44:53-04:00
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
    - RabbitMQ
level: 200
summary: Let’s take an in-depth look at the similarities and differences between Pulsar and RabbitMQ
imgUrl: https://user-images.githubusercontent.com/16946028/176910739-60d5f639-6c52-4649-992a-fb1c9d1aadb9.png
author:
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: RabbitMQ is an open-source, free, and flexible message queuing system, RabbitMQ. Read more to learn and find out the main differences with Apache Pulsar.
    keywords:
        - rabbitmq
---

Yahoo! developed Apache Pulsar, an enterprise-level, publish-subscribe messaging system. Before it was open source, Yahoo! Mail, Yahoo! Finance, Yahoo! Sports, Flickr, the Gemini Ads platform, and the distributed key-value store, Sherpa, were all powered by Apache Pulsar.

Apache Pulsar delivers minimal latency, end-to-end message publish and delivery, and a serverless lightweight framework for complex event processing. A significant advantage of this system is that it’s built to handle billions of events each day with ease. In other words, it’s a multi-tenant architecture that supports multiple clients on a single instance of software. Regarding data migration, Apache Pulsar can handle even the most demanding workloads. Additionally, it’s also a streaming service that allows for high-quality streaming.

RabbitMQ is an open source, free, and flexible message queuing system. It’s an Advanced Message Queuing Protocol (AMQP)-capable message broker that can also be used with other popular messaging systems like Message Queuing Telemetry Transport (MQTT). The clustering and failover infrastructure of the Open Telecom Platform is used to build the Erlang-based RabbitMQ server. With RabbitMQ, it’s now possible to build stable, fault-tolerant, and highly scalable systems that can handle vast amounts of simultaneous processes. RabbitMQ’s efficiency and fine-grained message routing enable apps to be significantly decoupled.

Now that we introduced both messaging systems, let’s take an in-depth look at their similarities and differences.

## General Similarities

Apache Pulsar and RabbitMQ are both completely open-source software applications. They employ a push-based strategy and use storage methods based on indexes. Apache Pulsar and RabbitMQ both have enterprise cloud services on major cloud service providers like AWS, Google Cloud, and Microsoft Azure. Like Apache Pulsar, RabbitMQ allows users to subscribe to either permanent or temporary topics, also known as durable and ephemeral subscriptions.

## General Differences

RabbitMQ is licensed under the Mozilla Public License, and Apache Pulsar is licensed under the Apache V2 license. Apache Pulsar stores messages in RocksDB and uses Apache Zookeeper and Apache BookKeeper for reaching consensus. In contrast, RabbitMQ doesn’t rely on any distributed components at this time.

Another key distinction is that Apache Pulsar manages and controls a significant amount of real-time data with unparalleled scalability while maintaining a low latency level. Although RabbitMQ is slower than Apache Pulsar, RabbitMQ offers a superior REST API and an intuitive user interface that makes it easy to monitor queues. Additionally, RabbitMQ has a more limited capacity for the number of messages that may be maintained and replayed effectively.

## Architecture

### Apache Pulsar

![Apache Pulsar Architecture](https://user-images.githubusercontent.com/16946028/176910996-3cb25a56-5935-4a33-868b-56c3d471fe9d.png)
(Source - [Apache Pulsar](https://pulsar.apache.org/docs/concepts-architecture-overview/))

Apache Pulsar’s architecture consists of clients like producers and consumers. Producers send messages to a broker’s topic. This broker stores the messages in the order they were sent.

Consumers use subscriptions to send messages. After creating the subscription, a consumer subscribes to a topic and receives all the messages that have been broadcasted to it. Each subscription tracks the consumer's progress through topic messaging to deliver each message simultaneously. Additionally, the subscription keeps a pointer on the oldest unread topic message.

The crucial part of Apache Pulsar architecture is a Pulsar cluster. Several Pulsar clusters are available, each dividing the tasks and sharing the work evenly. Inside a Pulsar cluster are Apache Zookeeper, Apache BookKeeper, and a broker. The component broker in the Pulsar cluster is in charge of storing and delivering messages that have been stored on various topics. The cluster stores and manages these messages using the Apache BookKeeper system. Every cluster has a dedicated ZooKeeper, which stores metadata unique to the cluster, ownership information, and ledger data.

### RabbitMQ

![RabbitMQ Producer Consumer](https://user-images.githubusercontent.com/16946028/176911047-b4e6ee3e-6488-4876-aa1a-c88fe58c88df.jpg)

The producer, broker, exchange, queue, and consumer are the main components of RabbitMQ’s architecture. Producers are client apps that create and transmit messages to the broker. Producers generate the routing keys and send messages to exchange rather than a queue, where they are immediately broadcasted.

The job of the exchange is to route messages to various queues using bindings and routing keys. A binding connects a queue to an exchange. Exchanges such as Fanout, Direct, Topic, and Headers need their own bindings.

The queue serves as a message storage buffer. Applications reference queues by name. Message queueing lets web servers quickly reply to queries without performing resource-intensive tasks on the spot. Furthermore, it helps deliver messages to consumers and balance worker loads.

### Similarities

Both systems have producers and consumers. The publisher produces messages to a topic, and a consumer subscribes to that topic. In Apache pulsar, this is called the pub-sub pattern.

Similarly, producers store generated messages in the queues. They use an approach known as “smart broker and dumb consumer.” When a producer delivers a message to the exchange, it’s routed to a queue. The broker must first see that messages are delivered to their consumers before dequeuing them. This approach also keeps tabs on the current state of the consumer base. As the name implies, this exchange acts as a smart broker and dumb consumer, where the smart broker handles all the routing details and the consumers do nothing.

### Differences

The Apache Pulsar Functions processing layer has limited message routing capabilities, whereas the AMQP protocol provides RabbitMQ with an extensive range of broker-side, message routing capabilities. Message routing functions, including content-based routing, message transformation, and enrichment, are kept in a single layer in Apache Pulsar, while RabbitMQ executes them on a separate layer.

Furthermore, RabbitMQ only keeps messages in its cache for a short time. In contrast, Apache Pulsar can store messages forever.

Regarding system availability, RabbitMQ has support for multi-node clusters, so it doesn't need to depend on external services to keep the system functioning. Contrast this with Apache Pulsar, which needs to use Apache ZooKeeper to access external services like the Sharing Plugin for high availability.

Despite this, Apache Pulsar outperforms RabbitMQ in its ability to transmit messages sequentially. Apache Pulsar is also superior in creating streaming pipelines and event processing.

As might be expected, Apache Pulsar has a far more complex architecture that must accommodate Apache BookKeeper, Apache ZooKeeper, the Pulsar server, and the RockDB database. As RabbitMQ only requires its own servers, it features a fairly lightweight architecture.

## Features and Benefits

### Performance

Apache Pulsar is significantly faster than RabbitMQ. RabbitMQ has a throughput of 30MB/s, but Apache Pulsar can achieve 300MB/s — a 10x increase. Furthermore, RabbitMQ’s latency begins to suffer when traffic exceeds 30MB/s, while Apache Pulsar can handle even more traffic without any latency compromise. Additionally, Apache Pulsar’s mirrored sharded partitions provide high availability zones, enabling users to use the system without any downtime.

### Scalability

For instant scaling, Apache Pulsar uses segment-centric storage and multi-layered architecture with Apache BookKeeper. It can also scale horizontally without any issues. In contrast, RabbitMQ supports sharding and mirroring as plugins, but this provides suboptimal scaling abilities.

### Cost

With features like geo-replication, tiered storage, and operational simplification, Apache Pulsar is a cost-effective solution for complex scenarios and high-volume data. In contrast to Apache Pulsar, RabbitMQ is cheaper, making it a feasible choice for lightweight communications that only require basic request-response and message queuing.

### Ease of Use

When it comes to learning curves, RabbitMQ is fairly easy to learn and use. It also provides users access to various resources, including official documentation, tutorials, conference talks, and online courses.

Despite its relatively prolific use, Apache Pulsar is considerably more difficult to learn and manage. Furthermore, its documentation is less thorough, sometimes making it challenging to find solutions from official sources.

### Community Presence

RabbitMQ’s community isn’t particularly large, but it does support a wide variety of AMQP clients and tools that can be used to communicate with the platform. Apache Pulsar is similar in this respect, lacking significant ecosystems in the development space. Moreover, RabbitMQ supports 22 programming languages, while Apache Pulsar supports six.

## Conclusion

Despite their shared purpose, Apache Pulsar and RabbitMQ offer significantly different message queuing solutions. For a heavyweight solution that can accommodate incredibly high traffic demands, Apache Pulsar’s capabilities make it the definitive choice. Just bear in mind that it presents a fairly steep learning curve.

While Apache Pulsar is a heavy hitter, RabbitQM represents a lightweight, user-friendly solution for more basic message queuing needs. Its self-reliant architecture enables it to maintain a lean structure but at the cost of considerable speed and performance.

Therefore, most organizations will likely benefit greatly from Apache Pulsar’s superior performance and unmatched speed. Its availability and reliability truly elevate it as a force in the industry.
