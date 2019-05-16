#!/usr/bin/env bash


args=("$@")

sudo echo "0.0.0.0 "${args[1]} >> "${args[0]}"/user.remote.hosts

echo 'success'
