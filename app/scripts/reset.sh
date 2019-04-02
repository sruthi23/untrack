#!/usr/bin/env bash

# revert up original hosts file
sudo \cp app/assets/hosts.original.backup /etc/hosts

# clear DNS cache
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

echo 'reset success'
