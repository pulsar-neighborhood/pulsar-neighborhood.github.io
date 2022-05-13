---
title: "Happenings in the Pulsar Neighborhood May. ‘22"
date: 2022-05-13T14:34:24-04:00
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
summary: In this issue, ApacheCon ‘22, new Neighborhood article, Pulsar in italiano No. 2, and four new committers.  Plus our normal features of a Stack Overflow question and some monthly community stats.
imgUrl: https://miro.medium.com/fit/c/1360/1360/1*KTNrGZT4pvfz5B9_KE2BZg.png
author:
    name: Aaron Williams
    imgUrl: 
---

Was this forwarded to you? Click here to get future copies of [Happenings](https://lp.constantcontactpages.com/su/8nAlVKo/APNeighborhood)!

In this issue, ApacheCon ‘22, new Neighborhood article, Pulsar in italiano No. 2, and four new committers.  Plus our normal features of a Stack Overflow question and some monthly community stats.

### CFP ApacheCon ‘22

ApacheCon North America dates and location have been announced.  The event is October 3-6 in New Orleans.  The [Call for Presentations](https://www.apachecon.com/acna2022/cfp.html) is open and runs until 23 May.  We have a two day Pulsar track, thus we can have a lot of Pulsar content.  Also, there are a lot of other tracks that Pulsar fits into perfectly, so submit a second presentation for those tracks.  Remember, it is easier to get your manager/company to pay if you are speaking twice!

### CFP Pulsar Summit SF ‘22

The [Pulsar Summit](https://sessionize.com/pulsar-summit-san-francisco-2022/) is happening and will be on 18 August in SF.  The call for speakers closes soon on 20 May.  Since you are already planning on submitting your proposal for Apache Con, you can also submit it for the Pulsar Summit.  So come and join us for a full day of Pulsar and meet other Pulsar Neighbors!

### Pulsar in italiano No. 2

And speaking of events, the Pulsar Neighborhood is co-hosting its second [Pulsar in italiano](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/285371814/) event with the JUG Bologna.  Our guest speaker and Neighbor is Hamado Dene from Magnews.  The event is 11 May at 19:00 in Bologna, 10:00 am Pacific.  It is virtual, so anyone can attend by registering on our NorCal Neighborhood meetup group. After the event, it will be posted on our [YouTube channel](https://www.youtube.com/apachepulsarneighborhood).  Below is the abstract.

_Stiamo ospitando il nostro secondo Pulsar in Italian event Dato che le aziende stanno adottando tecnologie moderne di Event Streaming come Apache Pulsar, è bene imparare dalle loro esperienze. Hamado Dene, Platform Engineer presso magnews (magnews.com) e emailsuccess.com, ci mostrerà come gestiscono l'elaborazione delle statistiche e il CDC (Change Data Capture) nel loro ambiente multi-tenant utilizzando Apache Pulsar._  

### Schema vs. Schemaless- The Next Neighborhood Article

We have published our next article talking about the inner workings of Apache Pulsar.  It is titled [Apache Pulsar Schema vs. Schemaless- Who’s the winner?](https://pulsar-neighborhood.github.io/articles/apache-pulsar-schema-versus-schemaless-whos-the-winner/) and you can check it out with our other articles from the Pulsar Neighborhood on the Neighborhood's [website](https://pulsar-neighborhood.com/).

_[...]Initially, data streaming did not use a schema; raw bytes were efficient and neutral vehicles. However, developers had to overlay their serialization mechanisms to ensure that processes on the receiving end were able to read and interpret the bytes fed into the system. This situation required creating an extra layer to monitor bytes flowing through the system_

_Another challenge that raw bytes presented was the pipeline’s inability to cope with changes in data structures. If a developer slightly changes a field, the entire system starts throwing errors because the end systems’ binaries store all information related to structures._

So please check it out and let us know what you think.  We will be releasing three articles a month, but we also want your content.  Do you have a Pulsar article that you would like us to publish? Let us know by submitting our [form](url).  Already wrote an article that has been published?  Great, we want to help you promote it.  You can use the same form as above and just tell us the abstract and the URL or you can post it in the #blogs-articles channel on the Apache Pulsar Workspace.

If you see a Pulsar article, blog, tutorial, event, etc. out in the wild, let us know and let your friends know too, by liking it and tagging it with #apachePulsar.  Together we can raise the awareness of Apache Pulsar.

### New Website Released

The new site is scheduled to be release on 11 May, so go and check it out.  ([pulsar.apache.org](https://pulsar.apache.org/))

### New Committers Announced

The PMC announced four new committers in April: Nicolo Boschi, Zike Yang, Ruguo Yu, and Zhangmin Gao.

[Nicolo Boschi](https://github.com/nicoloboschi) is a senior developer with DataStax and a committer on the BookKeeper Project. He made his first contribution in August of last year and has made over 90 contributions during that time.

[Zike Yang](https://github.com/RobertIndie) is a developer with StreamNative and made his first contribution in July 2020.  He has made 50 contributions to the code base during that time.

[Ruguo Yu](https://github.com/yuruguo) is a developer with Baidu and made his first contribution in August 2021.  He has made 75 contributions to Pulsar since his first contribution.  

[Zhangmin Gao](https://github.com/gaozhangmin)  is a developer with Didi Global and he made his first contribution in June 2021.  He has made 78 contributions in the last 11 months.  

### Upcoming events…

May 11 - [Pulsar in italiano](https://www.meetup.com/nor-cal-apache-pulsar-meetup-group/events/285371814/) - Hamado Dene of Magnews.
August 18- [Pulsar Summit](https://pulsar-summit.org/)- CFP ends 20 May
Oct - [ApacheCon](https://www.apachecon.com/acna2022/)- CFP ends 23 May.

Would you and some colleagues like to set up a[Neighborhood Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood) group or maybe you have someone who you would like to hear speak at a future meetup?  Let us know and we can give you some help.  Visit us at our Neighborhood Meetup page or our slack channel #meetup and ask questions.  

### Great questions from the Apache Pulsar Stack Overflow

As you know, we have a very active [slack](https://pulsar.apache.org/en/contact/) and [Stack Overflow](https://stackoverflow.com/questions/tagged/apache-pulsar?tab=Newest )neighborhoods.  You can ask questions at both locations and get answers quickly.  Slack does have two big weaknesses.  One, it is limited to the number of messages that can be saved at about 10k and we hit the limit about every three months.  Two, it is not searchable by Google.  Thus, when you put the error message that you received into Google, you won’t see that the question has already been answered once or twice on Slack.  So to promote our great Stack Overflow channel, we thought that we would find a good question and include it here in Happenings.  

[Question](https://stackoverflow.com/questions/71327604/how-to-consume-only-the-latest-message-published-from-the-topic-and-ignore-all-p): How to consume only the latest message published from the topic and ignore all previously published message in Pulsar?

_Lets say i have a publisher app and it runs and publishes 20 messages and then goes down and then i have a subscriber app which can use either a consumer or reader but it starts after the publisher is done, i need it to read only the latest message published by publisher before i thought this code should do it but somehow it is not working, any clues folks?_

The question has been viewed just under 100 times and has one answer.  Do you know the answer?  Do you agree with the answer? Can you improve it?

### Stats of the Month

For April, we had just over 2.6k conversations from 277 unique people and 82 people made 348 contributions to the code base and/or the documentation.  Of the 84, 15 made their first contribution.  To them, thank you for your contribution and we look forward to your next one!.

### Apache Pulsar in the News

Here are some blog posts that we have found from around the web. We think that they are good, but we might not have read them all. Let us know what you have written and we will share it.  Post links on our [blogs-articles](https://apache-pulsar.slack.com/archives/C02CUPZ2KMZ) channel on the Apache Pulsar Slack.  Or to see more, plus presentations, go [here](https://pulsar.apache.org/en/resources/).

[The Cost Savings of Replacing Kafka with Pulsar](https://research.gigaom.com/report/the-cost-savings-of-replacing-kafka-with-pulsar/)
[Apache Pulsar: Desenvolvendo ETL em Tempo-Real](https://www.linkedin.com/video/event/urn:li:ugcPost:6922947570239434752/?isInternal=true) (in Portuguese)  
[Fluentd Pulsar Plugin](https://www.linkedin.com/video/event/urn:li:ugcPost:6922947570239434752/?isInternal=true)
[Integrating Apache Druid with Apache Pulsar](https://blog.hellmar-becker.de/2022/04/25/integrating-apache-druid-with-apache-pulsar/)

The Pulsar Neighborhood on Social Media
Follow us on: [twitter](https://twitter.com/pulsar_neighbor), [YouTube](https://www.youtube.com/apachepulsarneighborhood), [Meetup](https://www.meetup.com/pro/apache-pulsar-neighborhood), and [website](https://pulsar-neighborhood.com/)

To sign up to receive Happenings click [here](https://pulsar.apache.org/en/resources/).
