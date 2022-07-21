---
title: "Internals of Stream Processing"
date: 2021-12-30T15:36:15-05:00
draft: false
weight: 100
type: video
showtoc: true
categories:  # must be lowercase shishkabob
    - pulsar-architecture
tags:
    - stream-processing-systems
level: 300
summary: Stream Processing Systems (SPSs) are an integral part of modern data-intensive companies. In a world where streams are becoming king, they are commonly employed for much more than data analytics. Yet, most of developers only use them and have never dove deep into the internals of the system.
imgUrl:
author:
    name: Apache Pulsar Neighborhood
    imgUrl:
---

Stream Processing Systems (SPSs) are an integral part of modern data-intensive companies. In a world where streams are becoming king, they are commonly employed for much more than data analytics. Yet, most of developers only use them and have never dove deep into the internals of the system.

This was true for Pedro Silvestre, who with colleagues at TU Delft started to create [Clonos](https://delftdata.github.io/clonos-web/) , a novel local recovery and high availability approach for SPS.

" I knew very little about the internals of SPSs. But now, I needed to modify one quite heavily and that would require a good mental model of their design. I understood what SPSs did from a theoretical standpoint and I had even used them extensively in previous projects, but I had no clue about their internal design. I scoured the internet for resources, and while I was able to piece together a little bit of what was going on, in the end I would need to spend weeks looking through the code of an SPS before feeling confident enough to start designing Clonos."[1]

From this starting point he needed to dig deep into to code to get the understanding needed to finish Clonos. Pedro will walk us through his learnings about SPS and his recommendations for improving them.

Pedro F. Silvestre is a PhD student with the Large-Scale Data & Systems (LSDS) Group at Imperial College London. His research focuses on the interplay between Dataflow Systems and novel Deep Learning Use Cases. Previously he was a Research Engineer at TU Delft's Web Information Systems Group working on Clonos.

[1] [https://www.doc.ic.ac.uk/~pms20/post/stream-processing-thread-model/](https://www.doc.ic.ac.uk/~pms20/post/stream-processing-thread-model/)

{{< youtube id="3suR1CV-zOE" class="youtube" >}}