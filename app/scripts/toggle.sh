#!/usr/bin/env bash

# back up current hosts file
sudo cp /etc/hosts app/assets/hosts.toggle.backup

# load basic non-blocking-anything hosts file
sudo cp app/assets/hosts /etc/hosts

# clear DNS cache
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
