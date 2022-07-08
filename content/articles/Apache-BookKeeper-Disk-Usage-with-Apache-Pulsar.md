---
title: "Apache BookKeeper Disk Usage With Apache Pulsar"
date: 2022-07-08T16:21:04-04:00
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
    #- pulsar-architecture
    - pulsar-components
    #- use-cases
tags:
    #- microservices
    #- functions
    - storage
level: 300
summary:
imgUrl: https://user-images.githubusercontent.com/16946028/178064536-f4473866-cb4b-4154-a4a3-ba02d381fef3.png
author:
    name: Andrey Yegorov
    imgUrl: https://user-images.githubusercontent.com/16946028/178064306-85871c22-18fd-4144-8dba-07f090b94461.png
---

Theoretical attempts to size up disk space for the Apache BookKeeper cluster backing Apache Pulsar occasionally raises questions of why the BookKeeper uses more space in practice than anticipated. Understanding the factors involved in the disk utilization and possible configuration options is important for more precise capacity planning.

Let’s look at the specific factors affecting disk usage.

## Pulsar side

Pulsar uses BookKeeper to persist data to the disk. BookKeeper does not delete the data unless Pulsar “tells” that it is safe to delete. BookKeeper’s minimal unit of deletion is ledger. Pulsar has to wait until all the messages in the given ledger can be deleted before deleting it.

BookKeeper does not delete the ledger from the disk immediately, and we’ll discuss reasons for this a little bit later. Nevertheless, for all practical reasons, the data becomes unavailable but the disk space is released with the delay.

Pulsar’s topic is a sequence of ledgers (also referred to as a [Managed Ledger](https://pulsar.apache.org/docs/en/concepts-architecture-overview/#managed-ledgers)):

```log
Topic = [ledger 1, ledger2, ledger 3, ...]
```

The ledger is a sequence of entries (think Pulsar messages, for simplicity).

When all the messages from ledger 1 reach the state where they can be safely deleted, Pulsar will delete ledger 1. After the deletion of one ledger, the topic will look like

```log
Topic = [ledger2, ledger 3, ...]
```

and the ledger 1 is deleted in BookKeeper.

Pulsar decides that the ledger is safe to delete (“trim the topic”) when all subscribers processed all messages within the ledger and message retention policy reached.

Possible contributing factors for the delays are:

* The ledger compaction process (for [compactable topics](https://pulsar.apache.org/docs/en/concepts-topic-compaction/))
* [Message retention & expiry](https://pulsar.apache.org/docs/en/concepts-messaging/#message-retention-and-expiry) and related [settings](https://pulsar.apache.org/docs/en/cookbooks-retention-expiry/) affect the delay in topic trimming:
  * the time/size expiration policies, message TTL, and the speed of consumption on existing subscriptions
  * [Ledger rollover configuration](https://pulsar.apache.org/docs/en/reference-configuration/#broker) (size/time/number of entries based policy to start new ledger in BookKeeper)
* [Tiered Storage](https://pulsar.apache.org/docs/en/tiered-storage-overview/)’s data offloading, if it is being used
* Delays in consumer reads

BookKeeper also used to store data other than the messages in user-defined persistent topics:

* [State Store](https://pulsar.apache.org/docs/en/window-functions-context/#state-storage ) uses BookKeeper to persist data
* Pulsar uses internal (system) topics to store some data

## BookKeeper side

Two major factors affect disk usage on the BookKeeper side:

* Size amplification. Size amplification is a result of extra internal data that BookKeeper needs to store in order to guarantee data safety and reliability, and it is a permanent addition to the user data.
* Delayed deletion a.k.a garbage collection. Garbage collection is used to reclaim space while reducing the performance impact and maintaining the data safety. It temporarily increases disk usage in order to free up space later.

### Size amplification

Size amplification happens at multiple levels:

* Data level
  * BookKeeper adds checksum and some [metadata](https://bookkeeper.apache.org/docs/getting-started/concepts/#entries) to every entry it stores. This is not a lot of data but it is a constant size which may become a larger percentage of space used e.g. for small entries
* [Bookie](https://bookkeeper.apache.org/docs/getting-started/concepts/) level
  * Journal. Each bookie writes data twice (journal and, later, entry log) and keeps a few older journal files.
  * Indexes. Bookie needs to keep an index for each ledger to locate entries. Indexes don’t take a lot of space but need to be considered. The index can be stored as flat files or in the embedded RocksDB. In the case of Pulsar, the [ledgerStorageClass](https://bookkeeper.apache.org/docs/reference/config/) is configured to use DbLedgerStorage by default; DbLedgerStorage is backed by RocksDB. RocksDB uses garbage collection/compaction internally so it can use some extra space until compaction completes.
  * Disk usage threshold [configuration](https://bookkeeper.apache.org/docs/reference/config/). In order for the Garbage Collection to work even when the disk is “full”, the bookie reserves some free space and switches to read-only mode when diskUsageThreshold is reached.
  * File system nuances. Various file systems may incur additional overhead, e.g. XFS speculative preallocation. Typically this is not a problem for BookKeeper but can become a challenge if entry log per ledger is enabled and the bookie has many large files open for writing.
* Cluster-wide amplification:
  * Replication is used to ensure data reliability in case of bookie node failure.It means that each entry will be written [Write Quorum] times across the cluster.
  * Temporary over-replication is possible. It can happen as a result of a bookie node failure, data autorecovery, and later recovery of the failed node. [Autorecovery settings and garbage collector delays](https://bookkeeper.apache.org/docs/reference/config/) are contributing factors to the delay in over-replication correction.

### Garbage Collection

Data in BookKeeper is stored in so-called “entry logs” where data from multiple ledgers is interleaved. The entry log is immutable which means that once written it is never modified. It also means that the minimal unit of deletion from the disk is the whole entry log. In order to delete the entry log, BookKeeper needs to rewrite data from surviving ledgers into a new entry log first. To reduce performance impact of this process, the garbage collection runs with delays and only on entry logs with deleted data above specific thresholds.

Details of this process can be found in BookKeeper [documentation](https://bookkeeper.apache.org/docs/getting-started/concepts#data-compaction).

BookKeeper allows using an entry log per ledger which can be enabled by entryLogPerLedgerEnabled configuration parameter. It greatly improves time to release space after the ledger deletion as it eliminates need in rewriting data. It may result in other problems, such as slow writes, file system not handling too many files, etc. These side effects depend on the number of ledgers in the system, typical size of the ledgers, etc. and should be considered before using it in production.

## Conclusion

Disk space usage is affected by multiple factors beyond simple (estimated data size * number of replicas) formula. Many parameters contribute to the disk space utilization and their effect should be considered during capacity planning and for tuning of Pulsar and BookKeeper.
