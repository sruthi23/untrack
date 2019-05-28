#!/usr/bin/env bash

args=("$@")

sudo cp "${args[0]}"/user.remote.hosts /etc/hosts

echo 'success'
