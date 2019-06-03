#!/usr/bin/env bash

source $(dirname $0)/functions.sh

args=("$@")

sudo cp "${args[0]}"/user.remote.hosts /etc/hosts

clearDNSCache

echo 'success'
