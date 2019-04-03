#!/usr/bin/env bash

onUntrack () {
  sudo cp app/assets/hosts/user.hosts /etc/hosts
}


offUntrack () {
  sudo cp app/assets/hosts/default.hosts /etc/hosts
}


backup () {
  # back up current hosts file
  sudo \cp /etc/hosts app/assets/hosts/original.backup
}


clearDNSCache() {
  # clear DNS cache
  sudo dscacheutil -flushcache
  sudo killall -HUP mDNSResponder
}
