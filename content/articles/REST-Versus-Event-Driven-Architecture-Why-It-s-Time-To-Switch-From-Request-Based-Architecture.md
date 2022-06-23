---
title: "REST Versus Event Driven Architecture - Why It's Time to Switch From Request Based Architecture"
date: 2022-06-23T16:39:59-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - getting-started
    - moving-to-pulsar
    - use-cases
tags:
    - event-driven architecture
level: 100
summary: This article introduces REST and event-driven architectures and explains why organizations should move to an EDA to maximize customer satisfaction.
imgUrl: https://user-images.githubusercontent.com/16946028/175393332-fbd80156-a0a1-4f96-84a2-56d01e6bc16e.png
author:
    name: Pulsar Neighborhood
    imgUrl:
---

Building for an improved customer experience should be at the forefront of every organization’s mind during development. Improving engagement and customer information is one way of ensuring an enhanced customer experience.

For example, social media websites like Instagram and Facebook notify you when someone likes, comments, or follows you. Likewise, your favorite food vendor app tells you when your order is ready and on its way.

All these immediate notifications are a result of the application of event-driven architecture. Unlike representational state transfer (REST) applications that rely on a back-and-forth exchange (request and response) approach to information, event-driven architectures (EDA) respond based on specific events.

This article introduces REST and event-driven architectures and explains why organizations should move to an EDA to maximize customer satisfaction.

## A Look at REST

REST architecture follows a request and response model, where users must send requests before receiving a response. A REST service application tightly couples each microservice for execution in a pre-arranged sequence.

REST architectures help define rules for different computer systems to communicate on the internet and create stateless and reliable APIs. The following are two fundamental guiding principles of a REST architecture:

* Client and server separation
* Statelessness

### Client and Server Separation

In REST, the separation of concerns principle implements the needs of the client and server separately. Separating the user interface needs from the server needs makes each component easy to scale and evolve independently.

### Statelessness

In REST architecture, the server retains no information from a session, and the receiver understands the information in each session without needing context from previous sessions. This quality helps improve performance in high-volume operations by reducing server load.

Other guiding principles of REST include its ability to cache information and its layered system, which helps promote system scalability.

![image1](https://user-images.githubusercontent.com/16946028/175393212-e5d354a9-f2c4-4922-be7f-9e6a1c16f044.png)

As a request-based architecture, a single orchestrator coordinates all interactions between microservices, introducing a single failure point.

Here are some limitations of REST:

* Poor customer experience
* Tightly coupled architecture introduces cascading failures
* Hard to scale
* Waste of resources

### Poor Customer Experience

Since customers must send in a request for information each time, it increases the wait time for a single round trip and can be frustrating. For example, the cumulative time spent on the food vendor application is the sum of all the time spent on each microservice (inventory, stock, billing, delivery).

### Tightly Coupled Architecture Introduces Cascading Failures

As each microservice in a REST application is mainly dependent and connected, a failure in one service causes an overall system failure. Failures from the inventory service mean updates to the next microservice (billing) in the sequence never happens, which leads to cascading failure.

### Hard to Scale

Due to the large amounts of interconnected APIs, the application becomes harder to scale with multiple endpoints present.

### Waste of Resources

As each request follows a predefined sequence of events before fetching a response, a single action makes several unnecessary API calls to a server. This wastes resources for both the client and the server, ultimately increasing costs.

## A Look at EDA

Unlike REST, EDA uses an event to trigger and communicate between loosely coupled microservices. An event could be a change in a state or an update, like adding an extra item to a shopping cart or canceling a ride.

EDA contains three key components. It includes an event producer, an event router, and an event consumer. When an event occurs, the producers publish it to the event router, filtering it and relating the information to the consumers. You can scale, update, and deploy producer and consumer services independently because they exist independently.

Other names for EDAs include push, streaming, or asynchronous APIs. It performs two essential functions:

* It acts as a medium by which consumers subscribe to events of interest.
* It ensures synchronous delivery of events to subscribed consumers.

Some advantages of EDA are:

* Reduced chance of cascading failures
* Reduced costs
* Improved customer experience
* Easier to scale
* Agile development

Let’s take a closer look at each of these.

### Reduced Chance of Cascading Failures

By decoupling the producer and consumer events, the loss of one service does not affect other services, which remain operable.

### Reduced Costs

As each request happens when an event occurs, and with each service decoupled, it prevents wasteful, repeated API calls — reducing the consumption of resources.

### Improved Customer Experience

As each event updates customers, increased engagement and reduced waiting time enhance the overall customer experience.

### Easier to Scale

If any of the services exceed operational capacity, it's easier to provide additional resources to meet demand. The decoupled architecture also helps protect your application against failures in a specific service.

### Agile Development

With the presence of an event router, developers and engineers don't need to write custom code to filter events. Instead, the event router filters and publishes messages to the consumer. The event router also reduces heavy coordination and reliance between the producers and consumers, which helps increase the pace of development.

Various methods exist for building an EDA, such as WebSockets, webhooks, and server-side events (SSE).

## REST Versus EDA

Adopting an EDA approach to applications helps improve the quality of experience and engagement for customers because users constantly receive information as it occurs.

The request-response-based interaction model of REST architecture represents a one-to-one model where customers must make requests regularly. This model can be frustrating and time-consuming. Additionally, REST employs a tightly coupled structure, which means that a failure in a single service causes other services to fail. This tight coupling makes scalability harder to achieve in the future.

The EDA architecture services customers based on events. Events trigger a response, and this response keeps customers in the loop about the service.

EDAs follow the pub-sub messaging model, where the publisher and subscriber services are separate from each other. The pub-sub model decouples the publisher and subscriber channels and communicates through a message broker. This separation of their services allows for asynchronous receiving and delivery of messages by the broker.

Here’s how this model works:

* The publisher publishes messages to the message broker.
* The message broker organizes the messages into various categories for delivery to the subscriber.

This decoupled pub-sub messaging system makes event notification seamless. Publishers must only send their messages and rely on message brokers to deliver them when needed, making it ideal for most applications. The decoupled model also allows the continuous addition of streaming data sources and is easily scalable.

Furthermore, most EDAs use a decoupled system and separate the publisher service from the subscriber service. Therefore, the other service proceeds as planned even if another service fails.

## How EDA Helps Support Performance-Sensitive Applications: A Sample Case

Let's explore how an EDA helps a stock-trading application keep its users informed with stock market updates to make timely, informed decisions. Since most high-performance trading applications rely on real-time information and algorithms to make decisions, they use streaming and RESTful APIs to access critical information.

All stock trading applications contain the scrolling ticker, which gives information on the price of a stock at a given time, quantity traded, a green ascending arrow for an increased value from the day before, a red descending value for a reduced value from the day before, and the net price change. The changes in the stock ticker occur through asynchronous APIs and help users evaluate the market sentiment at each point in time.

Users can receive market insights, order information, and risk insights from this trading application by subscribing to market providers. For instance, EDAs provide applications with the ability to perform actions like making decisions on buying an amount of stock when it achieves a specific price range or informing users of certain events.

Additionally, since dashboards use the incoming stream of data to visualize information, investors can easily access the state of the market and make quick business decisions.

## Summary

To ensure a better customer experience, keeping customers in the loop as events occur is necessary. With the adoption of an EDA, customers receive a notice each time an event occurs and do not have to make a request each time they need information. EDA microservices require producer and consumer services connected by an event router that helps publish information to consumers.  It is easy to scale these services because you have them loosely coupled.

The REST API architecture, on the other hand, is dependent mainly on customers making several requests to receive a response. In addition to reducing the quality of experience, constant calls to the API quickly depletes resources and become costly. The tightly-coupled nature of the services also creates a scalability bottleneck.

EDAs are essential in most applications today, particularly for performance-sensitive applications like financial applications, where a delay of mere seconds could result in losses worth millions.
