---
title: "Where Is the Edge?"
date: 2022-07-01T10:18:36-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - at-the-edge
tags:
    - IoT
level: 100
summary: This article will explore the edge, how it relates to performance-sensitive devices such as IoT devices, and how Apache Pulsar can get you closer to the edge. But first, you need to understand what — and where — the edge is.
imgUrl: https://user-images.githubusercontent.com/16946028/176909786-d8966dcf-bd83-4236-83bc-64a568eb6b2e.png
author:
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: Explore how performance-sensitive applications and devices benefit from the edge, and how you can use Apache Pulsar to support data streaming at the edge.
---

Although cloud computing has been the topic of conversation for the past decade, edge computing has just recently taken off. The pressing need for high-performant, cost-efficient, and decentralized infrastructure has shifted the focus away from the databases and the cloud. Instead, you can turn to the edge, which solves two fundamental problems that persist in the cloud: network dependency and data privacy.

Edge computing is any form of distributed computing in which computation occurs close to the physical device generating data. Think of it as architecture that brings workloads closer to users or the edge rather than providing services on the cloud. The edge can be any place outside the cloud, like sensors, IoT devices, on-premise servers, service providers, or consumer devices.

This article will explore the edge, how it relates to performance-sensitive devices such as IoT devices, and how Apache Pulsar can get you closer to the edge. But first, you need to understand what — and where — the edge is.

## Understanding the Edge

Although the phrase “the edge” indicates a singular place, edge computing is more of a continuum. It comprises two main tiers: the Service Provider (SP) Edge and the User Edge. Each edge tier has its own infrastructure, meaning which tier you choose to work with will define your resource constraints, ability to scale, as well as customization opportunities and abilities.

Determining whether your ideal edge location is on the SP Edge or User Edge largely depends on your specific use case, available resources, network topologies, and available storage. A good starting point to determine where the most favorable location might be for your environment is to better understand the taxonomy of the edge. For more information, read this guide to [edge taxonomy](https://www.lfedge.org/wp-content/uploads/2020/07/LFedge_Whitepaper.pdf).

### Service Provider (SP) Edge Tier

The SP Edge’s networking infrastructure functions similarly to a centralized public cloud’s computing resources, storage, and network, making the SP Edge a suitable replacement for these cloud functions. Additionally, the SP Edge provides better security and privacy than a public cloud service. That’s because SP Edge infrastructure is generally relatively standardized, with requirements for regulatory compliance depending on where you’re deploying.

The SP Edge is distributed, meaning it brings edge computing resources closer to your end users and is a good fit for latency-sensitive applications. For instance, a video streaming service would benefit from being placed at the SP Edge for performance and scalability. Communicating directly with the cloud via a router — instead of at the edge — would result in significantly more latency than using the SP Edge.

### User Edge Tier

The User Edge is delineated from the SP Edge. The User Edge is particularly useful for latency-critical applications, such as autonomous devices and IoT applications, requiring data processing to be performed in real-time as the data is generated. The User Edge is more constrained, distributed, and specialized than the SP Edge. It is closer to the end user, making it faster and more reliable for high-frequency data transfers by conserving network bandwidth. Additionally, the User Edge offers the highest level of security as the data never leaves the on-premise server or the edge device.

The SP Edge and public clouds generally aren’t owned by users and instead are shared across users. The User Edge, in contrast, is typically owned by users — via smartphones, laptops, PCs, and so on — or enterprises via on-premise data centers and servers. However, it can also be operated by service providers and cloud providers that have started offering managed services including and supporting on-premise computing and networking infrastructure as well as resources at both the SP Edge and User Edge.

## Using Apache Pulsar at the Edge

Now that you’re familiar with edge computing, the SP Edge, and User Edge, let’s explore how performance-sensitive applications and devices benefit from working at the edge — and how you can use Apache Pulsar to support data streaming at the edge.

### Using the Edge for Performance-Sensitive Devices

For performance-sensitive applications and IoT devices, it’s crucial to get the architecture right. These applications commonly struggle with two major challenges: communicating between different processes and moving data within the systems.

As data streams continuously pour in, ingestion, processing, and transformation need to happen simultaneously. You can’t rely on storing the data in the database, querying it, and then performing computation. The system will simply fall apart. For example, if the data flow increases at a point, the system may struggle to keep up with the spike in traffic and ultimately crash. Additionally, you might be working with data that’s too large and complex to manage with traditional data integration tools.

So, you can use the edge and events like data streaming to prevent your systems from becoming overwhelmed. Data streaming at the edge supports real-time insights from your IoT sensors, enables you to connect your different IoT applications and devices, and ultimately allows you to process your data faster.

### Using Apache Pulsar for Stream Processing at the Edge

As data flows into your organization, performance-sensitive applications require instant action on data in motion. An event-streaming platform like Apache Pulsar can help you enhance the performance of your applications. Pulsar is an open-source stream platform that lets applications react to events as they happen, making it ideal for mission-critical workloads. Additionally, Apache Pulsar provides a unified platform that enables communication between different processes and makes it easy to move data within the system.

Apache Pulsar uses data streaming to efficiently move large data streams within the system. It also manages communication between different components using message queuing. Combining Apache Pulsar with edge computing allows you to access data streams, perform distributed analytics, and discover patterns in real-time to reduce the amount of data transferred to and from the cloud.

#### Apache Pulsar at the SP Edge

Streaming is built-in functionality in Apache Pulsar. At the SP Edge, you can leverage Apache Pulsar to ingest real-time data into machine learning models that can help your team gain essential business insights.

Without a streaming platform, machine learning models can’t perform inference in real-time. Failing to recognize anomalies and deviations from the system’s normal behavior quickly could potentially result in losing business value and severely impacting your end users. This impact could even be catastrophic. In the case of a fraud detection application, missing or receiving delayed insights about fraud and unauthorized access could determine the success or failure of your organization — or result in significant fines.

#### Apache Pulsar at the User Edge

Apache Pulsar also has a built-in stream processor called Pulsar Functions that you can use to create your own scripts for performing computation on data in motion. This has massive value for devices at the User Edge, such as IoT devices, which produce huge amounts of data from multiple streams.

For example, consider the smart devices often backed by IoT and used for home automation. Users can adjust their room temperature, dim the lights, and play music. You can use Apache Pulsar to manage these IoT-driven devices. Apache Pulsar can collect continuous streams of data from multiple sources or devices, process the data, generate output, and redirect it to the smart devices, which perform the task — like changing the room temperature or lighting — based on that given input. And since the User Edge is so close to the end user, these changes will happen almost immediately.

## Conclusion

Edge computing promises new and exciting opportunities for enterprises and consumers. But navigating the edge can be challenging.

While SP Edge and User Edge both provide better performance, identifying the best location for your use case is a complicated process. When selecting which edge tier is the best place for your application or device, consider how close you need to bring computing resources closer to the users while also remembering that the best edge location isn’t necessarily the nearest one.

Whether the SP Edge or User Edge will serve you best depends on your available resources, storage, network topologies, and your use case. For example, some applications, such as IoT, run on constrained devices and require a highly distributed architecture. Others benefit more by leveraging the existing network of a service provider to process data or deliver content to the end user with low latency.

Using Apache Pulsar, you can extend the capabilities of cloud computing to the edge. Pulsar solves current problems that persist in the cloud, including network barriers, privacy concerns, latency issues, and high costs, performing message and data streaming on distributed devices, both at the User Edge and the Service Edge. Regardless of your edge location, Apache Pulsar can support you at your optimum edge.
