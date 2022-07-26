---
title: "Moving from Java Message Service (JMS) to Apache Pulsar"
date: 2022-05-13T14:08:55-04:00
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
    - jms
    #- functions
    #- storage
level: 100
summary: Let’s explore some advantages and challenges of moving from JMS to Pulsar.
imgUrl: https://user-images.githubusercontent.com/16946028/168343481-a852dd84-ffd5-449d-ab85-14fd317a9685.png
author:
    name: Pulsar Neighborhood
    imgUrl: 
meta:
    description: JMS systems fail to provide solutions for modern business challenges while Pulsar can improve & modernize legacy JMS infrastructure. Read to find out more.
    keywords:
        - JMS
---

Many mission-critical business applications rely on Java Message Service ([JMS](https://jcp.org/en/jsr/detail?id=343)), a popular enterprise messaging API. Enterprise messaging systems provide a way to create, send, receive, and read messages in an application, and JMS defines a common way for Java programs to interact with messaging systems.

Despite its popularity, JMS may not be able to keep up with the needs of modern businesses. For example, it might not be suitable for real-time complex event processing, change data capture, cross-region message replication, and seamless horizontal scalability. [Apache Pulsar](https://pulsar.apache.org/) is a newer message-oriented middleware (MOM) that addresses these modern business dynamics. To fill these needs, we can switch from JMS to Pulsar, or use Pulsar to fit JMS solutions to the needs of modern enterprises.

Let’s explore some advantages and challenges of moving from JMS to Pulsar.

## Moving from JMS to Pulsar

Jakarta EE applications frequently use JMS — especially applications requiring distributed transactions. While not many developers are building Jakarta EE applications now, vendors have evolved runtimes and Jakarta EE servers by adding extensions and continue to run their Jakarta EE applications. However, the technology is quickly falling behind the needs of modern data applications.

We’ll compare message consumption and change data capture (CDC) support in each technology to understand why business applications are shifting from JMS to Apache Pulsar.

### Message Consumption

It’s up to the provider to decide how to implement JMS and transfer data. So, we need the provider library to consume JMS messages.

We need both a web application server and an entire Jakarta EE application server to use JMS. After deploying JMS into the Jakarta EE application server, we can use it to integrate applications. JMS, in this case, serves as a message broker.

We can use a modern open-source message broker, Apache Pulsar, as an alternative to JMS. Unlike JMS, Pulsar client libraries allow us to[consume and produce messages](https://pulsar.apache.org/docs/en/2.1.0-incubating/client-libraries/) using various programming languages, including Java, C++, Go, and Python. Also, we don’t need to buy a costly application server to use Pulsar.

### Change Data Capture

Change data capture (CDC) records database changes but requires a messaging service to deliver change notifications to the relevant applications and systems in real-time. CDC code treats these changes as events with event-driven architectures and sends them asynchronously.

JMS uses a [message-driven bean](https://docs.oracle.com/cd/E19798-01/821-1841/bncgq/index.html) to support synchronous message processing. The bean acts as a JMS message listener and can only process JMS messages — not events.

Although modern applications require a design pattern that can process changes in real-time, such as CDC, JMS doesn’t support the CDC architecture.[Apache Pulsar 2.3.0](https://pulsar.apache.org/blog/2019/02/20/Apache-Pulsar-2-3-0/) and newer versions support database CDC.

[Pulsar CDC connectors](https://pulsar.apache.org/docs/en/io-cdc/) integrate with Alibaba’s open source Canal framework and RedHat’s Debezium CDC framework. We can use these connectors to capture log changes from common databases, like Oracle, PostgreSQL, MongoDB, MySQL, and MS SQL Server, sending them into Pulsar in real-time.

### Modernizing JMS Systems

Since JMS systems fail to provide solutions for modern business challenges, we can use Pulsar to improve and modernize legacy JMS infrastructure.[Fast JMS for Apache Pulsar](https://github.com/datastax/pulsar-jms) is an example of a modernized JMS system.

Pulsar supports modern enterprises and provides a unified streaming and queuing design. So, it provides an ideal platform to build modern JSM infrastructure.

### Real-Time Data

While JMS allows processing messages asynchronously, it uses the imperative programming paradigm. This means it fails to keep up with Pulsar’s execution speed. Its speed isn’t near real-time, and as such, it’s not suited for businesses that require high availability of real-time data.

Let’s consider a financial institution as an example. Real-time messaging is crucial for processing financial transactions. It helps alert staff to check suspicious transactions as they pass through the bank system. Also, with real-time data, we can automate anti-fraud systems to block fraudulent transactions as they occur.

Unlike JMS, Pulsar provides a stream processing framework that processes data as it enters the system. We can use the [Pulsar IO API](https://pulsar.apache.org/docs/en/io-overview/) to build real-time streaming data pipelines for financial service systems.

We can create a real-time streaming data pipeline that runs new data through various processes by plugging adapters (connectors) into Pulsar using the Pulsar IO API. We can then send this modified data out of Pulsar by plugging sink adapters into the pipeline.

## Challenges When Switching from JMS to Pulsar

Shifting from JMS to Pulsar involves some challenges. Let’s consider three that we might encounter: code refactoring, libraries, and architecture.

### Code Refactoring

JMS is a Java API that provides a standard set of interfaces for typical enterprise messaging systems. So, we need to refactor the code when we switch from JMS to Pulsar.

Determining how to replace the JMS application programming interface (API) is the main challenge, as there’s no one-to-one mapping between JMS and Pulsar.

For example, Pulsar doesn’t have a concept of “message selectors.” Instead, we can partition messages using a “topic name.” If we used message selectors in JMS, we would need to refactor our code when migrating to Pulsar.

Luckily, [Starlight for JMS](https://docs.datastax.com/en/fast-pulsar-jms/docs/1.1/#:~:text=Starlight%20for%20JMS%20is%20the,run%20their%20existing%20JMS%20applications.) helps avoid refactoring code when moving from JSM to Pulsar. Starlight for JMS is the first highly-compliant JMS implementation designed to run on a modern streaming platform. It enables enterprises to take advantage of a modern streaming platform’s scalability and resiliency to run their existing JMS applications.

Apache Pulsar, which powers Starlight for JMS, is open source and cloud-native. We can run it on-premises or in any cloud environment, public, private, or hybrid.

### Relying on New Libraries

In the JMS client library, the client application connects to a broker then creates a session where it can publish or consume messages. The JMS API provides a standard interface that all messaging systems supporting the API can implement.

The Pulsar Java client works slightly differently. The first step is creating a producer or consumer object that references a specific topic. The Pulsar client connects to the cluster and automatically discovers which brokers host the topics it wants to produce or consume messages from. Then it handles transparent load-balancing across those brokers.

The Apache [Pulsar Java client](https://pulsar.apache.org/docs/en/client-libraries-java/) library is now part of the Apache Pulsar codebase. We can use the JMS 2.0-compliant Pulsar Java client library to develop Java applications that communicate with Apache Pulsar.

### Architecture Changes

JMS uses a broker-centric messaging system, whereas Pulsar uses a distributed architecture. In JMS, all producers and consumers connect to a single server called a broker or message queue. Brokers store messages that producers and consumers exchange. The brokers aren’t connected, so no data exchange is possible between brokers.

Pulsar doesn’t have an equivalent of a JMS queue. Instead, it uses topics for message delivery. It divides topics into partitions, and only one consumer can consume each partition.

There’s no single broker or point of contact in Pulsar for producers and consumers. So, we can scale the system horizontally by adding new brokers. Producers can publish messages to any broker in the cluster, and consumers can subscribe to any topic in the cluster. \

Additionally, Pulsar is generally more performant than traditional broker-based message queuing systems like JMS because of its unique architecture and tiered storage. Unlike other queuing systems that rely on a single layer of storage (typically disks), Pulsar uses tiered storage that combines disks with flash or dynamic random-access memory (DRAM). This approach allows for higher throughput and lower latencies than traditional architectures.

## Final Thoughts

Pulsar offers a viable alternative to Java Message Service, especially for organizations and developers that want to do more with their messaging technology. By understanding how Pulsar compares to Java Message Service, JMS users can better prepare for the change and make the transition more easily.
