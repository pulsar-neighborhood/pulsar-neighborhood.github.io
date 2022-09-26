---
title: "Understanding the Roles of Zookeeper and Bookkeeper in Pulsar"
date: 2022-08-23T13:41:03-04:00
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
    #- microservices
    #- functions
    #- storage
level: 200
summary: Although they have some similarities, ZooKeeper and BookKeeper provide different administrative services in Pulsar. This article will help you to understand how ZooKeeper and BookKeeper work, the roles these components play in Pulsar, and the differences between ZooKeeper and BookKeeper, highlighting use cases where each component is particularly useful.
imgUrl:
author: 
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: Although they have some similarities, ZooKeeper and BookKeeper provide different administrative services in Pulsar. This article will help you to understand how ZooKeeper and BookKeeper work.
    keywords:
        - bookkeeper
        - zookeeper
        - apache pulsar
---

Apache Pulsar is a well-known open-source platform for handling distributed event streams to serve real-time use cases. To carry out its operations, perform administrative tasks, and manage storage, Pulsar uses external components. Two of these components are [ZooKeeper and BookKeeper](https://pulsar.apache.org/docs/administration-zk-bk/).

ZooKeeper and BookKeeper are both open-source Apache products. Yahoo developed these libraries and then released them as open source to the Apache Software Foundation. In Pulsar, ZooKeeper handles configuration and coordination-related tasks, while BookKeeper is responsible for the persistent storage of message data.

Although they have some similarities, ZooKeeper and BookKeeper provide different administrative services in Pulsar. This article will help you to understand how ZooKeeper and BookKeeper work, the roles these components play in Pulsar, and the differences between ZooKeeper and BookKeeper, highlighting use cases where each component is particularly useful.

## Overview: ZooKeeper and BookKeeper

Before turning to the roles that ZooKeeper and BookKeeper play in Pulsar, let’s take a closer look at what each of these components are.

### ZooKeeper

Apache ZooKeeper is a battle-tested service developed to serve some of the key requirements of distributed applications. These include:

* Configuration management
* Naming service
* Leader election process
* Distributed synchronization service

The above features are essential for a distributed application. Zookeeper has these features out of the box, making task coordination in a distributed application much simpler.

Although ZooKeeper serves several distributed application needs, it’s the application’s responsibility to know which ZooKeeper features are required that the integrated application requires. For example, a distributed application that integrates with ZooKeeper can use its configuration management to store certain metadata specific to the application, which might differ from the metadata or configuration data stored by another distributed application.

ZooKeeper has a filesystem-like directory structure, called znodes, to manage configuration data. Each znode can store data of a maximum size of 1 MB and can have another child node. The entire hierarchical structure of znodes is available for access in the ZooKeeper cluster nodes’ memory. This way, a swift and scalable response can be achieved when a configuration read request comes from a client.

### BookKeeper

Apache BookKeeper was originally a sub-project developed under ZooKeeper. Later, it emerged as a top-level project. BookKeeper is a highly scalable, reliable, and performant storage solution optimized to serve real-time workloads. Following are some of the BookKeeper’s capabilities:

* High-performance distributed storage solution
* Highly scalable
* Provides IO isolation
* Data replication
* Targeted message placement

## ZooKeeper and BookKeeper: What’s the Difference?

Now that you have understood the high-level overview of ZooKeeper and BookKeeper, the following section will provide you with the details:

* What’s the difference between these components?
* Which role do these components play in Pulsar?
* How does Pulsar use these components for various use cases to meet its goals?

### The Role of ZooKeeper in Pulsar

Pulsar architecture supports multi-cluster deployment models distributed across multiple geographical regions. This is configurable per the customer’s need and policy on high availability and disaster recovery plans. Regardless of whether it’s a Pulsar instance with a single cluster or multiple clusters, the role of ZooKeeper is to handle configuration, the leader-election process, and coordination tasks for a Pulsar instance.

From an administrative perspective, note that two separate ZooKeeper quorums are involved in the Pulsar instance. A quorum in ZooKeeper is the minimum number of ZooKeeper nodes in a cluster that should be available to serve the client requests.

One quorum serves individual cluster-level configuration management and coordination of tasks within the cluster. The other quorum is for global configuration management and task coordination of an entire Pulsar instance with multiple clusters.

In the case of a Pulsar instance with a single cluster, you can use the same cluster of ZooKeeper nodes both for local cluster needs and global instance needs. This is usually done to save resource costs and minimize the effort involved with server administration tasks.

However, in the case of a Pulsar instance with a multi-cluster deployment mode distributed across various geographical regions, ensure a separate global configuration store configured to include ZooKeeper clusters from multiple regions. This setup enables high availability in the event of failures and facilitates topic partitions spanning different regions. To understand more on this, refer to [Pulsar documentation](https://pulsar.apache.org/docs/administration-zk-bk/#deploy-configuration-store).

### Use Cases of ZooKeeper in Pulsar

Pulsar uses Apache ZooKeeper for use cases that include those outlined below.

#### Leader Election Process

A leader node is the one that is responsible for writes, and the other nodes, the followers, receive the updates made by the leader node. In this way, all cluster nodes eventually become consistent with the data. In the case of read requests, any node in the cluster can serve the request.

For example, assume there are three nodes in a ZooKeeper cluster, with node 1 elected as a leader node, and nodes 2 and 3 marked as followers. Any write or update requests will be forwarded to node 1 to handle the request, and the other nodes will eventually become synchronized with the updated data. When a client application sends a read request to any of the ZooKeeper follower nodes, the data is served locally from that follower node.

This is possible because, in ZooKeeper, all the nodes have the data to serve the read request. When a leader node goes down in a cluster, a quorum is established, and a new leader is elected from the followers. This process happens automatically and should occur as efficiently as possible.

#### Metadata and Configuration Management

Pulsar instance configuration, such as cluster configuration data, tenants and namespace metadata information, and topic metadata, are stored in ZooKeeper. The broker in Pulsar ought to know the ledgers that correspond to a topic. Such metadata information is also stored in ZooKeeper. Whenever a client requests any configuration/metadata information stored in the ZooKeeper, it gets served.

#### Monitoring the Health Status of Nodes

ZooKeeper stores the health information of each broker in the Pulsar cluster through its ephemeral znodes. Ephemeral znodes are a kind of znode that exist as long as the corresponding client session is active. It means there is an internal mapping and metadata information in ZooKeeper to understand which znodes are for which broker session.

Once the client session is closed/unavailable, the corresponding znode will be removed from ZooKeeper. This way, the availability of information on which brokers are active to serve topics and which brokers are dying or dead already are maintained in ZooKeeper. The znode removal action/information of dead brokers is used during task coordination to decide/choose a suitable active broker to serve a client’s request (producer/consumer client) for acting on a message/event.

### The Role of BookKeeper in Pulsar

The role of BookKeeper in Pulsar is to handle message/event storage needs for a Pulsar instance. Where do the incoming messages to a Pulsar topic get stored? The answer is in BookKeeper nodes/Bookies.

A producer client generates messages/events and reaches the broker node. Broker being a stateless component in Pulsar, forwards the messages to Bookies for persistence. Bookies are based on a distributed Write-Ahead Log system that utilizes the ledger mechanism to store received messages.  

A ledger is an important concept in the BookKeeper. It’s like a file that’s opened only once to write and append the data only to the end. However, data read from the ledger at a random position, such as from the middle, is possible. Once a ledger file is closed, it can’t be re-opened for writes.

In Pulsar, a managed ledger is developed as an abstraction over the BookKeeper's ledger to add multiple ledger files to store data in several ledger files. Then during a read operation, it can concatenate the contents from these ledger files and serve the data as required. Therefore, there can be more than a single ledger for a topic. By default, BookKeeper ensures that messages directed to bookies are synced to disk, and only then is an acknowledgement dispatched to the broker.

### Use Cases of BookKeeper in Pulsar

Pulsar uses Apache BookKeeper for use cases that include those listed below.

#### Scalability Reasons

Apache Pulsar is built for handling a large volume of messages. You can dynamically add more bookies to your Pulsar cluster if a single bookie node cannot meet the storage demand. Adding more bookies can increase the ledgers and therefore increase throughput as well. It is because bookies are designed to handle concurrent writes and read from multiple ledgers.

#### Replication

Apache Pulsar has a replication feature through which data redundancy is configurable based on the needs. This feature helps store the same data as multiple copies in multiple bookies. In this way, when a bookie fails, the brokers in Apache Pulsar can still serve a client's request by reading the data from other bookies.

Apache BookKeeper is built with such a feature, and it is easy to replicate a message to the desired number of copies. You could configure the replication settings to control how many copies need to be maintained. Once configured, Apache BookKeeper will carry out the replication process for you.

#### Message Placement Policies

You can control the placement of each replicated message copy in your Pulsar instance. For example, you can retain a certain number of copies across racks in the same region and a certain number of copies in a rack of different regions. This paves the way to access messages in the time of disaster recovery scenarios.

### Differences Between ZooKeeper and BookKeeper

Both ZooKeeper and BookKeeper store some form of data for Pulsar. However, the key difference lies in what sort of data these components store and serve.

ZooKeeper is used to store configuration data/metadata for Pulsar, including the instance configuration data such as clusters, tenants, and namespaces, topic metadata, information on Broker load, and storing the metadata of BookKeeper, such as ledger information.

BookKeeper, on the other hand, stores the actual event’s data (messages) in its storage for persistence and later reads/replays messages at the time of need. The information about cursors is stored in BookKeeper as well. Cursors refer to the offset/subscription position until consumers have subscribed to messages from each topic. Starting from Pulsar release version 2.8, the code packages/Pulsar functions are stored in BookKeeper.

## Conclusion

Pulsar is a real-time distributed messaging platform proven for its highly scalable and multi-tenant capabilities. To achieve scalability, reliability, high availability, message durability, performance, and other criteria of a distributed application platform, Pulsar uses ZooKeeper and BookKeeper as its components.

A Pulsar instance can have several ZooKeeper nodes and BookKeeper nodes based on the processing and storage needs. Pulsar uses ZooKeeper mainly for its capability to manage configuration, leader election, and task coordination in a distributed environment and BookKeeper for its scalable, durable, and high-performance storage ability.
