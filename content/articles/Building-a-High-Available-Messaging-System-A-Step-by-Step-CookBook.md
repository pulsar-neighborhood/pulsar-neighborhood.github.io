---
title: "Pulsar: Building a High Available Messaging System - A Step by Step CookBook"
date: 2022-03-22T11:36:23-04:00
draft: false
weight: 100
type: article
showtoc: true
categories:
    - getting-started
tags:
    - high-availability
level: 200
summary: This guide will walk you step by step to deploy a Pulsar instance with one cluster but prepared already to extend the deployment further, including more Pulsar clusters at a later stage.
imgUrl:
author:
    name: Ivan Garcia
    imgUrl:
---

### A step by step cookbook

---
#### :pencil2: Ivan Garcia / :calendar: Feb 2022 / :clock2: 20 min read
#### https://github.com/IvanGDR/Pulsar-Building-A-High-Available-Messaging-System
---

>This second part of this blog series over apache Pulsar, is all about building the stack. The intention is to provide a cookbook guide for you to do it.
It is important to highlight that I am trying to provide a deployment that can offer high availability properties hence the use of a zookeeper ensemble. According to documentation, it may be acceptable to use just one Zookeeper node as the workload pushed from Pulsar and BookKeeper is not expected to be a real constraint but a single point of failure is expected to be assumed in this way.

## Context
From an architectural point of view, the aim is to build a Pulsar instance with multi cluster properties and functions worker enabled within brokers.

This guide will walk you step by step to deploy a Pulsar instance with one cluster but prepared already to extend the deployment further, including more Pulsar clusters at a later stage.
Additionally all the stack will be built up separately, Zookeeper, BookKeeper and Pulsar all will be deployed and installed on their own cluster/ensemble and configured accordingly so they can interact with each other.

The procedure followed here is for a multi cluster baremetal deployment.

## Resources

The open source software to be used are the following binaries:

    - apache-pulsar-2.8.1-bin.tar.gz
    - bookkeeper-server-4.11.1-bin.tar.gz
    - apache-zookeeper-3.5.8-bin.tar.gz

In terms of hardware:

    - Zookeeper ensemble (3 nodes)
    - BookKeeper cluster (3 bookies)
    - Pulsar cluster (3 brokers)

## Guide Summary

```
- Deploying Binaries on Each Node
  - Creating directories
  - Changing directory ownership
  - Moving tar binary (scp)
  - Untar Binary
  - Remove tar binary
- Zookeeper Configuration
  - Cluster Info
  - Setting up Local Zookeeper for Pulsar
    - Cluster Info
    - Configuring Local Zookeeper
    - Setting up zoo.cfg file for Local Zookeeper
    - Start/Stop Local Zookeeper
    - Launch Client Zookeeper for Local Zookeeper
    - Creating Znode for Local Zookeeper Metadata
  - Setting up Global Zookeeper for Pulsar (store)
    - Cluster Info
    - Configuring Global Zookeeper
    - Setting up zoo_pulsar_global.cfg file for Global Zookeeper
      - Instructions to add new Pulsar cluster Zookeeper Configuration
    - Start/Stop Global Zookeeper
    - Launch Client Zookeeper for Global Zookeeper
    - Creating Znode for Global Zookeeper Metadata
- Bookkeeper Configuration
  - Cluster Info
  - Creating a Znode for BookKeeper metadata in Zookeeper Local
  - Setting up bk_server.conf file for BookKeeper
  - Sending BookKeeper metadata to Zookeeper Local
  - Start BookKeeper
- Pulsar Configuration
  - Cluster Info
  - Setting up bk_server.conf file for Pulsar (brokers)
    - Enabling Functions within Brokers
  - Sending Pulsar metadata to Zookeeper (Local and Global) and Registering BookKeeper
  - Start Pulsar Broker
  - Confirming Brokers available
- Conclusion
```

## 1) Deploying Binaries On Each Node

Do the following if you can ssh to your remote machines. Install the binaries accordingly within your ensemble/clusters, **3 times for Zookeeper, 3 times for BookKeeper and 3 times for Pulsar**.

### Creating directories

```
igdr@<ip-hostname>:/opt$ sudo mkdir <directory_name>
```

do this for each of your nodes, where your \<ip-hostname> is your hostname and \<directory_name> is either zookeeper, bookkeeper, pulsar

### Changing directory ownership

```
igdr@<ip-hostname>:/opt$ sudo chown -R igdr:igdr <directory_name>
```

### Copying tar binary to destination nodes (scp)

Instead downloading the binaries individually on each remote machine, using e.g. "wget" command, I downloaded once the bin.tar.gz files on my local machine and sent the files using scp command to the remote machines.

```
/Downloads/Project_Pulsar: scp -i /path_to/ssh_key \
file-name.bin.tar.gz igdr@<ip-hostname>:/opt/<directory_name>/
```

Here <directory_name> is the directory created initially.

### Untar binary

```js
igdr@<ip-hostname>:/opt/<directory_name>$ tar xvzf file-name.bin.tar.gz
```

### Remove tar binary

```js
igdr@<ip-hostname>:/opt/<directory_name>$ rm file-name.bin.tar.gz
```

## 2) Zookeeper Configuration

### Cluster Info (Local and Global)

```
Nodes:
Node 0: public hostname: 101.36.207
Node 1: public hostname: 101.36.165
Node 2: public hostname: 101.36.179
```

## 2.A) Setting up Local Zookeeper for Pulsar

### Configuring Local Zookeeper

`
Creating myid file within datadir=/opt/zookeeper/data
`

```
Notes for configuration of "myid" files within each Zookeeper node (Local)

Node 0: 101.36.207 -> insert 1
Node 1: 101.36.165 -> insert 2
Node 2: 101.36.179 -> insert 3

echo "1" > /opt/zookeeper/data/myid
echo "2" > /opt/zookeeper/data/myid
echo "3" > /opt/zookeeper/data/myid
```

### Setting up zoo.cfg files for Local Zookeeper

Main variables, according to pulsar documentation:

```js
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/opt/zookeeper/data
clientPort=2181
admin.enableServer=true
admin.serverPort=9990
#maxClientCnxns=60
autopurge.snapRetainCount=3
autopurge.purgeInterval=1
forceSync=yes
sslQuorum=false
portUnification=false
metricsProvider.className=
org.apache.zookeeper.metrics.prometheus.PrometheusMetricsProvider
metricsProvider.httpPort=8000
metricsProvider.exportJvmInfo=true
server.1=101.36.207:2888:3888
server.2=101.36.165:2888:3888
server.3=101.36.179:2888:3888
```

Same file content for each of the Zookeeper nodes.

### Start/Stop Local Zookeeper

**Start local Zookeeper**
Do this for each node, this example corresponds to Zk server.1 only

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkServer.sh \
start /opt/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo.cfg
```

**Stop local Zookeeper**
Do this for each node, this example corresponds to Zk server.1 only

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkServer.sh \
stop /opt/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo.cfg 
```

### Launch Client Zookeper for Local Zookeeper

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkCli.sh -server 101.36.207:2181
```

### Creating Znode for Local Zookeeper Metadata

Creating the Znode from one Zk client is enough

```js
[zk: 101.36.207:2181(CONNECTED) 0] create /PulsarZkLocal
Created /PulsarZkLocal
```

Verifying Znode has been created as expected:

```js
[zk: 101.36.207:2181(CONNECTED) 1] ls /
[PulsarZkLocal, zookeeper]
```

## 2.B) Setting up Global Zookeeper for Pulsar (store)

### Configuring Global Zookeeper

`
Creating myid file within datadir=/opt/zookeeper/data_global
`

```
Notes for configuration of "myid" files within each Zookeeper node (Global)

Node 0: 101.36.207 -> insert 1
Node 1: 101.36.165 -> insert 2
Node 2: 101.36.179 -> insert 3

echo "1" > /opt/zookeeper/data_global/myid
echo "2" > /opt/zookeeper/data_global/myid
echo "3" > /opt/zookeeper/data_global/myid
```

### Setting up zoo_pulsar_global.cfg file for Global Zookeeper

Main variables, according to Pulsar documentation:

```js
tickTime=2000
initLimit=10
syncLimit=5
dataDir=/opt/zookeeper/data_global
clientPort=2184
admin.enableServer=true
admin.serverPort=9991
#maxClientCnxns=60
autopurge.snapRetainCount=3
autopurge.purgeInterval=1
server.1=101.36.207:2889:3889
server.2=101.36.165:2889:3889
server.3=101.36.179:2889:3889
```

>Note 1: It is important to note that a separate zookeeper ensemble for a Global Pulsar Store will require the same numbers of local pulsar zookeeper ensemble machines per cluster, it will make it not cost effective, considering the workload for the global store is very reduced.

>Note 2: If another cluster is added to the pulsar instance, within this file the new zk nodes IP’s will need to be added and additionally we may use  the :observer option. E.g. adding 2 more clusters of 3 nodes ensemble each and making a 7 nodes ensemble using the observer option to avoid election we can tolerate up to 3 nodes down or an entire region to be down  (2 x 3 Nodes Down+1=7). The modified file would look like this:

```
Instructions to add new Pulsar cluster Zookeeper Configuration (modified: zoo_pulsar_global.cfg file)

peerType=observer
server.1=101.36.207:2889:3889
server.2=101.36.165:2889:3889
server.3=101.36.179:2889:3889

server.4=zk-4IP-Region2:2889:3889
server.5=zk-5IP-Region2:2889:3889
server.6=zk-6IP-Region2:2889:3889:observer

server.7=zk-7IP-Region3:2889:3889
server.8=zk-8IP-Region3:2889:3889
server.9=zk-9IP-Region3:22889:3889:observer 
```

When adding two new clusters for example as shown above, the new configuration file will have to be the same on all ZK nodes. where myid files for the new two local ZK (2181) will contain 1,2,3 and 1,2,3 also for the global ZK (2184) will be 4,5,6 and 7,8,9 following the example above.

### Start/Stop Global Zookeeper

**Start global Zookeeper**

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkServer.sh \
start /opt/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo_pulsar_global.cfg
```

**Stop global Zookeeper**

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkServer.sh \
stop /opt/zookeeper/apache-zookeeper-3.5.8-bin/conf/zoo_pulsar_global.cfg
```

### Launch Client Zookeper for Global Zookeeper

```js
igdr@ip-101-36-207:/opt/zookeeper/apache-zookeeper-3.5.8-bin$
./bin/zkCli.sh -server 101.36.207:2184
```

### Creating Znode for Global Zookeeper Metadata

Creating the Znode fron one Zk client is enough

```js
[zk: 101.36.207:2184(CONNECTED) 1] create /PulsarZkGlobal
Created /PulsarZkGlobal
```

Verifying Znode for Global Pulsar metadata has been created:

```js
[zk: 101.36.207:2184(CONNECTED) 2] ls /
[PulsarZkGlobal, zookeeper]
```

## 3) Bookkeeper Configuration

### Cluster Info

```
Nodes:
Node 0: public hostname: 101.33.97
Node 1: public hostname: 101.35.236
Node 2: public hostname: 101.32.196
```

### Creating a Znode for BookKeeper metadata in Zookeeper Local

After connecting with the ZK client to the local ZK ensemble:

```js
[zk: 101.36.207:2181(CONNECTED) 3] create /PulsarZkBk
Created /PulsarZkBk
```

furthermore:

```js
[zk: 101.36.207:2181(CONNECTED) 4] create /PulsarZkBk/ledgers
Created /PulsarZkBk/ledgers
```

Verifying Znode for BookKeeper metadata has been created:

```js
[zk: 101.36.207:2181(CONNECTED) 1] ls /
[PulsarZkLocal, PulsarZkBk, zookeeper]
```

### Setting up bk_server.conf file for BookKeeper

Main variables, according to Pulsar documentation:

```js
bookiePort=3181
advertisedAddress=101.33.97
journalDirectories=/opt/bookkeeper/data/bk-journals
ledgerStorageClass=org.apache.bookkeeper.bookie.storage.ldb.DbLedgerStorage
ledgerDirectories=/opt/bookkeeper/data/bk-ledgers
metadataServiceUri=zk+hierarchical:
//101.36.207:2181;101.36.165:2181;101.36.179/PulsarZkBk/ledgers
#`zkServers` is deprecated in favor of using `metadataServiceUri`
#zkServers=localhost:2181
```

Important

**Note 1:** metadataServiceUri points to Local ZK IP’s.

**Note 2:** in metadataServiceUri use “;” instead of “,” for IP:PORT separation.

### Sending BookKeper metadata to Zookeeper Local

Just from one BookKeeper node

```bash
igdr@ip-101-33-97:/opt/bookkeeper/bookkeeper-server-4.11.1$
./bin/bookkeeper shell metaformat
```

The output confirming this:

```bash
INFO  BookKeeper metadata driver manager initialized
INFO  Initialize zookeeper metadata driver at metadata service uri
zk+hierarchical:
//101.36.207:2181;101.36.165:2181;101.36.179/PulsarZkBk/ledgers : 
zkServers = 101.36.207:2181,101.36.165:2181,101.36.179,
ledgersRootPath = /PulsarZkBk/ledgers.
Ledger root already exists. Are you sure to format bookkeeper metadata?
This may cause data loss. (Y or N) Y
INFO  Successfully formatted BookKeeper metadata
```

Additionally check BookKeeper Znode in one of the “local” Zookeeper servers

```js
[zk: 101.36.207:2181(CONNECTED) 8] ls /PulsarZkBk/ledgers
[INSTANCEID, LAYOUT, available]
```

### Start BookKeeper

Do this for each node/hostname

```js
igdr@ip-101-33-97:/opt/bookkeeper/bookkeeper-server-4.11.1$
./bin/bookkeeper bookie
```

Output received:

```bash
INFO  - [main:Main@274] - Hello, I'm your bookie, listening on port 3181.
Metadata service uri is zk+hierarchical:
//101.36.207:2181;101.36.165:2181;101.36.179/PulsarZkBk/ledgers.
Journals are in [/opt/bookkeeper/data/bk-journals].
Ledgers are stored in /opt/bookkeeper/data/bk-ledgers.
INFO  - [main:Bookie@991] - Finished reading journal, starting bookie
INFO  - [main:ComponentStarter@86] - Started component bookie-server.
```

## 4) Pulsar Configuration

### Cluster Info

```
Nodes:
Node 0: public hostname: 101.32.178
Node 1: public hostname: 101.34.49
Node 2: public hostname: 101.34.42
```

### Setting up broker.conf file for Pulsar (brokers)

Main variables, according to Pulsar documentation:

```js
zookeeperServers=
101.36.207:2181,101.36.165:2181,101.36.179:2181/PulsarZkLocal
configurationStoreServers=
101.36.207:2184,101.36.165:2184,101.36.179:2184/PulsarZkGlobal
brokerServicePort=6650
brokerServicePortTls=6651
webServicePort=8080
webServicePortTls=8443
bindAddress=0.0.0.0
advertisedAddress=101.32.178
clusterName=Chinchaysuyo
bookkeeperMetadataServiceUri=zk+hierarchical:
//101.36.207:2181;101.36.165:2181;101.36.179:2181/PulsarZkBk/ledgers
```

### Enabling Functions within Brokers

Additionally to enable function worker in brokers, also in bk_server.conf file:

```js
### --- Functions --- ###
# Enable Functions Worker Service in Broker
functionsWorkerEnabled=true
```

In functions_worker.yml file

```js
################################
# Function package management
################################
numFunctionPackageReplicas: 2
```

### Sending Pulsar metadata to Zookeeper (Local and Global) and Registering BookKeeper

```js
igdr@ip-101-32-178:/opt/pulsar/apache-pulsar-2.8.1$ ./bin/pulsar \
initialize-cluster-metadata \
--cluster Chinchaysuyo \
--zookeeper 101.36.207:2181,101.36.165:2181,101.36.179:2181/PulsarZkLocal \
--configuration-store
101.36.207:2184,101.36.165:2184,101.36.179:2184/PulsarZkGlobal \ 
--existing-bk-metadata-service-uri "zk+hierarchical:
//101.36.207:2181;101.36.165:2181;101.36.179:2181/PulsarZkBk/ledgers" \
--web-service-url http:
//101.32.178:8080,101.34.49:8080,101.34.42:8080 \
--web-service-url-tls https:
//101.32.178:8443,101.34.49:8443,101.34.42:8443 \
--broker-service-url pulsar:
//101.32.178:6650,101.34.49:6650,101.34.42:6650 \
--broker-service-url-tls pulsar+ssl:
//101.32.178:6651,101.34.49:6651,101.34.42:6651
```

The output after execution:

```bash
INFO  Setting up cluster Chinchaysuyo with zk
=101.36.207:2181,101.36.165:2181,101.36.179:2181/PulsarZkLocal
configuration-store=
101.36.207:2184,101.36.165:2184,101.36.179:2184/PulsarZkGlobal
INFO  EventThread shut down for session: 0x10016a8eb830004
INFO  Pulsar Cluster metadata for 'Chinchaysuyo' setup correctly
```

### Start Pulsar Broker

Do this for all the Pulsar nodes/brokers

```js
igdr@ip-101-32-178:/opt/pulsar/apache-pulsar-2.8.1$ ./bin/pulsar broker
```

Output after execution:

```js
INFO  org.apache.pulsar.broker.PulsarService - Starting Pulsar Broker service;
version: '2.8.1'
INFO  org.apache.pulsar.PulsarBrokerStarter - PulsarService started.
```

### Confirming Brokers available:

```js
igdr@ip-101-32-178:/opt/pulsar/apache-pulsar-2.8.1$ ./bin/pulsar-admin \
brokers list Chinchaysuyo
```

Output after execution:

```bash
"101.32.178:8080"
"101.34.49:8080"
"101.34.42:8080"
```

## Conclusion

Implementing a high available Pulsar instance is relatively easy. All the configurations shown in this guide need to be done as many times as nodes are available in the Pulsar instance, except the metadata sent from BookKeeper to Zookeeper and from Pulsar to Zookeeper which is only done from one node. The Pulsar Cluster then should be ready to publish and consume messages and additionally use I/O functions.
In the next and last blog of this series, I will analyse the logs generated when each of these components are initialised.
