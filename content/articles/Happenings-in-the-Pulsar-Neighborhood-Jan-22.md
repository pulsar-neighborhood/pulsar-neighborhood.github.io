---
title: "Happenings in the Pulsar Neighborhood Jan 22"
date: 2022-01-04T15:32:45-05:00
draft: false
weight: 100
layout: article
showtoc: true
categories:  # must be lowercase shishkabob
    - newsletter
tags:
    #- microservices
    #- functions
    #- storage
level: 
summary: For this issue, we have some end of the year stats, Log4j updates, a new PMC member, and lots of talks. Plus our normal features of a Stack Overflow question and some monthly community stats.
imgUrl:
author:
    name: Aaron Williams
    imgUrl:
---

Was this forwarded to you? Click here to get future copies of [Happenings](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood)!

Happy New Year Everyone!

For this issue, we have some end of the year stats, Log4j updates, a new PMC member, and lots of talks. Plus our normal features of a Stack Overflow question and some monthly community stats.

## **Apache Pulsar is #5 in Commits**
The Apache Software Foundation (ASF) released their “[Apache by the digits](https://blogs.apache.org/foundation/entry/apache-in-2021-by-the)” report and among the interesting details about the ASF is the stat that Apache Pulsar is #5 in commits. We wrote a short blog on the [Neighborhood’s Medium page](https://apache-pulsar-neighborhood.medium.com/), check it out [here](https://apache-pulsar-neighborhood.medium.com/2012ed0ab5c7) and learn about how we grew so much in 2021.

![pieChart](https://user-images.githubusercontent.com/1042872/153459175-21984b24-2bbf-47df-89be-3c86b9238fb7.png)


Source: Apache by the digits

## **Log4j Update**
The log4shell exploit is shaping up to be a very large issue going forward because of how widely used Log4j is. The exploit has even made it into the [popular press](https://www.npr.org/2021/12/14/1064123144/companies-scramble-to-defend-against-newly-discovered-log4j-digital-flaw) and will pop up over the next year as some company will realize that they didn’t update their systems and will be exploited. That is the bad news. The good news is how quickly the Apache Pulsar community reacted. We wrote a quick post that captured those first hours [here](https://medium.com/apache-pulsar-neighborhood/log4shell-security-update-8e8431cc4920). And the quick actions by our neighbors were noticed by the wider open source community. Specifically, Lari Hotari was mentioned in a Sonatype [article](https://blog.sonatype.com/a-new-0-day-log4j-vulnerability-discovered-in-the-wild) (and in many other places) talking about his tester and docker updates.

The official mitigation actions that you need to take are located on the Apache Pulsar [website](https://pulsar.apache.org/blog/2021/12/11/Log4j-CVE/). Although the best way to keep up this and other happenings is to sign up for the [dev@ mailing list](https://pulsar.apache.org/en/contact/).

## **Year End Stats**
The Apache Pulsar Neighborhood grew a lot this year. We had over 3.3k contributions from 351 different neighbors. For comparison, in 2020 we had 1415 contributions (an increase of about 140%), from 212 unique contributors. For conversations in 2021, we had over 24k across GitHub, Slack, and Stack Overflow from 1.2k unique people. In 2020, we had 9,256 conversations from 665 speakers. As you can tell, the neighborhood has more than doubled in 2021!
And a fun final little stat that you probably already heard about, on 29 November, we passed 10k stars on Github. We wrote a [short blog](https://medium.com/apache-pulsar-neighborhood/9-966-stars-who-will-be-the-10-000-bea11ba92b48) about it in November. We are currently at 10,200, so if you haven’t starred the [Pulsar GitHub](https://github.com/apache/pulsar), please take a moment and do so.

## **New PMC Member**
The PMC announced the addition of a new member in December, Liu Yu from StreamNative. If you don’t recognize the name Liu Yu, you probably recognize Anonymitaet who has made many contributions, especially around the documentation of the project. She brings the number of neighbors elevated to the PMC this year to four. The others were Hang Chen from StreamNative, Lin Lin from Tencent, and Enrico Olivelli from DataStax.

## **Upcoming Events**
Our first event of 2022 will be with Rob Morrow of SigmaX on 12 Jan 2022 at the [NorCal Neighborhood Meetup](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/281386918/). The talk is titled “Using Open Source Software to Improve Streaming on the Edge” and about how to use Apache Pulsar and Apache Arrow to get sensor data from the billions of IoT devices into an IoT Gateway, because going to the Cloud is too slow and too costly.

Do you live in the Princeton, NJ area? The NYC Apache Pulsar Meetup is hosting a “[Pulsar, Pizza, and Phun](https://www.meetup.com/new-york-city-apache-pulsar-meetup/events/282270385/)” event on 13 Jan 2022. Yes this is an in person event!

15–16 Jan ‘22- Pulsar Summit Asia- Note that this event is now virtual only.
With more on the way in February and March.

If you missed any of the previous events, such as [Pedro Silvestre](https://youtu.be/3suR1CV-zOE) of Imperial College London or [Jowanza Joseph](https://youtu.be/hpvLVRWHu2A) of Finicity, we just added both of their talks to the [Neighborhood YouTube Channel](https://www.youtube.com/channel/UCVVDEgdWslqCV7wgvpy_QQg). There you will find the rest of the talks that we recorded in 2021, plus links to the ApacheCon talks, and some links to other talks.

Would you and some colleagues like to set up a [Neighborhood Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood) group or maybe you have someone who you would like to hear speak at a future meetup? Let us know and we can give you some help. Visit us at our Neighborhood Meetup page or our [slack](https://pulsar.apache.org/en/contact/) channel #meetup and ask questions.

## **Great questions from the Apache Pulsar [Stack Overflow](https://stackoverflow.com/questions/tagged/apache-pulsar?tab=Newest)**

As you know, we have a very active slack and Stack Overflow neighborhoods. You can ask questions at both locations and get answers quickly. Slack does have two big weaknesses. One, it is limited to the number of messages that can be saved at about 10k and we hit the limit about every three months. Two, it is not searchable by Google. Thus, when you put the error message that you received into Google, you won’t see that the question has already been answered once or twice on Slack. So to promote our great Stack Overflow channel, we thought that we would find a good question and include it here in Happenings.

_[Question](https://stackoverflow.com/questions/70255724/pulsar-compression-decompression-cycle): I am curious about how compression works in pulsar. from the public doc, it states “You can compress messages published by producers during transportation” does it mean client compress the data and the data get decompressed when it arrives at broker so the decompressed data is persisted and consumer later? or it means the compression happens from end-to-end and the decompression happens at consumer side?_

Follow the link above to get the answer. Can you expand on the answer given?

## **Stats of the Month**

For Dec, we had 91 contributors making 411 contributions, with 19 of those contributors making their first contribution. We also had just under 3k conversations from 277 different people. This is about 50% more interaction in December than in November and with all of the holidays that are in December, it just shows how much the community is growing. Plus we now have over 5,700 members on our Slack channel!

## **#ApachePulsar is Growing**
We have seen the tag #ApachePulsar appearing in some new places. We asked that Meetup to add it as a tag that you can add to your events a couple of months ago and they just added it. Also, we have see #ApachePulsar appear on Peloton, so if you are part of that community, add in #ApachePulsar and ride with others from the neighborhood.

## **Apache Pulsar in the News**

Here are some blog posts that we have found from around the web. We think that they are good, but we might not have read them all. Let us know what you have written and we will share it. Post links on our [blogs-articles](https://apache-pulsar.slack.com/archives/C02CUPZ2KMZ) channel on the Apache Pulsar Slack. Or to see more, plus presentations, go [here](https://pulsar.apache.org/en/resources/).

[Apache Pulsar Performance Testing with NoSQL Bench](https://medium.com/building-the-open-data-stack/apache-pulsar-performance-testing-with-nosqlbench-3e9816175ba1)
[Vulnerability Affecting Multiple Log4j Versions Permits RCE Exploit ](https://www.infoq.com/news/2021/12/log4j-zero-day-vulnerability/)(Neighbor Lari Hotari mentioned)
[Distributed Locks With Apache Pulsar](https://betterprogramming.pub/distributed-locks-with-apache-pulsar-2d95a4d5ff5e)
[Announcing Memgraph 2.1](https://memgraph.com/blog/memgraph-2-1-release)
[Infinite Scale without Fail](https://www.datastax.com/blog/infinite-scale-without-fail-starlight-rabbitmq)
[Apache BookKeeper Observability — Part 1 of 5](https://medium.com/splunk-maas/apache-bookkeeper-observability-part-1-introducing-the-metrics-7f0acb32d0dc)
