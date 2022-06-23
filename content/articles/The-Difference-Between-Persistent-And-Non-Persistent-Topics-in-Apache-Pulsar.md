---
title: "The Difference Between Persistent and Non Persistent Topics in Apache Pulsar"
date: 2022-06-23T16:30:57-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - pulsar-architecture
    - pulsar-components
tags:
    - topics
level: 200
summary: This article will explore what Pulsar topics are, the differences between persistent and non-persistent topics in Apache Pulsar, and review some example use cases for both methods.
imgUrl: https://user-images.githubusercontent.com/16946028/175392241-c8347127-d310-4acd-9a99-0e757bd5e98f.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

A topic in Apache Pulsar is a logical entity that producers write messages/events to, and consumers read messages/events from. A topic is a critical concept in any publish-subscribe (pub-sub), pattern-based architecture.

Conceptually, Pulsar topics are similar to online news feeds, where news stations push out new stories, and readers can subscribe to news feeds by topic. Similarly, you can logically categorize Apache Pulsar topics per your application needs and group messages received from the Producer application. For example, you can create a topic named “temperature-sensor” to collect all messages from any sensor producing temperature readings.

This article will explore what Pulsar topics are, the differences between persistent and non-persistent topics in Apache Pulsar, and review some example use cases for both methods.

### What are Pulsar Topics, and How Do They Work?

Pulsar topics are similar to database tables. However, by default they don’t have constraints like data types. It’s a good practice to define a schema/type for the message received on each topic level to guarantee a smoother processing of messages by consumers, as the consumers know what form of messages are expected from the producers. To facilitate this schema definition capability, Apache Pulsar provides a [schema registry](https://pulsar.apache.org/docs/next/schema-get-started).

In Pulsar, you can create as many topics as you need. It’s the producer application’s role to write messages to the required topic and subscribers/consumers to subscribe to one or multiple topics of interest. Each topic is created with a name to help both producers and consumers identify the topic. The name of a topic is chosen by the topic creator and can be anything. Note that in Pulsar, it’s not necessary to create a topic in advance. When publishing messages to a topic, if a topic is not present, Pulsar creates one for you.

## Persistent Versus Non-Persistent Topics

Now that you understand what a topic is and the critical role topics play in Apache Pulsar, let’s explore the difference between persistent and non-persistent topics.

Here’s an excerpt from the [Pulsar documentation](https://pulsar.apache.org/docs/concepts-messaging/#topics) that describes these two methods: “Pulsar supports two kinds of topics: persistent and non-persistent. In a persistent topic, all messages are durably persisted on disk (that means on multiple disks unless the broker is standalone), whereas non-persistent topics do not persist messages into storage.”

To understand the difference, let’s first go through what a persistent topic is and how it works in Apache Pulsar.

### Persistent Topics

A persistent topic stores received messages. They’re stored on one or more disks (based on the setup), ensuring durability even when a process restart of a broker/subscriber happens.

So, where do the incoming messages in persistent topics get stored? The answer is in BookKeeper nodes (bookies). Below is a diagram that shows how a message flows through the Apache Pulsar cluster and gets stored in a persistent topic using bookies.

![image1](https://user-images.githubusercontent.com/16946028/175391962-642b9c70-57e4-45fa-b05e-6dfb8fc5eece.png)

An application generates messages (Producer), and gets to the broker via a Pulsar proxy. The pulsar proxy layer abstracts away the pulsar cluster from client applications, acting as a safety layer as well. The Pulsar proxy node knows how to communicate with Pulsar brokers and forwards the incoming messages to the broker.

Upon receiving the request,  the broker checks which persistent topic each message is targeted to and forwards the received messages to the appropriate bookies to get them persisted. Bookies are based on a distributed write-ahead log (WAL) system that utilizes the ledger mechanism to store messages being received. There can be several ledgers for a single topic.

There’s a powerful, cost-saving feature in Pulsar called tiered storage that allows older messages to be moved from bookie nodes to an alternative, cheaper storage (like Glacier, as shown in the above diagram). However, you’ll still be able to facilitate client apps to access old messages without any change required in the application code.

Note that a persistent topic is the default choice in Apache Pulsar, meaning Pulsar will automatically choose to create the topic as a Persistent topic even if you haven’t specified the prefix or the category of the topic to be created.

### Non-Persistent Topics

A non-persistent topic doesn’t store received messages. Instead, the incoming messages live in the broker's memory. This means reading and writing are faster than with a persistent topic. This also means there’s no extra burden of topic management or administration, so it’s an even lower latency in producer applications sending a message to a topic.

However, since messages live in the memory of the broker nodes, whenever a broker node is restarted, the corresponding messages get lost. Whenever a subscriber gets disconnected due to network failure, the transit messages are also lost.

## Use Cases for Apache Pulsar’s Non-Persistent and Persistent Topics

Since non-persistent topics don’t store messages on disk and the data lives solely in memory, their application areas are niche by design.

For instance, you could use non-persistent topics if you need to stream readings from sensors in real-time, as long as it’s okay if you lose one or two readings. Similarly, you could use non-persistent topics in a development/lab environment, where the loss of messages isn’t a concern.

You should go for persistent topics in all other cases where the durability of messages/message redelivery is critical. There are a lot of use cases for persistent topics like financial transactions, stock transactions, e-commerce events handling, and so on.

## Conclusion

Topics are a powerful feature offered by Apache Pulsar for message management. Persistent topics are managed by bookies for data storage, whereas the data of non-persistent topics live in broker node memory.

An application developer would prefer persistent topics as their default choice for production-grade applications. This is because persistent topics offer durability, as well as the option to handle failures through a replay of messages. In addition, persistent topics have the possibility to retain messages for an extended period. Therefore, developers can view, analyze, and troubleshoot the messages stored in the topic at a later point in time when needed.

To learn more about persistent and non-persistent topics, check out the Apache Pulsar [documentation](https://pulsar.apache.org/docs/concepts-messaging/#topics) about topics.
