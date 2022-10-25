---
title: "Apache Pulsar Versus Kinesis"
date: 2022-08-23T13:19:56-04:00
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
    - use-cases
tags:
    #- microservices
    #- functions
    #- storage
level: 100
summary: This article offers a high-level comparison of Pulsar and Kinesis, contrasting important factors such as cost, scalability, and performance. exploring relevant use-cases that highlight the capabilities and differentiators of each.
imgUrl: https://user-images.githubusercontent.com/16946028/186224765-42c7873c-98fd-459f-ab83-41ccc307887e.png
author:
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: Apache Pulsar and Kinesis are two data streaming platforms that help digest, buffer, and perform fast analysis (seconds or minutes) for various business use cases. Let's compare to the two to find the best place in your solutions.
---

Streaming data has become key for business success, putting users ahead of the competition with quick insights that help them improve the customer experience and make timely decisions.

Apache Pulsar and Kinesis are two data streaming platforms that help digest, buffer, and perform fast analysis (seconds or minutes) for various business use cases. Apache Pulsar is an open-source, distributed messaging platform that uses the pub-sub messaging pattern for ingesting and processing messages. Amazon Kinesis is a fully managed, scalable, real-time streaming platform capable of handling various data formats, like text, music, and video.

This article offers a high-level comparison of Pulsar and Kinesis, contrasting important factors such as cost, scalability, and performance. exploring relevant use-cases that highlight the capabilities and differentiators of each.

## Introducing Apache Pulsar

Many view Apache Pulsar as an improved, superior version of Kafka, upon which it’s built. Kafka originated from LinkedIn as a message queuing system before being open-sourced in 2011. The Yahoo team then used it to build Pulsar, which they made open-source in 2016.

Apache Pulsar is a cloud-native, distributed pub-sub messaging and queueing system designed to stream billions of events daily while maintaining high performance and low latency (under 5ms). Fortune 500 companies like Target, Uber, and Netflix employ Pulsar for their streaming needs.

Here are some features of Pulsar:

* **Multi-tenancy to foster easier collaboration among teams:** Pulsar uses the multi-tenant system, which allows multiple tenants to work across clusters in a single instance. These tenants are kept separate and organized with authorization, namespaces, and authentication. In this way, new teams skip the tedious process of having to spin up extra instances for every new project.
* **Horizontal scalability:** Pulsar offers scalability from the ground up. Thanks to its decoupled architecture, producers, consumers, processors, and connectors are independently scalable, which helps organizations adapt to increased demand.
* **Faster and easier deployment with Pulsar serverless functions:** With Pulsar functions, developers don’t need to learn new APIs. Instead, they can use Pulsar's lightweight APIs for processing the most common streaming use cases, like filtering and routing.
* **Geo-replication for better disaster recovery:** Pulsar allows for the replication of persistently stored data across multiple data centers. This feature helps cushion organizations against data loss in disasters and ensures high availability of services in various locations.
* **Message retention:** Thanks to Pulsar’s retention policies, you can persistently store messages yet to be acknowledged, as well as acknowledged messages within Pulsar for a given period. For example, Pulsar brokers keep unacknowledged messages in a backlog. However, engineers can specify a time to leave (TTL) as part of the retention policy to help free disk size.

## Apache Pulsar Architecture

The highest level of Pulsar exists as a Pulsar server, which consists of a Pulsar instance containing one or more clusters. A Pulsar cluster consists of the following:

* **One or more brokers:** Brokers act as intermediaries between message producers (publishers) and consumers (subscribers). Brokers are responsible for handling and processing consumer messages, dispatching processed messages to consumers, and persistently storing these messages in bookkeeper clusters.
* **BookKeeper cluster:** A collection of one or more bookies that help store messages. Bookies utilize ledgers and write-ahead logs (WAL) to ensure the durability of Pulsar messages.
* **ZooKeeper cluster**: Specific to the housing cluster, a ZooKeeper cluster helps coordinate tasks with other Pulsar clusters. The ZooKeeper acts as the Pulsar and BookKeeper metadata store and helps with cluster configuration and coordination.

## Introducing Amazon Kinesis

Amazon Kinesis is a scalable and durable real-time event streaming platform capable of collecting, ingesting, and processing various data formats, such as video, audio, website streams, and Internet of Things (IoT) data. It has four service offerings:

* **Kinesis Data Streams (KDS):** KDS offers durable and scalable real-time ingestion and processing of data from multiple sources while in high-performance operation mode. It can handle large volumes of data — up to gigabytes per second. Organizations can create Kinesis Data Streams Applications, which help read millions of messages as records from an application, consume and process these messages with the Kinesis Client Library, and then send the processed records for use in dashboards, as alerts, or for use in other AWS services.
* **Kinesis Video Streams (KVS):** KVS is a secure real-time video streaming service that allows connected AWS devices to stream video content to AWS for analytics, machine learning, and other processing.
* **Kinesis Data Firehose (KDF):** KDF is an extract, transform, and load (ETL) service that enables fast and easy capturing and loading of data into destinations like data lakes and AWS data stores for use in analytics. KDF also offers auto-scaling and supports batching, compression, and encryption of streaming data.
* **Kinesis Data Analytics (KDA):** This Apache Flink built-in service makes event stream processing easy by using operations like map, filter, aggregate, and window for running queries against data streams.

## Amazon Kinesis Architecture

The Kinesis architecture consists of the following key components:

* **Data producers:** These include corporate, mobile, and database data. Producers emit and transport this data to available EC2 instances during generation.
* **Data consumers:** Consumers retrieve all the available shards in a data stream. Consumers may be Apache Storm running on Amazon EC2, an Amazon Kinesis Data Firehose delivery stream, or Amazon Simple Storage Service (S3).
* **Shard:** This represents a unique sequence of records in a data stream. Various shards make up a data stream. Data capacity is a direct function of the number of shards specified for that stream.
* **Record:** A record represents a unit of data in a Kinesis data stream. It consists of a sequence number, a partition key, and a data blob.
* **Partition key:** This helps data records identify their location among various shards in a data stream. Every application writing data to a stream must specify the partition key.
* **Sequence number:** This is a unique identifier for records existing within a shard.

Other essential concepts include retention period, capacity mode, and the Kinesis Client Library (KCL). Here's a basic outline of how Kinesis works:

* Producers ingest and stream records into the Kinesis Data Streams (KDS).
* The KDS consists of shards, which contain a set of records. Subsequently, consumers retrieve and process these records from KDS and analyze them using KDA and KCL.

## Differences Between Apache Pulsar and Kinesis

### Price

As an open-source service, Pulsar has no upfront fee — the only cost is setup and maintenance. Kinesis, on the other hand, uses pay-as-you-go (PAYG) and provisioned-capacity pricing. Provisioned-capacity pricing may be disadvantageous to organizations, as costs keep running even when resources aren’t in use.

### Scalability

Pulsar’s multilayer architecture makes scaling easy. With Pulsar, the messaging, storage, and processing layers exist separately, which drives easy scaling with no interruptions to performance. In addition, Pulsar doesn't use partition rebalancing like Kafka (a disruptive and expensive process), so we can add new topics without worrying about their effect on performance.

On the other hand, although Amazon offers application auto-scaling of resources, it comes with certain limitations. For example, with Kinesis Data Streams, organizations must be able to estimate the necessary resources because of various set constraints:

* Scaling up more than twice your current shard count for a stream
* Scaling down more than half your current shard count for a stream
* Scale more than the set shard limit for your account

With these limitations, costs for shard streams can pile up quickly — even when resources are underutilized.

### Performance

Both services ingest and process billions of event streams daily with high performance. For Kinesis, organizations have the option to increase throughput by increasing the number of shards in a stream.

### Ease of Setup

As an open-source service, setting up and configuring Pulsar for use in an organization requires proficient skills and can be complex. As a result, most organizations turn to a managed Pulsar service to ease setup and configuration.

Installation may be easier for a fully managed solution like Kinesis as AWS sets up infrastructure, storage, networking, and configurations, but getting the streaming service ready still requires proficiency.

### Documentation and Community Support

The Pulsar doc portal contains various support documents to help anyone get started with Pulsar, from experienced developers to complete beginners. Also, because Pulsar is an open-source service, it has a large and active community of developers and writers on Github and Slack to help Apache Pulsar users connect and help each other.

On the other hand, although Kinesis offers extensive documentation, some concepts, like the Kinesis Client Library (KCL), which handles various tasks like load balancing and resharding, might be difficult for beginners to grasp.

## Similarities Between Apache Pulsar and Kinesis

Apache Pulsar and Kinesis are event streaming platforms that help stream and process billions of messages daily. Here are some of the similarities between the platforms:

* Both platforms offer autoscaling to handle the increased demand for resources.
* Both platforms operate at high performance while processing millions of messages per second on multiple topics.
* They both allow geo-replication, which is essential for disaster recovery, and offer good service coverage for a broad consumer base.

## Summary

Event streaming platforms like Apache Pulsar and Kinesis have become essential for data-driven organizations looking to enable fast decision-making. Apache Pulsar is an open-source distributed messaging platform that helps stream and process event streams for organizations. Meanwhile, Kinesis is an event streaming platform that ingests and processes various data formats for analytics and machine learning purposes.

While Pulsar allows independent scaling, Kinesis users must be able to estimate the needed resources to enable autoscaling efficiently. Also, apart from the cost of setup and management, Pulsar is free. Kinesis provision-based scaling accrues expenses even when resources are not in use.

Most organizations can turn to a managed Pulsar service to help set up, configure, and manage Pulsar for their streaming needs.
