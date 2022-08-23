---
title: "How To Enable Observability Into Apache Pulsar"
date: 2022-08-12T15:57:19-05:00
draft: false
type: guide
categories: # must be lowercase shishkabob
    #- at-the-edge
    - cluster-administration
    - getting-started
    #- machine-learning
    - moving-to-pulsar
    #- newsletter
    #- project-news
    #- pulsar-architecture
    #- pulsar-components
    #- use-cases
tags:
    #- microservices
    #- functions
    #- storage
    - observability
level: 300
summary:  This article explores how to enable observability for your Pulsar environment using Prometheus and Grafana, starting from a demo standalone Pulsar cluster. You then learn how to import sample Grafana dashboards for Pulsar from GitHub. Finally, once everything is up and running, we zoom in on several of the standard and crucial metrics for building your observability dashboards on Pulsar.
imgUrl: https://user-images.githubusercontent.com/16946028/184407424-be70e294-c46e-4714-8370-3190a243118a.png
author:
    name: Pulsar Neighborhood
    imgUrl:
meta:
    description: How to enable observability for your Pulsar environment using Prometheus and Grafana.
    keywords:
        - prometheus
        - grafana
        - observability
---

Apache Pulsar, like any other business-critical component in your IT organization, requires monitoring. After all, we can’t know how well a system is running without monitoring it. Over the years, monitoring abilities have been combined — or sometimes replaced — with observability. While the goal remains to validate the state of your systems and applications, observability starts from a healthy baseline and takes a more proactive approach to maintain it. One way to integrate this into your Pulsar environment is to explore the built-in monitoring and observability features of every Pulsar deployment:

* **Broker stats** — these are JSON files that collect statistics for each topic. You can combine these stats with collected broker metrics on a namespace level, which details broker information and topic statistics.
* **Function and connector stats** — as with the broker stats, these metrics are available in JSON format.  

While JSON format is sufficient for listing details, it’s not always the most convenient way to represent data or allow for its interpretation. That’s where a metrics configuration service such as [Prometheus](https://prometheus.io/) comes in. You can configure the function and connector stats to integrate with Prometheus out of the box. That said, every Pulsar deployment already comes preconfigured for Prometheus integration.

Once you decide to use Prometheus for collecting metrics, you should consider two other Pulsar statistics that don’t export metrics results into JSON. Instead, they export this data directly to Prometheus:

* **Zookeeper stats** — these are metrics related to the configuration store server, the clients, and Zookeeper. They are displayed using the Prometheus web interface.
* **Bookkeeper stats** — similar to zookeeper stats, these metrics are available from the Prometheus web interface, showing details related to the bookkeeper framework statistics.

If you’re unfamiliar with these metrics components, look at the [official Apache Pulsar Monitoring docs](https://pulsar.apache.org/docs/deploy-monitoring/).

Where Prometheus is powerful for generating and collecting metrics, you also want a tool for the graphical representation of the metrics results. [Grafana](https://grafana.com/) is a great option that features tight [integration](https://grafana.com/oss/prometheus/) with Prometheus.  

Prometheus and Grafana allow integration with numerous other IT industry platforms, such as VMware, Kubernetes, NewRelic, DataDog, Azure Log Analytics, and Splunk. So, you can optimize your observability more than your Pulsar infrastructure natively allows.

This article explores how to enable observability for your Pulsar environment using Prometheus and Grafana, starting from a demo standalone Pulsar cluster. You then learn how to import sample Grafana dashboards for Pulsar from GitHub. Finally, once everything is up and running, we zoom in on several of the standard and crucial metrics for building your observability dashboards on Pulsar.  

## Setting up the Pulsar Standalone Cluster

There are several ways to deploy a standalone Pulsar cluster for testing. For this scenario, we rely on a Docker containerized deployment.

Assuming you have a Linux-based Docker Desktop setup available, execute the following Docker command to pull the Apache Pulsar image and run it:

`docker run -it -p 6650:6650 -p 8080:8080 --mount source=pulsardata,target=/pulsar/data --mount source=pulsarconf,target=/pulsar/conf apachepulsar/pulsar:2.9.1 bin/pulsar standalone`

![Pulsar Docker Pull](https://user-images.githubusercontent.com/16946028/184414676-7c7d4b7b-edb5-4cb0-9d2e-1a97c8e2b1f7.png)

After pulling the images and creating the necessary Docker Volumes (`pulsar/data` and `pulsar/conf`), the various Pulsar components initiate. Your output is similar to the image below:

![Pulsar Run](https://user-images.githubusercontent.com/16946028/184414627-556a780a-97d7-47a1-97d7-d88c73f6da75.png)

This confirms that Apache Pulsar and all necessary components are running.  

You can validate this by inspecting the Docker container for Pulsar using the following Docker command:
  
` Docker container ls `

![Docker LS](https://user-images.githubusercontent.com/16946028/184414308-d6b0831f-673e-42b7-b554-93c8f3869819.png)

Note the container ID (`a316b99cae0f` in our example, but your ID is different). Run the following Docker command to connect to the SSH-terminal system prompt of the running container:

` Docker exec -it <container id> /bin/bash `

![Do Exc](https://user-images.githubusercontent.com/16946028/184414281-c63ba078-0121-44ec-ba2a-0865353202e5.png)

 Validate the Pulsar cluster by running the following `Pulsar-admin` command:

`bin/pulsar-admin clusters list`

![Pulsar Clusters List](https://user-images.githubusercontent.com/16946028/184414577-9a7792e9-aae0-4e5d-8acd-975526385415.png)

You can even look at the details of the standalone cluster:

`bin/pulsar-admin clusters get standalone`

![Pulsar Get Standalone](https://user-images.githubusercontent.com/16946028/184414541-2c39f3ea-a344-4f66-aeb9-ef107984f843.png)

## Creating Sample Tenants, Namespaces, and Topics, and Generating Data

By default, the Pulsar standalone cluster comes with a public tenant and namespace. To localize our sample messaging data, let’s create a new tenant (`marvelheroes`) and namespace (`characters`):

`bin/pulsar-admin tenants create --admin-roles  admin --allowed-clusters standalone`

```bash
marvelheroes 

bin/pulsar-admin namespaces create marvelheroes/characters 
```

![Pulsar Namespace Create](https://user-images.githubusercontent.com/16946028/184414337-0a7143a3-a9c7-4527-b31e-a18f66f2c77d.png)

Then, we must create a topic and subscription for our message routing. Execute the following command to do this:

`bin/pulsar-admin topics create persistent://marvelheroes/characters/heroes-topic`

![Pulsar Admin Topics](https://user-images.githubusercontent.com/16946028/184414685-dab71eca-1b85-49c6-8275-2a0433c144fb.png)

Now, execute this command to create the subscription:

`bin/pulsar-client consume -s "heroes-subs" -n 0 persistent://marvelheroes/characters/heroes-topic`

![pulsar consume](https://user-images.githubusercontent.com/16946028/184414086-5d59b598-3915-4920-ba91-2abe7b7e1f2e.png)

This enables us to send a message with the command below:

`bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k Spiderman -m "Peter Parker" -s "\n"`

![Pulsar Produce Output](https://user-images.githubusercontent.com/16946028/184414258-2b910b8e-4688-46d0-bfa3-b41d008985c5.png)

![Pulsar Message Output](https://user-images.githubusercontent.com/16946028/184414234-71abf988-c9d6-447e-ace2-7cefa1847baf.png)

Now, you can see that the command is received:

![Command Received](https://user-images.githubusercontent.com/16946028/184414661-68c2ea6d-a014-4016-9555-7508a977938a.png)

Next, generate a few more messages to validate the produce and consume process (and create some data for your Grafana dashboard). Execute the following command:

`bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k Wong -m "Sorcerer Supreme" -s "\n"`

```bash
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k DoctorStrange -m "Stephen Strange" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k America -m "America Chavez" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k Thor -m "Thorlief Golmen" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k IronMan -m "Tony Stark" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k BlackPanther -m "TChalla" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k BlackWidow -m "Natasha Romanoff" -s "\n" 
bin/pulsar-client produce persistent://marvelheroes/characters/heroes-topic -k CaptainAmerica -m "Steve Rogers" -s "\n"
```

This results in the message stream shown below:

![Stream Result](https://user-images.githubusercontent.com/16946028/184414493-94145ceb-58b7-4d2a-a3f5-bf187c30da2a.png)

If you want to view the topic statistics, the following command provides some insights:

`bin/pulsar-admin topics stats persistent://marvelheroes/characters/heroes-topic`

Below are some detailed metrics from our topic, truncated to reduce image size.

![Pulsar Topic Stats](https://user-images.githubusercontent.com/16946028/184414220-5993b43a-54a2-4765-ade6-615eb4ff504c.png)

You can also look at the [Pulsar Admin API/Get Stats](https://pulsar.apache.org/docs/admin-api-topics) for more details on each of these metrics.

Alternatively, you can obtain a more detailed view of metrics with the following command:

`bin/pulsar-admin topics stats-internal persistent://marvelheroes/characters/heroes`

```bash
-topic 
```

![image20](https://user-images.githubusercontent.com/16946028/184414508-0d16e9b4-1c57-46da-8b88-1ab8c4344322.png)

This output shows us the number of entries (nine) processed by the topic for each Marvel Hero character.

## Integrating Prometheus with Pulsar

While the Pulsar-Admin command line comes with a few options to read out metric statistics, it isn’t the observability tool we want. That’s where we must extend the environment with a Prometheus service acting as the metrics collector and Grafana as a tool for representing data in dynamic dashboards.

The easiest approach for this sample standalone Pulsar setup is to run another Docker container with the Prometheus engine already available. We recommend [Prom/Prometheus from Docker Hub](https://hub.docker.com/r/prom/prometheus).

Before running the Prometheus container, you must provide the correct configuration parameters from your Pulsar environment in a Prometheus YAML configuration file. This file merely refers to the IP address of the Docker host running the Pulsar containerized workload.  

While most docs refer to this as `localhost`, Prometheus doesn’t resolve the address `https://localhost:9090/Targets`. So, this example uses the developer's host's virtual IP address (`172.26.96.1`). This machine uses the Docker Bridge virtual network on a Windows machine with Ubuntu Windows Subsystem for Linux (WSL).

![WSL adapter](https://user-images.githubusercontent.com/16946028/184414621-7a17fcae-efdf-4a2e-9df3-56d68437601f.png)

Your YAML file should mirror the contents below, save for updating the IP address to yours:

```yaml
# Licensed under the Apache License, Version 2.0 (the "License"); 
# you may not use this file except in compliance with the License. 
# You may obtain a copy of the License at 
# 
#     http://www.apache.org/licenses/LICENSE-2.0 
# 
# Unless required by applicable law or agreed to in writing, software 
# distributed under the License is distributed on an "AS IS" BASIS, 
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
# See the License for the specific language governing permissions and 
# limitations under the License. 
# 

--- 
global: 
  scrape_interval:     15s # By default, scrape targets every 15 seconds. 
  evaluation_interval: 15s # By default, scrape targets every 15 seconds. 
  # scrape_timeout is set to the global default (10s). 
  external_labels: 
    cluster: 'standalone' 

# Load and evaluate rules in these files every 'evaluation_interval' seconds. 
# rule_files: 

scrape_configs: 
  - job_name: "proxy" 
    honor_labels: true # don't overwrite job & instance labels 
    static_configs: 
    - targets: 
      - '172.26.96.1:8080' 

  - job_name: "broker" 
    honor_labels: true # don't overwrite job & instance labels 
    static_configs: 
    - targets: 
      - '172.26.96.1:8080' 

  - job_name: "bookie" 
    honor_labels: true # don't overwrite job & instance labels 
    static_configs: 
    - targets: 
      - '172.26.96.1:8080' 

  - job_name: "zookeeper" 
    honor_labels: true 
    static_configs: 
    - targets: 
      - '172.26.96.1:8080' 

  # - job_name: "node_metrics" 
  #   honor_labels: true # don't overwrite job & instance labels 
  #   static_configs: 
  #   - targets: 
  #     - '&lt;node1&gt;:9100' 
  #     - ... 
```

Save this file as `pulsarprom.yml` (or any other name) to your local machine, as you need the file and its path later on.  

Execute the following `Docker Run` command, which pulls the `prom/prometheus` image from Docker Hub and loads the YAML file into the `etc/prometheus/prometheus.yml` config file within the running Prometheus container:

`docker run -p 9090:9090 -v &lt;path to &gt; /pulsarprom.yml:/etc/prometheus/prometheus.yml prom/prometheus --config.file=/etc/prometheus/prometheus.yml`

![Pulsar Stand Alone](https://user-images.githubusercontent.com/16946028/184414726-7075938b-1dc2-4c4b-b990-c6479cb8034f.png)

From your browser, connect to https://&lt;Docker Host IP-address&gt;:9090, which loads the default Prometheus dashboard:

![Prom Home](https://user-images.githubusercontent.com/16946028/184414557-db6e705b-c603-4bd3-b2e3-3bbeb791856b.png)

Then, from the top menu, select **Status/Targets**. Alternatively, directly navigate to https://&lt;Docker Host IP-address&gt;:9090/Targets. This page shows the different Pulsar components:

![Prom Targets](https://user-images.githubusercontent.com/16946028/184414119-cb2a6ca0-f7b1-4e15-b29a-fdf17b43348c.png)

Suppose you click any of the endpoint URLs (<https://IP-address/metrics>). In that case, you are redirected to the Pulsar metric’s details, which technically come from the broker service:

![Prom Metrics](https://user-images.githubusercontent.com/16946028/184414428-67114a5f-db05-4153-ad04-ea629eead9b4.png)

Prometheus picks up these Pulsar metric details and pulls them into Grafana for the dashboard representation.

Note that while the sections are available, Proxy and bookie metrics are not available for the standalone deployment of Pulsar.

This completes the necessary steps to get Prometheus up and running for Pulsar.  

## Integrating Grafana with Pulsar and Prometheus

Let’s continue with the deployment of the Grafana tooling, again using a Docker container with the Pulsar Standalone setup.

Pull the standard Grafana Docker image from Docker Hub and run it by executing the following Docker command:

`docker run -d --name=grafana -p 3000:3000 grafana/grafana`

![Grafana Docker](https://user-images.githubusercontent.com/16946028/184414268-7b387969-6924-4326-ab33-fa73760a8f0a.png)

Then, connect to the Grafana dashboard from your browser: [https://localhost:3000](https://localhost:3000/).

The default login credentials are admin and admin, but you must update the default password.

![Grafana Login](https://user-images.githubusercontent.com/16946028/184414206-6fe46e8a-d542-4f06-a7bb-3380fcbaf00d.png)

From within the Grafana homepage, select **Data Sources**to add your first data source:

![Grafana Dash](https://user-images.githubusercontent.com/16946028/184414298-8e0445be-c7e0-45c1-a220-320658224fff.png)

Then, from the list of supported data sources, choose **Prometheus**:

![image24](https://user-images.githubusercontent.com/16946028/184414565-79f50cd4-a95f-47a3-9bf7-161c2a3930fb.png)

Under **HTTP**, update the **URL**field with the correct URL your Prometheus runtime is using (http://&lt;Docker Host IP-address&gt;:9090).

Scroll down and click **Save and Test**. You should receive a notification confirming connectivity to the Prometheus runtime.

![Data source working](https://user-images.githubusercontent.com/16946028/184414588-dafbff2f-8d58-4e46-b5e3-3446b5a83f2b.png)

Return to the Grafana homepage and select **Dashboards**.

![Prom Dashboards](https://user-images.githubusercontent.com/16946028/184414177-0c7bc960-7e54-4db7-b66a-d4671e1e3843.png)

From the **New dashboard** view, select **Add a new panel**.

![New Dash](https://user-images.githubusercontent.com/16946028/184414583-7a3e34ba-58f8-47d6-bd5b-e50f7d27a97f.png)


Notice that Prometheus is the **Data Source**. However, there is a list of all available Pulsar metrics under **Metrics &gt; Select Metric**.  

![prometheus dashboard](https://user-images.githubusercontent.com/16946028/184414059-e10ee56a-018e-45f5-bf9f-22380395e8e1.png)

While it’s possible to add each metric you're looking for into a single dashboard, Datastax has shouldered much of that work. Our source is available as a [GitHub repository](https://github.com/datastax/pulsar-helm-chart/tree/master/helm-chart-sources/pulsar/grafana-dashboards).  

![image35](https://user-images.githubusercontent.com/16946028/184414717-48d676cb-9686-418e-943e-be510fcc377e.png)

To use these, navigate to the Grafana homepage, select **Dashboards** from the left-side menu, and click **Import**.

![Grafana New Dash](https://user-images.githubusercontent.com/16946028/184414458-0dac0295-d573-4a92-bc1f-ae8b51bb7b71.png)

There are two ways to manage the import:

The first is to upload a JSON file from your local machine. Consider running:

`git clone pulsar-helm-chart/helm-chart-sources/pulsar/grafana-dashboards`

at

`master · datastax/pulsar-helm-chart (github.com)`

This copies all sample JSON files to your local machine.

The second option is to select an individual JSON file “as raw” from the Datastax GitHub repository, then copy the contents into the **JSON** field in the Grafana portal.  

This is what it looks like to import the contents of the sample JSON file from the Datastax library, `overview.json`:

![Prom Import](https://user-images.githubusercontent.com/16946028/184414157-9d36d9c2-901e-486f-895a-3b64774fc53f.png)

Click **Load**, which brings you to the summary page. Here, confirm by clicking the **Import** button.

![image21](https://user-images.githubusercontent.com/16946028/184414522-4e58cb38-76b6-4219-81c5-90425428fe09.png)

The resulting dashboard looks like this:

![Grafana Pulsar Dashboard](https://user-images.githubusercontent.com/16946028/184414606-bdaa83fb-2c26-48ca-8941-daba7285f0c9.png)

The critical metrics listed in this dashboard are as follows:

* **CPU and memory of the nodes** — these require mapping with the [Node Exporter](https://github.com/prometheus/node_exporter), disabled by default, for the standalone setup. As with any other system, having a clear view of resource consumption could indicate the system's health, helping you build a baseline for observability and use it as a trigger to alert you when resource consumption deviates from the baseline.
* **Status of the zookeeper, broker, and proxies in your setup** — the broker stats provide insight into the overall broker service information and a view of the topics organized by namespace. By default, these are refreshed out of Pulsar every minute.
* **Top 10 topics backlog** — If the number of messages in the backlog grows, this typically indicates a resource or availability issue with your Pulsar cluster. It may also help you identify which topics handle more message traffic, which might necessitate moving them to a larger or dedicated cluster.

Scrolling down exposes more details, including the sample topic we used for the Marvel heroes:

![Grafana Pulsar Dash](https://user-images.githubusercontent.com/16946028/184414321-078bb0cb-41ba-46af-954b-79728607ab10.png)

Key information to understand from this dashboard is listed below:

* **Total producer and consumer counts** — observability of both producers and consumers enable your DevOps team to create a baseline for the use and performance of the Pulsar cluster. If these numbers keep growing, you might consider expanding the cluster with more nodes to guarantee performance.
* **Number of messages processed in a given timeframe** — in addition to viewing the message loads, you can also see peak moments, slower moments, or moments of non-usage. This can help your DevOps team decide on overall cluster load, trend analysis, and scalability.
* **Top 10 topics and their storage consumption** — the topics compose the engine of message handling; the more significant these numbers, the more messages your cluster is processing. Observing the behavior on an hourly or daily basis helps you identify the average consumption, performance, and availability of your Pulsar infrastructure.

Now, save the dashboard.

Repeat the same process of importing a JSON file, this time selecting `topic.json` as the source. The resulting dashboard shows more detailed metrics related to the Pulsar topics:

![Prom Dashboard](https://user-images.githubusercontent.com/16946028/184414136-e4404449-bc6d-4637-9b30-56f2f8c6f14d.png)

As a final example, import the `messaging.JSON` dashboard file from the Datastax GitHub repository. The resulting dashboard should look similar to this:

![Grafana Pulsar Dash](https://user-images.githubusercontent.com/16946028/184414652-1c34ba1d-86ec-4458-8e22-5cf83f89bdfe.png)

The critical information to observe includes:

* **The number of topics** — similar to the previous dashboard, you have a clear view of the behavior of your topics, the number of messages they process, and the overall load. This information keeps your DevOps teams in the know to guarantee the stability of the Pulsar infrastructure.
* **List of subscriptions, producers, and consumers** — although the core impact of Pulsar’s performance comes from the number of messages it handles, growth in the core components might also indicate an overloaded or undersized infrastructure.
* **Msg (message) backlog** — this represents the total backlog size of messages linked to the given namespace and topic. While having a backlog doesn’t immediately indicate a significant issue, it’s an accurate performance indicator for the overall Pulsar environment’s health and average load, especially when defining a trend analysis.

## Summary

Observability is crucial for DevOps teams to identify the state of Pulsar services and establish an infrastructure’s baseline. Fortunately, you can easily enable this observability in your Pulsar standalone cluster by integrating Prometheus and Grafana Docker.

To address the complexity of monitoring the metrics that come with Pulsar observability. DataStax provides an open-source GitHub repository with ready-to-import Grafana dashboards in JSON format. Your DevOps team can quickly access all the metrics needed to analyze and make informed decisions about your infrastructure.
