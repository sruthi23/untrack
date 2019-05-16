#!/usr/bin/env bash


args=("$@")

sudo echo "0.0.0.0 "${args[2]} >> "${args[1]}"/user.remote.hosts

echo 'success'
