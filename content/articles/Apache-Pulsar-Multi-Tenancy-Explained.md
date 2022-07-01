---
title: "Apache Pulsar Multi Tenancy Explained"
date: 2022-07-01T10:29:09-04:00
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
    #- pulsar-components
    #- use-cases
tags:
    - multi-tenancy
level: 200
summary: Apache Pulsar was built from scratch to focus on multi-tenancy as a founding principle. To manage multi-tenancy aspects within a Pulsar instance, Pulsar supports a concept called tenants.
imgUrl: https://user-images.githubusercontent.com/16946028/176910575-a0a813bc-1fb3-4ac2-9184-c1eef2e6cb8e.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

Multi-tenancy is a software architecture that allows a single instance of running software to serve multiple tenants, customers, or teams within an organization. In this context, a tenant represents a group of users and a multi-tenant software platform represents multiple users of an organization — or several organizations — sharing system resources of a common software platform. Thus, multi-tenancy falls under the shared design principle.

In multi-tenancy architecture, even though infrastructure resources are shared, each tenant can have their policies defined to establish a specific governance strategy. Tenants can also be isolated from each other to meet metrics like service level agreements (SLAs) or security requirements.

Apache Pulsar was built from scratch to focus on multi-tenancy as a founding principle. To manage multi-tenancy aspects within a Pulsar instance, Pulsar supports a concept called tenants. In this article, we will cover:

* How multi-tenancy oriented aspects are implemented in Pulsar
* How organizations can use the multi-tenancy feature of Apache Pulsar
* Use-cases that would benefit from multi-tenancy
* Benefits of adopting multi-tenancy in an Apache Pulsar instance

## Deep Dive into Multi-Tenancy

In Apache Pulsar, an instance can have multiple clusters. Each cluster consists of several computing resources and storage media. In a multi-tenancy hierarchy, a tenant — which can be across multiple clusters in an Apache instance — forms the topmost level. Next to the tenant is the namespace. Together, the tenant and the namespace form the concept of multi-tenancy in Apache Pulsar.

To help understand the concept of multi-tenancy in Apache Pulsar, take a look at the following diagram.

![image2](https://user-images.githubusercontent.com/16946028/176910509-3b14bc4f-fba4-4341-9ac0-49194cc1e48d.png)

* All Cluster 1 components are purple and Cluster 2 components are green.
* All components/resources related to Tenant 1 are **bolded**.
* Tenant 2-related components are in default format.

Let’s say there’s an organization that has decided to use Apache Pulsar for their event processing needs. This organization consists of several teams, each of which has ownership of a different application serving its business goals. With the multi-tenancy capability of Apache Pulsar, they can save costs, optimize resource utilization, and save productivity through reduced administration tasks. At the same time, they don’t need to lose flexibility in controlling tenant-based policies and security governance because of the architecture. With Apache Pulsar’s multi-tenant capabilities, the architecture can meet these requirements.

So, how is this done in Apache Pulsar? One approach is that the Pulsar administrator creates tenants for each application and configures the resource capacity, along with a specific authentication and authorization schema for each tenant. For instance, Tenant-1 is based on the OAUTH2-based authorization mechanism, while Tenant-2 is based on the Kerberos-based authorization mechanism. Also, Pulsar provides flexibility to the admin so that among the “N” number of clusters in a Pulsar instance, only “M” clusters can have a specific, tenant-based policy. The remaining “M-N” clusters can have a different policy setup.

Within each application, the tenant admin can create namespaces representing the administrative aspect of a tenant. If an application represents a tenant, modules within the application form a namespace. For instance, If an e-commerce application is a tenant, then a shopping cart can be one namespace, product inventory another, and so on.

Underneath the namespaces in Apache Pulsar are the topics. All the configuration policies set on the namespace level also apply to its topics. All tenants, namespaces, and their topics are identified in Apache Pulsar by name.

### Create Tenant, Namespace, and Topic Using Pulsar Admin

Here are some examples of how to create these entities in Apache Pulsar through the command-line utility, pulsar-admin. **_Note: Similar admin operations can be performed by using the Admin APIs of Apache Pulsar_**.

Command to create a tenant:

```bash
pulsar-admin tenants create tenant-1
```

Command to create a namespace in `tenant-1`:

```bash
pulsar-admin namespaces create tenant-1/namespace-1
```

Command to create a topic in `tenant-1` and `namespace-1`

```bash
pulsar-admin topics create tenant-1/namespace-1/topic-1
```

By default, Apache Pulsar has an out-of-the-box tenant named `public` and namespaces are named `default` within that default public tenant. Also, in Pulsar, it’s not necessary to create a topic in advance, as Pulsar can create the topic dynamically.

### Policies and Resource Quotas

When it comes to controlling the resource usage or establishing some sort of control over the namespace, you can explore and set different policies and resource quotas in Apache Pulsar.

You can set policies and establish control over backlog quotas, time-to-live settings for messages, retention period, dispatch rate of messages from topics in a namespace, et. al., at the namespace level.

To get the default policy set on a namespace, execute the command below:

```bash
pulsar-admin namespaces policies tenant-1/namespace-1
```

Let’s say you need to limit backlog storage to 10 GB in `namespace-1` for `tenant-1`. You can issue the following backlog quota policy command:

```bash
pulsar-admin namespaces set-backlog-quota --limit 10G --policy producer_request_hold tenant-1/namespace-1
```

Resource quotas provide options to:

* Limit inbound bandwidth and outbound bandwidth in terms of bytes/second for a namespace.
* Limit inbound and outbound message rate (messages/second) for a namespace.
* Limit memory usage (megabytes) for a namespace.

The following command sets the resource quota for the `namespace-1` in `tenant-1`:

```bash
pulsar-admin resource-quotas set --msgRateIn 1000 --bandwidthIn 5242880 --msgRateOut 1000 --memory 5 --bandwidthOut 5242880 --bundle 0x00000000_0x40000000 --namespace tenant-1/namespace-1
```

where:

`msgRateIn` — number of inbound messages per second

`msgRateOut` — number of outbound messages per second

`bandwidthIn` — inbound bytes/second

`bandwidthOut` — outbound bytes/second

`memory` — memory usage in megabytes

### Benefits of Multi-Tenancy

With multi-tenant, architecture-based platforms, infrastructure resources are shared. That means the number of instances required to operate is reduced — along with the associated cost factor. There are also fewer administration activities such as OS-level patching, fewer necessary application software or antivirus upgrades, and fewer monitoring agents that need to be deployed.

These are some of the key advantages of a multi-tenancy platform compared to a dedicated tenant or non-multi-tenancy platform. Without a multi-tenancy approach, you must deal with an isolated set of instances for each tenant, leading to a large number of instances, increased cost, and more admin operations.

### Use Cases of Multi-Tenancy

For an organization with a SaaS platform, Apache Pulsar’s multi-tenancy capability offers many benefits for optimizing resources and reducing the cost of microservices applications. If you want to achieve a low footprint in infrastructure resources, then multi-tenancy is the way to go.

With multi-tenancy platforms such as Pulsar, you can build cloud computing-based application architectures based on containers, RESTful services, and pub-sub patterns. Also, by setting policies and quotas in Apache Pulsar, the SLAs of client applications are met for each tenant. This means that no single tenant can jeopardize the Pulsar instance and the dependent application’s performance.

## Conclusion

Apache Pulsar has emerged as a powerful, open-source, distributed messaging and streaming platform. With its powerful multi-tenancy feature, Pulsar enables enterprises to create and manage their infrastructure according to shared design principles. At the same time, users don’t have to compromise on things like data access, data security, topic isolation, scalability, or control of resource usage.

Although both computing resources and storage have become cheaper in recent years, they are not free. Every organization and Infra team is looking for options to keep the budget under control, so Apache Pulsar’s multi-tenancy features are most welcome.
