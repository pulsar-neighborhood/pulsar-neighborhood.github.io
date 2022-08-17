---
title: "Log4Shell Security Update"
date: 2021-12-10T16:10:30-05:00
draft: true
weight: 100
type: article
showtoc: true
categories:  # must be lowercase shishkabob
    - pulsar-architecture
    - project-news
tags:
    #- microservices
    #- functions
    #- storage
level: #100, 200, 300
summary: Within the last 10 hours (current time 10:00 am Pacific, 10 December 21), there has been a severe RCE 0-day exploit found in the Java library log4j that when used, results in a Remote Code Execution (RCE).
imgUrl: https://user-images.githubusercontent.com/1042872/153687998-4532d5b6-252a-430a-a5cc-41cf0d96c873.png
author:
    name: Aaron Williams
    imgUrl:
meta:
    description: A severe RCE 0-day exploit found in the Java library log4j that when used, results in a Remote Code Execution (RCE). Read more to find out about the exploit.
    keywords:
        - Log4Shell Security Update
---

Image Credit: LunaSec

*There is a [blog post](https://pulsar.apache.org/blog/2021/12/11/Log4j-CVE/) on the Apache Pulsar website that has the latest instructions *

Within the last 10 hours (current time 10:00 am Pacific, 10 December 21), there has been a severe RCE 0-day exploit found in the Java library log4j that when used, results in a Remote Code Execution (RCE). This has been given the name [CVE-2021–44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228) (LunaSec has begun calling it Log4Shell). A detailed write up for the issue can be found on the [LunaSec site](https://www.lunasec.io/docs/blog/log4j-zero-day/).
This affects all Log4J releases (2.0<= Apache log4j <= 2.14.1) and therefore affects all Apache Pulsar versions, since we use an affected Log4J version.

That is the bad news, the good news is that since the Apache Pulsar Neighborhood is made up of residents from around the world, a work-around was quickly created and soon after that, a fix. The fix will be in all future updates (2.7.4, 2.8.2, and 2.9.1). In the meantime, Pulsar Neighbor and Apache Pulsar Committer Lari Hotari has posted [instructions](https://lists.apache.org/thread/pf8wfzt09c2dv4z291httlgdwtc1495c) (and a [second](https://lists.apache.org/thread/pf8wfzt09c2dv4z291httlgdwtc1495c) about Helm and Docker) on the [dev@pulsar.apache.org](mailto:dev@pulsar.apache.org) mailing list to mitigate this problem. We have copied parts of the email below, but recommend that you follow the link to his post (and to subscribe to dev@ mailing list) to see if there are any other updates.

We have not heard of any exploits affecting Apache Pulsar, but we highly recommend that you follow the instructions above and update your systems and then install the latest versions of Apache Pulsar once they are released.

By the way, a little side note on how fast all of this was completed. At time=0 (about 10 pm EST) Log4j released 2.15 and announced the vulnerability. Neighbor and Apache Pulsar Committer ZhangJian He had created a [PR](https://github.com/apache/pulsar/pull/13226#issuecomment-990643946)for the latest version about 2 hours later. It was soon reviewed and suggestions made from other Neighbors in Japan, China, Finland, Italy, and the US. By t=+7 hours, workarounds were created and the email was released. About this time the vulnerability was given its [number](https://nvd.nist.gov/vuln/detail/CVE-2021-44228).

To everyone who helped with this and for doing it so quickly, on behalf of all your Neighbors, a big THANK YOU for your hard work!

For everyone running Apache Pulsar, please update your systems. And if you find a security issue, please let us know by [email](https://lists.apache.org/thread/pf8wfzt09c2dv4z291httlgdwtc1495c)ing private{a}pulsar.apache.org or security{a}apache.org.

From the [email](https://lists.apache.org/thread/pf8wfzt09c2dv4z291httlgdwtc1495c):

_This [..] affects all Pulsar versions after 2.0.0-incubating since a
vulnerable Log4J version is used. I'm not aware of a confirmed exploit for
Pulsar. The fix to Pulsar is to upgrade to Log4J 2.15.0 . The PR is
https://github.com/apache/pulsar/pull/13226 . The fix will be release as
part of Pulsar 2.8.2 , 2.7.4 and 2.9.1 . Before the fixed version is
available, there's an immediate workaround to mitigate the security issue.
I'd like to share mitigation instructions for this severe vulnerability:_

_- Add -Dlog4j2.formatMsgNoLookups=true system property to the JVM arguments
of all Pulsar processes. There are multiple ways to achieve this in Pulsar.
It can be added to either OPTS, PULSAR_GC or PULSAR_MEM environment
variables._

_- Upgrade to Pulsar 2.8.2 , 2.7.4 or 2.9.1 once they are available.
There's a PR to handle the adding of -Dlog4j2.formatMsgNoLookups=true
system property in the Apache Pulsar Helm chart, that is
https://github.com/apache/pulsar-helm-chart/pull/186 . Until that is
available, the recommended approach is to add
"-Dlog4j2.formatMsgNoLookups=true" to OPTS, PULSAR_GC or PULSAR_MEM
manually and ensure that the Java process picks up the system property.
It's also necessary to check that the property doesn't have typos. The
setting is case sensitive._