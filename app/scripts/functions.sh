#!/usr/bin/env bash

onUntrack () {
  sudo cp "${args[1]}"/user.remote.hosts /etc/
  sudo cat "${args[1]}"/user.remote.hosts >> /etc/hosts

}


offUntrack () {
  sudo cp "${args[1]}"/default.hosts /etc/hosts
}


backup () {
  # back up current hosts file
  sudo \cp /etc/hosts app/assets/hosts/original.backup
}


clearDNSCache() {
  #clear DNS cache
if [[ "$OSTYPE" == "linux-gnu" ]]; then
   sudo service dns-clean restart
elif [[ "$OSTYPE" == "darwin"* ]]; then
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
elif [[ "$OSTYPE" == "win32" ]]; then
   sudo ipconfig /flushdns
fi
}
