---
title: "Happenings in the Pulsar Neighborhood April '22"
date: 2022-04-07T09:12:18-04:00
draft: true
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
summary: For this issue, ApacheCon ‘21, new Neighborhood article, a new committer, and our first in person event.  Plus our normal features of a Stack Overflow question and some monthly community stats.
imgUrl: https://miro.medium.com/fit/c/1360/1360/1*KTNrGZT4pvfz5B9_KE2BZg.png
author:
    name: Aaron Williams
    imgUrl:
---

Was this forwarded to you? Click here to get future copies of [Happenings](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood)!

For this issue, ApacheCon ‘22, new Neighborhood article, a new committer, and our first in person event.  Plus our normal features of a Stack Overflow question and some monthly community stats.

### **ApacheCon ‘22**

ApacheCon North America dates and location have been announced, October 3-6 in New Orleans.  The [Call for Papers](https://www.apachecon.com/acna2022/) has opened and there is an Apache Pulsar track!  Other tracks include Big Data, Search, IoT, Cloud, Fintech, and Tomcat.  And we bet that our neighbors can come up with a talk that would fit in each of these categories, so please submit your talks and lets have Pulsar take over Apache Con!  

Also, we want to take a moment to thank David Fisher, PMC member (and former mentor to Pulsar when it was in incubation) for proposing and captaining the CFP process for the Pulsar track.

### **New Neighborhood Article**

We have published our first article under the Pulsar Neighborhood byline.  It is titled [Understanding the Differences Between Message Queues and Streaming](https://pulsar-neighborhood.github.io/articles/understanding-the-differences-between-message-queues-and-streaming/).

“While message queues and streaming apply to similar use cases and use similar technologies, on a technical level they’re entirely different. We’ll compare them here and examine the pros and cons of each solution, touching on message brokers, publisher-subscriber (pub/sub) architecture, and event-driven scenarios.”

So please check it out and let us know what you think.  We will be releasing three articles a month, but we also want your content.  Do you have a Pulsar article that you would like us to publish? Let us know by submitting our [form](https://github.com/pulsar-neighborhood/pulsar-neighborhood.github.io/issues/new/choose).  Already wrote an article that has been published?  Great, we want to help you promote it.  Why do we want to promote it?  Because that is what Neighbors do, they work together to improve their Neighborhood.  So you can use the same form as above and just tell us the abstract and the URL or you can post it in the #blogs-articles channel on the Apache Pulsar Workspace.

If you have a suggestion on what we should write next, let us know via the form above.  And if you see a Pulsar article, blog, tutorial, event, etc. let us know and let your friends know too, by liking it and tagging it with #apachePulsar.  Together we can raise the awareness of Apache Pulsar.

### **New Committer Announced**

The PMC announced that [Andrey Yegorov](https://github.com/dlg99) of DataStax was named as new a committer.  Andrey made his first contribution to Pulsar in Feb 2021.  He has done great work for Pulsar including Connector and Adaptor work plus updating dependencies for CVE’s.  Andrey, thank you so much for what you have done and we look forward to your next contributions to the Neighborhood.

### **In Person Meetup**

Coming up very quickly is our first in person event.  On 8 April, we will be hosting our first in person event at The Hacker Building in Amsterdam, Netherlands.  Neighbors and Memgraph’s developer relations engineers Ivan Despot and Katarina Supe will be talking about how Pulsar connects Memgraph and the backend server.  

The second talk will be by Neighbor Christophe Bornet, Sr. Software Engineer from DataStax.  He will be doing a deep dive into the Pulsar Binary Protocol.  This part will be virtual, so everyone can join.  But beer will only be served at the in person event.  Christophe’s talk will begin about 8 pm and you can get all of the information on the [NL Pulsar Meetup](https://www.meetup.com/netherlands-apache-pulsar-meetup/events/284660180/) group’s site.

### **New Website Survey**

We have mentioned this a couple of times (we are just really excited about it), a group of our neighbors has been working hard to improve the Apache Pulsar home page.  The complete redesign of the site is in Beta and they would like you to fill out a [survey](https://forms.office.com/r/QK6FYdQ158) giving them feedback about the [new site](https://pulsar-next.staged.apache.org/).  So check out the new site and take a moment to help them make it even better.

### **Upcoming events…**

April 8 - [NL Pulsar Meetup Group](https://www.meetup.com/netherlands-apache-pulsar-meetup/events/284660180/) (see above)

Oct - [ApacheCon](https://www.apachecon.com/acna2022/)- CFP is out now.

Would you and some colleagues like to set up a [Neighborhood Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood) group or maybe you have someone who you would like to hear speak at a future meetup?  Let us know and we can give you some help.  Visit us at our Neighborhood Meetup page or our slack channel #meetup and ask questions.

### **Great questions from the Apache Pulsar Stack Overflow**

As you know, we have a very active [slack](https://pulsar.apache.org/en/contact/) and [Stack Overflow](https://stackoverflow.com/questions/tagged/apache-pulsar?tab=Newest) neighborhoods.  You can ask questions at both locations and get answers quickly.  Slack does have two big weaknesses.  One, it is limited to the number of messages that can be saved at about 10k and we hit the limit about every three months.  Two, it is not searchable by Google.  Thus, when you put the error message that you received into Google, you won’t see that the question has already been answered once or twice on Slack.  So to promote our great Stack Overflow channel, we thought that we would find a good question and include it here in Happenings.  

[Question](https://stackoverflow.com/questions/70872157/non-persistent-message-is-lost-when-throughput-is-high): non-persistent message is lost when throughput is high?

I found that non-persistent messages are lost sometimes even though the my pulsar client is up and running. Those non-persistent messages are lost when the throughput is high (more than 1000 messages within a very short period of time. I personally think that this is not high). If I increase the parameter receiverQueueSize or change the message type to persistent message, the problem is gone.
The question has been viewed well over a 100 times and has an accepted answer.  Do you know the answer?  Do you agree with the answer? Can you improve it?

### **Stats of the Month**

For March, we had just over 3k conversations from 290 unique people and 84 people made 389 contributions to the code base and/or the documentation.  Of the 84, 24 made their first contribution.  To them, thank you for your contribution and we look forward to your next one!.

### **Apache Pulsar in the News**

Here are some blog posts that we have found from around the web. We think that they are good, but we might not have read them all. Let us know what you have written and we will share it. Post links on our [blogs-articles](https://apache-pulsar.slack.com/archives/C02CUPZ2KMZ) channel on the Apache Pulsar Slack.  Or to see more, plus presentations, go [here](https://pulsar.apache.org/en/resources/).

[Pulsar or Kafka? And the lessons from doing our own testing](https://www.linkedin.com/posts/owentl_pulsar-or-kafka-and-the-lessons-from-doing-acti[%E2%80%A6]ssbB?utm_source=linkedin_share&utm_medium=member_desktop_web)

[Apache Pulsar Client Application Best Practices](https://www.linkedin.com/posts/polyzos_apache-pulsar-client-application-best-practices-activity-6907936077219524608-WV0E/)

[The Path to Getting the Full Data Stack on Kubernetes](https://www.linkedin.com/posts/datastaxdevs_the-path-to-getting-the-full-data-stack-o[%E2%80%A6]r96k?utm_source=linkedin_share&utm_medium=member_desktop_web)

[Building Asynchronous Microservices with ZIO](https://www.linkedin.com/posts/ziverge_building-asynchronous-microservices-with-activ[%E2%80%A6]u4hx?utm_source=linkedin_share&utm_medium=member_desktop_web)

### **The Pulsar Neighborhood on Social Media**

Follow us on: [twitter](https://twitter.com/pulsar_neighbor), [YouTube](https://www.youtube.com/apachepulsarneighborhood), [Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood), and [website](https://pulsar-neighborhood.com/)

To sign up to receive Happenings click [here](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood).
