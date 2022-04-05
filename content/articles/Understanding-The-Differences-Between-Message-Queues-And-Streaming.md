---
title: "Understanding the Differences Between Message Queues and Streaming"
date: 2022-03-25T14:46:55-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - getting-started
    #- use-cases
    #- managed-pulsar
    - pulsar-architecture
    #- moving-to-pulsar
tags:
    #- microservices
    #- functions
    #- storage
level: 100
summary:
imgUrl: https://user-images.githubusercontent.com/16946028/159678986-ccaf6b62-e9ea-43c5-8901-3361f5392bfb.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

Almost any application that requires real-time or near-real-time data processing benefits from having a message queue or streaming data processing component in its architecture. Online food ordering apps, e-commerce sites, media streaming services, and online gaming are straightforward examples. But weather apps, smart cars, health status apps with smartwatch technology, or anything Internet of things (IoT) typically rely on a message queue or streaming engine as well.

While message queues and streaming apply to similar use cases and use similar technologies, on a technical level they’re entirely different. We’ll compare them here and examine the pros and cons of each solution, touching on message brokers, publisher-subscriber (pub/sub) architecture, and event-driven scenarios.

We’ll touch on some use cases to highlight why sometimes one approach is better than the other. Finally, we’ll discuss how the open-source Apache Pulsar platform supports both message queues and streams, with a few subtle differences.

## Differences Between Message Queues and Streaming

Let’s start by exploring the major differences between message queues and event streaming.

### Message Queues

Message queues transport messages between application components, across applications, or across services in traditional monolith applications, containers, or microservices. Any online transaction processing (OLTP) is a good candidate for message queues.

Think of a message queue as a sequential list of data blocks waiting to be processed.

While queues are a fantastic way to send data across different application or service components, they also have some challenges. For example, they have latency, so processing a message takes time.

Reliability may also be an issue if the message queue’s unavailability affects the application’s stability. Its reliability also depends on how the application handles failed messages. Intelligence may also be an issue, depending on how developers recognize if the broker has already picked up or processed a message.

For example, application source A sends a message to a message broker. In turn, application target B picks up and processes the message from the message broker.

![Message queues](https://user-images.githubusercontent.com/16946028/159680203-bdc57a88-0102-4d85-8c3b-5163e4fff4c5.PNG)

### Streaming

Stream processing typically involves a more significant stream of data events that have already occurred. The events go to a message bus, where the streaming service picks them up.

![Streaming](https://user-images.githubusercontent.com/16946028/159680298-2937e511-30fe-4a70-aea0-0466739103dc.PNG)

Any workload generating a large flow of data (a_ _stream) that needs to be processed in real-time is well-suited for stream processing. A stream is an infinite sequence of messages that are generated and sent continuously.

Stream processing architectures do have their challenges. The first is performance, as the application must handle the load of incoming data streams. Other challenges include order and logic, as we have to determine how our application should process the input stream.

Finally, stream processing is real-time. While this may be what we want in most cases, we might also have a batch-processing requirement.

### Message Brokers

Mapping both technologies with each other immediately introduces another component: the message broker or message bus. A message broker is an interface between the message’s originator — a producer or publisher — and the destination handling system — a receiver or consumer, sometimes called a subscriber. It handles the message queue.

However, message brokers can combine several queues, providing scalability and high availability. Apache Kafka is one example of a message broker system.

Brokers are sometimes considered the more intelligent part of the solution stack. They’re typically responsible for message persistence and replication. So, if a message queue fails, the broker recognizes this and sends the incoming flow of messages to another queue. Since the message broker manages the communication between the producer and the consumer, neither component experiences downtime nor interruptions in message handling.

To address one of the message queue challenges, the broker can also recognize the message arrival order and how to process them.

### Message Queue Versus Streaming Architecture

Performance is critical in a modern microservices architecture. So, we need to make sure we’re choosing an architecture that benefits us the most.

A message queue is asynchronous since messages move into a queue, waiting to be picked up. The receiving component may need to poll the message queue to find out if there are any new messages.

In contrast, an application should process a continuous stream of messages as they’re generated, using an active, ongoing process. Event-driven processing or event-based architecture often accomplishes this.

The magic keyword in event-based architecture is “trigger.” Whenever some event occurs, another process kicks off.

This trigger could move something to a queue, a stand-alone activity, like saving the camera image to storage or validating credit card details with the credit card company. However, the event-based architecture can also work in a more significant stream, like checking for a robbery via hundreds of surveillance cameras writing to storage or validating thousands of payment transactions to detect fraud. In these cases, the architecture moves data to a stream and performs real-time analytics.

Message queues and streaming are both valid solutions for event-based architectures. Deciding which is best depends on the nature of the application workload and solution and the foreseeable outcome. For example, it would be acceptable to use a message queue for a stand-alone credit card validation. However, it wouldn’t be a viable architecture for payment transaction fraud detection.

Let’s compare the benefits of message queues and stream processing.

|Message queue|Stream|
| :--- | :--- |
|Controls data volumes|Handles real-time data generation|
|Enables batch processing|Allows real-time analytics|
|Routing logic based on message brokers|Multiple subscribers to control message flow traffic|
|Asynchronous data processing|Synchronous, continuous data flow|

## Message Queue and Streaming Solutions

There are many message queue and streaming solutions available. Let’s take a closer look at Apache Pulsar as an example. 

Yahoo originally developed Apache Pulsar to enable various data flows within their cloud environment. Now, it’s open-sourced through the Apache Software Foundation.

Developers find it to be a robust and scalable messaging and streaming platform. We can deploy Pulsar on bare metal as physical or virtual machines, run it inside Docker containers, or scale it within Kubernetes clusters, depending on the organization or workload application’s needs.

Pulsar’s core is the publisher-subscriber (pub/sub) architecture. Producers create messages and publish them to topics. Consumers subscribe to topics to recognize the specific messages they must handle.

![Message queue and streaming solutions](https://user-images.githubusercontent.com/16946028/159680446-ad072a9f-3f0e-4da8-9b4d-aaeac472f891.PNG)

Each Pulsar instance contains one or more Pulsar clusters. The Pulsar clusters are message brokers, delivering messages from the producers to the consumers. Pulsar can replicate data across clusters to optimize performance and scale.

Apart from the message brokers, Pulsar also relies on Apache BookKeeper as a temporary message store and Apache ZooKeeper to orchestrate and coordinate across Pulsar clusters. [Pulsar’s architecture](https://pulsar.apache.org/docs/en/concepts-architecture-overview/) provides everything we need to handle traditional message queues or resource-intensive continuous streams.

Let’s say our application needs direct communication between the producer and consumer. A message queue can manage the messages that the application can’t process immediately. Once the consumer acknowledges the message, it is removed from the queue. Payment transactions, food ordering apps, and e-commerce benefit from a Pulsar message queue architecture.

Or, perhaps our application workload involves producers generating a vast amount of data that we need to analyze in real-time, like IoT or payment fraud detection. Pulsar can integrate this streaming analytics processing as well. Pulsar’s stream processing unit, Pulsar Functions, takes ownership of the analysis and handles the messages routing across the producer and consumer.

In the past, developers needed to use different solutions for messaging and streams. Pulsar’s most significant benefit is combining traditional message queueing with stream processing within the same architecture. This ability simplifies the architecture, reducing the burden of maintaining skills across different platforms and solutions.

## Conclusion

E-commerce order processing benefits from message queueing, while streaming offers real-time data analytics on a continuous influx of data, such as IoT or global payment transactions. Each solution has its challenges and benefits.

Your decision on which to use depends on your specific needs. If your application workload needs queuing and streaming, you may consider a highly-available, scalable, robust all-in-one solution like Pulsar.

Now that you understand the differences between these seemingly-similar solutions, you’re better equipped to decide which is best for your application.
