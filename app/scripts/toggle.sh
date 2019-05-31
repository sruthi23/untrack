#!/usr/bin/env bash

source $(dirname $0)/functions.sh

args=("$@")


if [ ${args[0]} = 'on' ]
then
  offUntrack
else
  onUntrack
fi

#clearDNSCache

echo 'success'
