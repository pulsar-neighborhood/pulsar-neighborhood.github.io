---
title: "Happenings in the AP Neighborhood Dec. ‘21"
date: 2021-12-06T16:01:27-05:00
draft: false
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - newsletter
tags:
    #- microservices
    #- functions
    #- storage
level: #100, 200, 300
summary: For this issue, we have three new committers, a new milestone, and lots of talks. Plus our normal features of a Stack Overflow question and some community stats.
imgUrl: https://miro.medium.com/fit/c/1360/1360/1*KTNrGZT4pvfz5B9_KE2BZg.png
author:
    name: Aaron Williams
    imgUrl:
---

Was this forwarded to you? Click [here](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood) to get future copies of Happenings!

Hello Everyone,

For this issue, we have three new committers, a new milestone, and lots of talks. Plus our normal features of a Stack Overflow question and some community stats.

## **New Committers**
The Apache Pulsar PMC announced the addition of three new Committers, Marvin Cai, Jiwei Guo and Michael Marshall.

Marvin Cai is a Software Engineer from StreamNative and made his first PR in August 2020 and since then has made over 310 contributions (PR, comments, reviews, etc) to Apache Pulsar. You can check out his GitHub repo [here](https://github.com/MarvinCai).

Jiwei Guo is a Software Engineer from StreamNative and made his first PR in August 2020. Since then Jiwei has made over 250 contributions to Apache Pulsar. You can check out his GitHub repo [here](https://github.com/Technoboy-).

Michael Marshall is a Senior Software Engineer at DataStax. He made his first contribution in November 2020 and since then he has made over 360 contributions. His GitHub repo is located [here](https://github.com/michaeljmarshall).

So please join us in welcoming all three of our new committers and take a moment to check out their GitHub pages, check out the other work that they have done, and take a moment to follow them.

## **10k Stars on GitHub**
![image](https://user-images.githubusercontent.com/1042872/153696409-541d0749-dc0d-420e-8fae-372e358cc5b0.png)

And speaking of GitHub, Apache Pulsar hit a major milestone on Sunday 28 November. We surpassed **10,000** stars on GitHub. In February 2021, we had just over 7k stars, so in the last 3 quarters, we have increased our Stars by 45%. We wrote a [short blog post]({{< relref "/articles/9966-stars-who-will-be-the-10000" >}}) about our history and how we have grown since our inception five years ago. At this rate, we will get our second 10,000 stars in about 18 months. If you haven’t already, please star [Apache Pulsar](https://github.com/apache/pulsar) and let’s see if we can get to 20k by the end of 2022!

## **Upcoming events…**

As always, we have lots of talks going on in the community and even with a lot of holidays coming up, we have a lot of events coming up.

On 8 December, Pedro Silvestre of Imperial College London will be talking to the [NorCal Neighborhood Meetup](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/282151278/) group about his blog post “[On the Internals of Stream Processing](https://www.doc.ic.ac.uk/~pms20/post/stream-processing-thread-model/)”. So this talk will not be solely about Apache Pulsar but streaming in general. In his post, he used Apache Flink.

On 15 December Jowanza Joseph will be speaking at the [Netherlands Apache Pulsar Meetup](https://www.meetup.com/netherlands-apache-pulsar-meetup/), about Apache Pulsar IO. Jowanza is a great speaker and very knowledgeable about Apache Pulsar, to the point that his book is coming out soon and is called [Mastering Apache Pulsar: Cloud Native Event Streaming at Scale](https://www.oreilly.com/library/view/mastering-apache-pulsar/9781492084891/).

Encrio Olivelli will be speaking on December 21st (12:00 PST) at the [Seattle Java Users Group](https://www.meetup.com/seajug/). In this session you will see how to use Pulsar in a JakartaEE Web Application deployed on Apache TomEE via the JMS/EJB API, without installing any additional components to your cluster.

Our first event of 2022 will be with Rob Morrow of SigmaX on 12 Jan 2022 at the [NorCal Neighborhood Meetup](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/281386918/). The talk is titled “Using Open Source Software to Improve Streaming on the Edge” and about how to use Apache Pulsar and Apache Arrow to get sensor data from the billions of IoT devices into an IoT Gateway, because going to the Cloud is too slow and too costly.

Do you live in the Princeton, NJ area? The NYC Apache Pulsar Meetup is hosting a “[Pulsar, Pizza, and Phun](https://www.meetup.com/new-york-city-apache-pulsar-meetup/events/282270385/)” event on 13 Jan 2022. Yes this is an in person event!

15–16 Jan ‘22- Pulsar Summit Asia

Would you and some colleagues like to set up a [Neighborhood Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood) group or maybe you have someone who you would like to hear speak at a future meetup? Let us know and we can give you some help. Visit us at our Neighborhood Meetup page or our [slack](https://pulsar.apache.org/en/contact/) channel #meetup and ask questions.

## **Great questions from the Apache Pulsar [Stack Overflow](https://stackoverflow.com/questions/tagged/apache-pulsar?tab=Newest)**

As you know, we have a very active slack and Stack Overflow neighborhoods. You can ask questions at both locations and get answers quickly. Slack does have two big weaknesses. One, it is limited to the number of messages that can be saved at about 10k and we hit the limit about every three months. Two, it is not searchable by Google. Thus, when you put the error message that you received into Google, you won’t see that the question has already been answered once or twice on Slack. So to promote our great Stack Overflow channel, we thought that we would find a good question and include it here in Happenings.

_[Question](https://stackoverflow.com/questions/57177337/how-to-avoid-the-automatic-deleting-of-inactive-topics-in-apache-pulsar): I have an application that produces messages to Pulsar under a specific topic and shut down the application when it’s finished; at the same time, no consumer exists to read this topic._

_After a while, when I create a consumer and want to read the written data out, I found all data are lost since the topic I’ve written been deleted by Pulsar._

_How can I disable the auto-deletion of inactive topics in Pulsar?_

Follow the link above to get the answer. Do you have something to add?

## **Stats of the Month**
For Nov, we had 77 contributors making 387 contributions, with 19 of those contributors making their first contribution. We also had over 2k conversations from 244 different people. So the community is as busy as ever!

## **Apache Pulsar in the News**

Here are some blog posts that we have found from around the web. We think that they are good, but we might not have read them all. Let us know what you have written and we will share it. Post links on our [blogs-articles](https://apache-pulsar.slack.com/archives/C02CUPZ2KMZ) channel on the Apache Pulsar Slack. Or to see more, plus presentations, go [here](https://pulsar.apache.org/en/resources/)

[Distributed Locks With Apache Pulsar](https://betterprogramming.pub/distributed-locks-with-apache-pulsar-2d95a4d5ff5e)
[Announcing Memgraph 2.1](https://memgraph.com/blog/memgraph-2-1-release)
[Infinite Scale without Fail](https://www.datastax.com/blog/infinite-scale-without-fail-starlight-rabbitmq)
[Apache BookKeeper Observability — Part 1 of 5](https://medium.com/splunk-maas/apache-bookkeeper-observability-part-1-introducing-the-metrics-7f0acb32d0dc)