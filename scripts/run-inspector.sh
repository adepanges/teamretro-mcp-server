#!/bin/bash

# Load .env file
set -a
source .env
set +a

# Define JSON response format for inspector
TEAMRETRO_RESPONSE_FORMAT=json

# Build environment variable arguments
env_args=""
for var in $(compgen -v | grep '^TEAMRETRO_'); do
  env_args+=" -e $var=${!var}"
done

# Run inspector
pnpm dlx @modelcontextprotocol/inspector $env_args node dist/index.js
