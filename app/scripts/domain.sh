#!/usr/bin/env bash

source $(dirname $0)/functions.sh

args=("$@")

sudo echo "0.0.0.0 ${args[1]}" >> "${args[0]}"/user.remote.hosts

sudo cat "${args[0]}"/user.remote.hosts >> /etc/hosts

clearDNSCache

echo 'success'
