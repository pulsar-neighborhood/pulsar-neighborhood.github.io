locals {
  cluster_name          = "standalone"
  tenant_name           = "tf-tenant"
  namespace             = "tf-namespace"
  topic_name            = "tf-topic"
}

terraform {
  required_providers {
    pulsar = {
      source = "quantummetric/pulsar"
      version = "1.0.0"
    }
  }
}

provider "pulsar" {
  web_service_url = "http://localhost:8080"
}

resource "pulsar_cluster" "pulsar_cluster" {
  cluster = local.cluster_name

  cluster_data {
    web_service_url    = "http://localhost:8080"
    broker_service_url = "http://localhost:6050"
    #peer_clusters      = ["skrulls", "krees"]
  }
}

resource "pulsar_tenant" "pulsar_tenant" {
  tenant = local.tenant_name
  allowed_clusters = [pulsar_cluster.pulsar_cluster.cluster]
}

resource "pulsar_namespace" "pulsar_namespace" {
  tenant    = pulsar_tenant.pulsar_tenant.tenant
  namespace = local.namespace
}

resource "pulsar_topic" "pulsar_topic" {
  tenant     = pulsar_tenant.pulsar_tenant.tenant
  namespace  = pulsar_namespace.pulsar_namespace.namespace
  topic_type = "persistent"
  topic_name = local.topic_name
  partitions = 0
}
