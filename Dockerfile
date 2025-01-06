# Project: v3-subgraph
# Description: -
ARG PY_VER=3.11
FROM python:${PY_VER} AS subgraph-py
######################################################################
# LABELS
######################################################################
ARG COMMIT_ID
ARG COMMIT_TIMESTAMP
ARG COMMIT_AUTHOR
ARG BUILD_APPLICATION
ARG BUILD_DATE

LABEL org.vcs.CommitId=${COMMIT_ID}
LABEL org.vcs.CommitTimestamp=${COMMIT_TIMESTAMP}
LABEL org.vcs.CommitAuthor=${COMMIT_AUTHOR}
LABEL org.build.Application=${BUILD_APPLICATION}
LABEL org.build.Date=${BUILD_DATE}

######################################################################
# BUILD STAGE
######################################################################
RUN apt-get update && \
    apt-get install --no-install-recommends -y tini jq && \
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    node -v >> debug.txt &&\
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN npm install -g @graphprotocol/graph-cli@0.79.2

RUN mkdir /subgraph
COPY package.json /subgraph
WORKDIR /subgraph
RUN npm i
RUN pip install --upgrade --no-cache pip
RUN pip install PyYAML --no-cache --default-timeout=60
COPY . /subgraph
