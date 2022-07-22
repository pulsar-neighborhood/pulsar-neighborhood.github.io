---
title: "A Crash Course in Distributed Pub-Sub Messaging With Apache Pulsar"
date: 2022-07-22T09:36:56-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    #- at-the-edge
    #- cluster-administration
    - getting-started
    #- machine-learning
    - moving-to-pulsar
    #- newsletter
    #- project-news
    #- pulsar-architecture
    #- pulsar-components
    #- use-cases
tags:
    - microservices
    #- functions
    #- storage
level: 100
summary: Messaging is essential to modern life and how you get things done. So, without messaging, how would the world look? This question may appear far-fetched, but it’s a significant concern for computing. How do you talk to software? What is the mechanism through which software programs communicate with each other? How does software speak to you?
imgUrl: https://user-images.githubusercontent.com/16946028/180450100-9eb03dd5-6258-43cf-bd97-8222f786358b.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

Messaging is essential to modern life and how you get things done. So, without messaging, how would the world look? This question may appear far-fetched, but it’s a significant concern for computing. How do you talk to software? What is the mechanism through which software programs communicate with each other? How does software speak to you?

Here’s where the role of messaging software comes into play. Software engineers despise repeatedly addressing the same issue because it consumes a lot of time, introduces inconsistencies and compatibility issues, and complicates trying to expand systems. Similarly, developers want a simple way to connect to a messaging system so they can focus on the quality of their code. Developers must resolve labor and time-intensive problems that require communication between multiple services and frequent data processing.

Some solutions can make some of these complexities easier to manage. One of them is a message broker. A message broker is an intermediary between software entities that want to interact. It helps transmit messages from one application to another.

![image1](https://user-images.githubusercontent.com/16946028/180449782-9695f71a-f206-42eb-b40f-143d499dbddf.png)

The essential components of a message broker are the following:

* Producer is the component responsible for sending messages. It’s directly connected to the message broker. In the pub-sub pattern, they’re publishers.
* Consumer is the component that represents the service that consumes messages in the message broker. They’re subscribers in the pub-sub design.
* Queue is like a folder in a file system. It’s a data type that message brokers use to store messages. Queues retain messages until a consuming service processes them.
* Topics are channels for transmitting messages from producers to consumers. A topic serves as an entity for categorizing messages belonging to the same technical context.

Message brokers support different forms of communication, each of which defines how it shares information between producers and consumers. The most prevalent forms of communication are the following:

* Point-to-point (queues)
* Publish and subscribe (topics)

### Point-to-Point (Queues)

In point-to-point communication, producers and consumers exchange messages through a destination called a queue. Producers send messages to a queue while consumers retrieve the messages from the queue.

Point-to-point communication is one-to-one contact between a producer and a consumer. The fact that only one consumer can consume a message distinguishes point-to-point messaging from other forms of communication.

When the broker sends a message, but no consumers are available, it places the message in a queue to deliver later. However, when there are many consumers, it provides the message only once.

### Publish and Subscribe

The publish-subscribe communication model is also called the pub-sub design. Here, the producer is known as a publisher, while the consumer is known as the subscriber.

The pub-sub model mainly consists of the following components:

* A publisher who sends out messages to a message broker.
* A subscriber who serves as a recipient of the messages from the message broker.

![image2](https://user-images.githubusercontent.com/16946028/180449840-42120760-e7c7-4f58-9e78-091e8e8fbe46.jpg)

With the pub-sub pattern, publishers don’t deliver messages to specific subscribers. Instead, message recipients subscribe to the topics that interest them. Every time a message related to that topic is pushed, all subscribers receive it immediately. There’s very little queuing or batching required. As such, pub-sub is well-suited to systems that must exchange data between multiple entities regularly.

Publishers don’t know which subscribers or topics they subscribe to, and subscribers receive messages of interest without knowing the publishers. They communicate independently. The asynchronous nature of the pub-sub pattern allows for loose coupling and scalability, making it ideal for distributed applications, server-less, and microservices architectures. In contrast to point-to-point communication, messages registered on the topic go to multiple subscribers who have requested delivery for that topic.

![image3](https://user-images.githubusercontent.com/16946028/180449867-65060b58-1e93-40a4-984c-325b70471d0e.png)

## Publish and Subscribe (Pub-Sub) Messaging with Pulsar

Apache Pulsar is a distributed, open-source messaging and cloud-native streaming platform. It’s one example of a tool you can use for pub-sub and messaging.

Unlike most other pub-sub models, Pulsar separates producers and consumers. Pulsar acts as an intermediary that receives information from producers and sends it to consumers. Its architecture decouples message processing, serving, and storage, which resolves the shortcomings of existing open-source messaging systems, including multi-tenancy, geo-replication, and robust durability guarantees.

### Protocol

Pulsar uses a custom binary communication protocol between producers, consumers, and brokers. The protocol supports required features, such as acknowledgements and `Flow` control, while ensuring maximum transport and implementation efficiency.

Clients and brokers exchange commands which use binary protocol buffer (protobuf) messages. The PulsarApi.proto file specifies the format of protobuf commands. You can arrange commands for different producers and consumers in alternate layers and send them through the same connection without restriction.

Since protobuf doesn’t provide a message frame, the Pulsar protocol prepends all messages with a 4-byte field specifying the frame size. The maximum size of a frame is 5 MB.

The Pulsar protocol uses two types of commands:

* Simple commands without a message.
* Payload commands with messages for publication or delivery. Payload commands send messages in a raw format outside the protobuf. The protobuf command data precedes the protobuf metadata and the payload.

### Messages

Message payloads are in raw format rather than protobuf format, increasing efficiency. A BaseCommand protobuf message contains all commands in Pulsar’s protocol, and this message includes an enum type with all possible subcommands as optional fields. BaseCommand messages can specify only one subcommand.

Pulsar places broker entry metadata alongside the message metadata as a serialized protobuf message. The broker creates the metadata when the message arrives at the broker. It would pass it without changes to the consumer if you configured it to do so.

Message metadata is in the application-specified payload as a serialized protobuf message. The producer creates the metadata and passes it without changes to the consumer.

When using batch messages, the payload contains a list of entries, each with its metadata, defined by the SingleMessageMetadata object. When compression is enabled, it compresses the whole batch at once.

To prevent interrupting the TCP connection, a mechanism probes for the availability status of the remote peer. This identifies prolonged network partitions between clients and brokers or cases in which a machine crashes caused by a power outage, kernel panic, or hard reboot, for example.

Both clients and brokers send Ping commands periodically and close the socket if they don’t receive a Pong response within a timeout period.

Proper implementation of a Pulsar client isn’t required to send the Ping probe. However, it’s necessary to promptly reply after receiving one from the broker to prevent the remote side from closing the TCP connection.

### Producers

To send messages, a client must establish a producer. When creating a producer, the broker first verifies that a client is authorized to publish on the topic.

Once the client confirms the producer’s creation, it can post messages to the broker, referring to the producer ID negotiated before.

Suppose the client doesn’t receive a response indicating producer creation success or failure. In that case, the client sends a command to close the original producer before sending a command to re-attempt producer creation.

### Consumers

A consumer attaches to a subscription and consumes messages from it. After every reconnection, a client must subscribe to the topic. After the consumer is ready, the client must permit the broker to push messages using the `Flow` command. A `Flow` command gives additional permission to send messages to the consumer. A typical consumer implementation uses a queue to accumulate these messages before the application is ready to consume them.

After the application dequeues half the messages in the line, the consumer sends permits to the broker to ask for more. It asks for an amount equal to half of the messages in the queue. For example, if the queue size is 5000 and the consumer consumes 1000 messages in the line, the consumer sends permits to the broker asking for 2000 messages.

## Common Use Cases of Pub-Sub

The publish-subscribe messaging pattern forms the foundation of Apache Pulsar. In this model, publishers send messages to topics, consumers subscribe to those topics, consumers receive messages from subscribed topics, and finally, consumers send acknowledgements to the message broker when processing is complete. All these interactions occur through Apache Pulsar.

![image5](https://user-images.githubusercontent.com/16946028/180449946-947e41dc-6771-448a-95f5-ee97c4cd42e0.png)

The looseness of pub-sub messaging and a streaming platform like Pulsar is a powerful solution for various engineering problems. It also makes Pulsar an excellent choice for large-scale distributed architectures. Let’s examine a few use cases of how you might use pub-sub messaging to resolve some real-world challenges.

The looseness of pub-sub messaging and a streaming platform like Pulsar is a powerful solution for various engineering problems. It also makes Pulsar an excellent choice for large-scale distributed architectures. Let’s examine a few use cases of how you might use pub-sub messaging to resolve some real-world challenges.

### Event Notification

Pulsar is well-suited to handling event notifications because it can send events simultaneously to many recipients. Sending simultaneous events is a common technical challenge. You need a system that can quickly deliver events to consumers without causing adverse effects when the number of destinations grows exponentially. Depending on the architecture, consumers may not always be accessible online, but when they come back online, they must receive the messages they missed.

Moreover, some messages might need additional processing before they can be consumed. Because of pub-sub’s loose coupling, publishers can send events without concern about which consumers are online. Traditionally, this would require an architecture where one component would support pub-sub for messaging and a separate component would handle message queuing. Pulsar is unique in that it effortlessly supports both within a single platform.

### Distributed Logging

Messaging platforms, including Pulsar, keep application logs. These logs are an essential component of distributed systems. Companies can use logs as a low-cost tool for reconstructing events, triggering alerts as they occur, and keeping track of significant transactions.

You can simultaneously send logs to multiple subscribed destinations using Pulsar. You can also create explicit logging channels or instruct message recipients to log events in numerous destinations.

### Multi-Tenancy to Support Different Teams

Once you have a high-performance, scalable messaging system, you’ll want to share it with other teams within your organization. Multi-tenancy means that different user groups can use the same resources. Apache Pulsar can limit the resources different tenants in different namespaces can use. One can specify the maximum number of producers and consumers and the maximum quantity of storage each consumer can have.

## Why Developers Prefer Pub-Sub

Developers like pub-sub messaging for several reasons. Let’s look at some.

### It Eliminates Polling

The pub-sub messaging pattern offers significant benefits to application developers who build applications that depend on real-time events. Message topics enable instant, push-based delivery, so consumers don’t have to check for updates or “poll” for new information.

Push-based delivery expedites response time and reduces delivery latency, which can be especially problematic in systems where delays are intolerable.

### It Decouples and Scales Independently

Pub-sub generally increases the flexibility of software. Publishers and subscribers can operate independently. Independence lets you grow and scale each one on its own. The producers do not need to know anything about the consumers in advance. Pulsar simplifies communication by providing a reliable intra-component channel that decouples the message senders from the receivers.

Additionally, Pulsar lets different layers in an application’s architecture scale independently and infinitely. The message serving layer will not be affected if the message storage layer requires additional storage. This is contrary to traditional data processing technologies where data serving and storage are located on the same node, which makes it challenging to scale.  

## Conclusion

Pub-Sub Messaging simplifies communication, enabling you to build real-time, event-driven applications that improve performance, reliability, and scalability. Apache Pulsar is the core engine for many enterprise-grade messaging solutions. It unifies pub-sub messaging and streaming into a single platform and provides infinite scalability, multi-tenancy, zero data loss, geo-replication, and encryption.

Modern-day cloud-native applications use Pulsar to decouple storage and serving layers into independent modules that are convenient to develop, deploy, and scale. Pub-sub messaging enables event-driven architectures and asynchronous parallel processing, making it the most efficient and effective messaging model for systems requiring real-time communication.
