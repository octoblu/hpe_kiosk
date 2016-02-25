#!/bin/bash

install_awscli(){
  pip install --user awscli
  export PATH=$PATH:$HOME/.local/bin
}

configure_awscli(){
  local aws_access_key_id=$1
  local aws_secret_access_key=$2

  aws configure set aws_access_key_id "$aws_access_key_id"
  aws configure set aws_secret_access_key "$aws_secret_access_key"
  aws configure set preview.cloudfront true
}

create_invalidation(){
  local git_tag=$1
  aws cloudfront create-invalidation \
    --distribution-id E284PF3980EMW0 \
    --invalidation-batch "{\"Paths\": {\"Quantity\": 3, \"Items\": [\"/index.html\", \"/greeting.html\", \"/css/*\", \"/img/*\", \"/js/*\"]}, \"CallerReference\": \"travis-$git_tag\"}"
}

main(){
  local aws_access_key_id=$1
  local aws_secret_access_key=$2
  local git_tag=$3

  install_awscli
  configure_awscli "$aws_access_key_id" "$aws_secret_access_key"
  create_invalidation "$git_tag"
}
main $@
