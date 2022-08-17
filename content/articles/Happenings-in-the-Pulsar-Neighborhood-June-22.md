---
title: "Happenings in the Pulsar Neighborhood June '22"
date: 2022-06-16T16:29:32-04:00
draft: true
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    #- at-the-edge
    #- cluster-administration
    #- getting-started
    #- machine-learning
    #- moving-to-pulsar
    - newsletter
    #- project-news
    #- pulsar-architecture
    #- pulsar-components
    #- use-cases
tags:
    #- microservices
    #- functions
    #- storage
level: #100, 200, 300
summary: "For this issue, new articles on the Neighborhood site, ApacheCon ‘22, Pulsar in italiano #3, and free Pulsar stickers.  Plus our normal features of a Stack Overflow question and some monthly community stats."
imgUrl: https://miro.medium.com/fit/c/1360/1360/1*KTNrGZT4pvfz5B9_KE2BZg.png
author:
    name: Aaron Williams
    imgUrl:
---

Was this forwarded to you? Click here to get future copies of [Happenings](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood)!

_For this issue, new articles on the Neighborhood site, ApacheCon ‘22, Pulsar in italiano #3, and free Pulsar stickers.  Plus our normal features of a Stack Overflow question and some monthly community stats._

### New Neighborhood Article- How Pulsar and Kafka Partitions Work

We are now publishing new articles on a regular basis and have even started receiving posts from the community.  And this month, we are highlighting an article that has a new twist on the classic Pulsar vs Kafka debate.

_The main differences between Kafka and Pulsar relate to how they deal with resiliency. When dealing with large, time-dependent systems, it’s important to consider their resiliency if part of the system fails. For example, if one of the brokers hosting a partition dies, what happens to the data that’s been written to it? How do we continue consuming new data?_

Check out the full article [here](https://www.pulsar-neighborhood.io/articles/how-pulsar-and-kafka-partitions-work-and-how-they-differ/) and our other articles from the Pulsar Neighborhood on our [website](https://pulsar-neighborhood.io/).

Do you have a Pulsar article that you would like us to publish? Let us know by submitting our [form](https://github.com/pulsar-neighborhood/pulsar-neighborhood.github.io/issues/new/choose).  Already wrote an article that has been published?  Great, we want to help you promote it.  You can use the same form as above and just tell us the abstract and the URL or you can post it in the #blogs-articles channel on the Apache Pulsar Workspace.

If you see a Pulsar article, blog, tutorial, event, etc. out in the wild, let us know and let your friends know too, by liking it and tagging it with #apachePulsar.  Together we can raise the awareness of Apache Pulsar.

### Want a Pulsar Laptop Sticker?

And since we are talking about raising awareness of Apache Pulsar, one of the funniest ways to do this is with laptop stickers.  We purchased 50 stickers and if you fill out the form that is on our [website](https://www.pulsar-neighborhood.io/), we will get one in the mail to you.

### CFPs ApacheCon and Pulsar Summit ‘22

For both, the CFP’s have closed and the reviewers are looking over the great submissions that we have received. For ApacheCon, we received many more great submissions than we could use.  So congratulations to the selected submissions, you should be hearing from the organizers soon.  

Speaking of ApacheCon, if you need financial assistance to attend the event, ASF may be able to help out.  Check out the information [here](https://lists.apache.org/list?dev@pulsar.apache.org:lte=1M:Announce).

### Pulsar in italiano #3

And speaking of events, the Pulsar Neighborhood is co-hosting its third [Pulsar in italiano](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/286425963/)event with the JUG Bologna.  Our guest speaker and Neighbor is Nicolo Boschi from DataStax (and newly appointed Committer for Pulsar).  The event is 22 June at 19:00 in Bologna, 10:00 am Pacific.  It is virtual, so anyone can attend by registering on our NorCal Neighborhood meetup group.  Below is the abstract.

Nella nostra terza puntata della “Serie Pulsar in italiano”; Nicolò Boschi, Committer per i progetti Apache Pulsar e BookKeeper, ci illustrerà come costruire una pipeline di dati in streaming in tempo reale altamente scalabile e performante utilizzando i progetti Apache Cassandra e Pulsar.

English
In our third installment of the “Pulsar in italiano Series”; Nicolò Boschi, Committer for Apache Pulsar & BookKeeper projects will walk us through how to build a highly scalable and performant real-time streaming data pipeline using using the Apache Projects Cassandra and Pulsar.

### New Committer Announced

The PMC announced one new committer in May, [Qiang Zhao](https://github.com/mattisonchao).  He is a developer with StreamNative and made his first contribution to Pulsar in June 2021 and in the following year has made over 150 contributions (fourth overall for that time period).  Very well deserved.

### Upcoming events…

- June 22 -  [Pulsar in italiano](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/286425963/) - Nicolo Boschi from DataStax.
- August 18- [Pulsar Summit](https://pulsar-summit.org/) - CFP ends 20 May
- Oct - [ApacheCon](https://www.apachecon.com/acna2022/)- CFP ends 23 May.

Would you and some colleagues like to set up a [Neighborhood Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood) group or maybe you have someone who you would like to hear speak at a future meetup?  Let us know and we can give you some help.  Visit us at our Neighborhood Meetup page or our slack channel #meetup and ask questions.  

### Great questions from the Apache Pulsar Stack Overflow

As you know, we have a very active [slack](https://pulsar.apache.org/en/contact/) and [Stack Overflow](https://stackoverflow.com/questions/tagged/apache-pulsar?tab=Newest) neighborhoods.  You can ask questions at both locations and get answers quickly.  Slack does have two big weaknesses.  One, it is limited to the number of messages that can be saved at about 10k and we hit the limit about every three months.  Two, it is not searchable by Google.  Thus, when you put the error message that you received into Google, you won’t see that the question has already been answered once or twice on Slack.  So to promote our great Stack Overflow channel, we thought that we would find a good question and include it here in Happenings.  

For this month’s question, we thought we would go for a nice straightforward question, with a nice simple answer.  Yet most probably don’t know the answer.
[Question](https://stackoverflow.com/questions/71709563/in-apache-pulsar-is-it-possible-to-find-out-which-namespace-bundles-are-assigned):  Is there some way via the Admin CLI or other tooling to find out which namespace bundles are assigned to a particular broker?

Do you know the answer?

### Stats of the Month

To start off with, we have passed over 190k slack messages since the beginning of the channel, which is pretty amazing!
For May, we had just over 3.2k conversations (up 28% M/M) from 287 unique people and 82 people made 376 contributions to the code base and/or the documentation.  Of the 82, 26 made their first contribution.  To them, thank you for your contribution and we look forward to your next one!

### Apache Pulsar in the News

Here are some blog posts that we have found from around the web. We think that they are good, but we might not have read them all. Let us know what you have written and we will share it.  Post links on our [blogs-articles](https://apache-pulsar.slack.com/archives/C02CUPZ2KMZ) channel on the Apache Pulsar Slack.

[The Cost Savings of Replacing Kafka with Pulsar](https://research.gigaom.com/report/the-cost-savings-of-replacing-kafka-with-pulsar/)

[The Cost Savings of Replacing Kafka with Pulsar](https://research.gigaom.com/report/the-cost-savings-of-replacing-kafka-with-pulsar/)
[Building a Multipler Game Using Pulsar](https://www.linkedin.com/posts/tbeen_workshop-build-a-multiplayer-real-time-game-activity-6933534327586639872-qB7V?utm_source=linkedin_share&utm_medium=member_desktop_web)

[Using Pulsar at the IoT Edge](https://www.pulsar-neighborhood.io/articles/how-pulsar-can-help-iot-avoid-the-internet-event-streaming-at-the-edge/)

[Single Pulsar Isolation](https://streamnative.io/blog/engineering/2022-05-26-pulsar-isolation-part-4-single-cluster-isolation/)

[What is Apache Pulsar?](https://mindmajix.com/what-is-apache-pulsar)

The Pulsar Neighborhood on Social Media
Follow us on: [twitter](https://twitter.com/pulsar_neighbor), [YouTube](https://www.youtube.com/apachepulsarneighborhood), [Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood), and [website](https://pulsar-neighborhood.io/)
To sign up to receive Happenings click [here](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood).
