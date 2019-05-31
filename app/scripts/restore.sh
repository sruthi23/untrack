#!/usr/bin/env bash

set -e

# Ask for the administrator password upfront
sudo -v

# Keep-alive: update existing `sudo` time stamp until finished
while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done 2>/dev/null &

sudo yes | sudo cp -rf "$HOME/Desktop/untrack/hosts" /etc/hosts

sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

echo 'success'
exit
