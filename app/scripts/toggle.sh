#!/usr/bin/env bash

source $(dirname $0)/functions.sh

args=("$@")

if [ ${args[0]} = 'on' ]
then
  onUntrack
else
  offUntrack
fi

clearDNSCache

echo 'success'
