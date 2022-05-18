---
title: "How Pulsar Can Help IoT Avoid the Internet - Event Streaming at the Edge"
date: 2022-05-13T15:08:31-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - at-the-edge
    #- cluster-administration
    #- getting-started
    #- machine-learning
    #- moving-to-pulsar
    #- newsletter
    #- project-news
    #- pulsar-architecture
    #- pulsar-components
    #- use-cases
tags:
    - streaming
    - IoT
    #- storage
level: 200
summary: This article explains how performance-sensitive IoT applications can improve their performance with event streaming at the edge using Apache Pulsar.
imgUrl: https://user-images.githubusercontent.com/16946028/168373605-fbf250c5-0f15-4622-aa74-9b94fb4c7d78.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

There are no upsides to lengthy trips around the Internet for end users. Apart from reducing the quality of experience (QoE), it affects timely business decision-making. When data travels across the Internet, latency and lack of bandwidth become two significant problems for performance-sensitive devices.

This article explains how performance-sensitive IoT applications can improve their performance with event streaming at the edge using Apache Pulsar.

## Some Background

Companies traditionally hosted data centers in-house, but this practice quickly became capital intensive, hard to scale, and time-consuming. Then came the move to cloud computing. With cloud computing, companies leverage cloud services to rid themselves of the workload involved in setting up and maintaining service infrastructure. As a result, 69 percent of companies have [accelerated their cloud migration process](https://resources.foundryco.com/download/cloud-computing-executive-summary?utm_campaign=2020%20Cloud%20Computing%20Study&utm_source=twitter&utm_medium=social&utm_term=2020%20Cloud%20Executive%20Summary&utm_content=2020%20Cloud%20Executive%20Summary) in the past year.

However, because of the centralized nature of data centers in cloud-based computing, there’s increased latency and reduced performance when end users are not close enough to the data centers.

Although the cloud-based approach works for certain situations, it can become costly, and there can be delays to time-sensitive functionalities, like event streaming from the Internet of things (IoT). Solving this problem is where edge computing comes into play.

Edge computing brings computing applications closer to the edge of the Internet where the data resides. This data could be from the industrial IoT, users' computers, smartwatches, fitness trackers, social media platforms, click-streams, and online businesses. By bringing these applications closer, data travel becomes faster, reducing latency.

Edge computing leverages the concepts of cloud-native applications but includes the advantages offered by edge locations, like improved performance, security, and reliability.

## IoT and Edge Computing Benefits

With the exponential increase in the number of devices included in the IoT in the global market today, there’s a significant increase in the number of event streams emitted from these devices. Industries using streaming analytics for their decision-making processes include healthcare, retail, energy, and manufacturing.

IoT [big data statistics](https://dataprot.net/statistics/data-statistics/) show that with the increased adoption of IoT devices, the amount of data generated will reach 73.1 zettabytes (ZB) — in other words, 73.1 trillion gigabytes — by 2025. Processing the streaming data from these devices plays a critical role in developing valuable insights for business decisions.

However, event-streaming analytics queries for the IoT require fast execution as data streams from IoT devices are latency-sensitive. Because decisions rely on immediate analysis of streamed data, query results may lose their value if the query execution time exceeds the required time to act on the results.

Stream query processing may follow either a centralized or distributed model. For example, a cloud-based model follows the centralized approach whereby all streamed data goes to the cloud data center for processing and analytics. However, this model has networking delays because of the significant amount of data transferred, even when functionality doesn’t require all the data. Therefore, this approach becomes insufficient for most IoT-enabled applications' time-bound and latency-sensitive requirements.

Edge computing follows the distributed stream-processing model. Cloud providers deploy data centers closer to the network edge where data originates from user devices, ensuring faster provision of services to end-users and improved experiences.

Additionally, by performing analytics and business logic operations close to the edge, there's reduced traffic to servers, which reduces the need for scaling up computing and storage capacity to deal with the increased workload. As a result, edge computing helps with cost optimization, better performance, and increased security.

## Event Streaming at the Edge

Cloud service providers have placed some application service features (like caching) at points of presence (POP) along the cloud continuum, thus creating a network edge. This practice helps us developers reduce latency and improve the performance of applications involving event streaming and rich web content.

However, with recent applications like IoT-enabled devices, we need a more sophisticated distribution of services along the edge because of latency, bandwidth, security, and privacy. According to [LF Edge](https://www.lfedge.org/wp-content/uploads/2020/07/LFedge_Whitepaper.pdf), two main edge tiers exist on the edge continuum to help cover network needs: the service provider edge (SPE) and the user edge.

## The Service Provider Edge

Before the edge existed, cloud-based centralized data centers offered massive economies of scale and flexibility unavailable for most devices. However, as the name suggests, the centralized nature of cloud-based data centers limits their performance and sharing of resources.

The service provider edge is close to centralized data centers. Users consume the infrastructure like computing and storage resources present in this edge tier as a service. Unlike the public cloud provided by most centralized data centers, the service provider edge offers more security and privacy. And along with its own regulatory and compliance requirements, this edge tier is more standardized than the user edge.

The communication service provider (CSP) manages the cloud infrastructure and maintenance of the service provider's edge. CSPs can leverage these edge locations to create the ideal platform for edge applications through their multiple, connected servers at nearby locations on the network edge and in conjunction with other cloud servers.

Additionally, using lightweight streaming functions from [Apache Pulsar](https://pulsar.apache.org/), organizations can handle high-volume streaming data messages from message queues and clean and analyze them to manage their processes better.

## The User Edge

A key reason for the user edge tier is to further reduce latency by bringing and distributing computing resources closer to end-users or placing them on user devices. A critical difference between tiers is in the ownership of the computing resources. Like the public cloud, users don't own the resources available at the SPE but share them with other users. However, users usually have dedicated resources on the user edge and are the sole operators.

Also, owning the resources on the edge tier ensures more privacy, autonomy, and lower overall cost. Bringing computing resources closer to the customer also helps conserve bandwidth by preventing long data transfers to centralized data centers at the service provider edge.

Organizations looking to use both tiers can do so to enable more flexibility in their operations.

## How IoT Uses Edge Computing to Reduce Latency and Improve QoE: A Sample Use Case

Let's examine a sample use case where a tool like Pulsar comes into play for its event-streaming capabilities. Edge computing ensures a more flexible and agile process for industrial markets using the IoT. In manufacturing, industrial operators can perform critical, time-sensitive analysis without traveling to a centralized data center by locating sensors with [Pulsar Functions](https://pulsar.apache.org/docs/en/2.6.0/functions-overview/) close to robots and machinery that perform operative processes. This design reduces latency and enables faster decisions.

Remote operations like mining now use edge controllers for operational efficiency. Data is readily available for easier processing and analytics through edge controllers. An edge controller is a part of the IoT system that collates data from various field sites. By employing its fast data processing and quick response abilities, it helps optimize operational processes in industrial fields like mining.

Other industries that may employ tools like the Pulsar event-streaming feature on-premise for real-time analytic operations include retail, gaming, computer vision, and augmented reality. Additionally, they may host other parts of the application that are not time-bound on the private or public cloud.

## Summary

Most companies using the IoT rely on fast query executions of event streams to make faster business decisions. Unfortunately, high latency for streaming data can prevent a device from acting on the data within an allowable period.

Traditional computing uses centralized data centers with their infrastructure to handle their computing and storage needs. However, a centralized data center quickly becomes inadequate for more sophisticated and latency-sensitive applications.

Edge computing places resources as close to the IoT device or user as possible, reducing data processing time and untimely travel time to centralized data centers. And notably, the service provider edge and the user edge are the two main classes of edge computing.

CSPs leverage their network to create edge locations that better serve latency-sensitive operations. With the user-level edge, on-premise data centers close to or present on the user device can perform high-speed analysis — essential for latency-sensitive applications.

Organizations using these tiers can use Pulsar Functions to process their streaming data and perform analytics without worrying about the latency by sending data through the Internet. To learn more about Apache Pulsar, check out the [Apache Pulsar Neighborhood](https://medium.com/apache-pulsar-neighborhood).
