#!/bin/bash

update_id_in_toml() {
    local file="./backend/wrangler.toml"
    local new_id="${Cloudflare_CHAT_KV_id}"
    if [[ -z "$new_id" ]]; then
        echo "Environment variable Cloudflare_CHAT_KV_id is not set"
        exit 1
    fi

    if [[ -f "$file" ]]; then
        sed -i.bak -E "s/^id = \".*\"/id = \"$new_id\"/" "$file"
        sed -i.bak -E "s/^preview_id = \".*\"/preview_id = \"$new_id\"/" "$file"
        echo "id and preview_id updated successfully in $file"
    else
        echo "File $file does not exist"
    fi
}

update_id_in_toml

update_auth0_domain() {
    local file="./backend/src/utils/auth.ts"
    local new_domain="${AUTH0_DOMAIN}"
    if [[ -z "$new_domain" ]]; then
        echo "Environment variable AUTH0_DOMAIN is not set"
        exit 1
    fi

    if [[ -f "$file" ]]; then
        sed -i.bak -E "s/^const AUTH0_DOMAIN = \".*\";/const AUTH0_DOMAIN = \"$new_domain\";/" "$file"
        echo "AUTH0_DOMAIN updated successfully in $file"
    else
        echo "File $file does not exist"
    fi
}

update_auth0_domain

update_frontend_domain() {
    local file="./frontend/src/index.tsx"
    local new_domain="${AUTH0_DOMAIN}"
    if [[ -z "$new_domain" ]]; then
        echo "Environment variable AUTH0_DOMAIN is not set"
        exit 1
    fi

    local new_auth0_client_id="${auth0_client_id}"
    if [[ -z "$new_auth0_client_id" ]]; then
        echo "Environment variable auth0_client_id is not set"
        exit 1
    fi

    if [[ -f "$file" ]]; then
        sed -i.bak -E "s/^domain=\".*\";/domain=\"$new_domain\";/" "$file"
        echo "domain updated successfully in $file"
        sed -i.bak -E "s/^clientId=\".*\";/clientId=\"$new_auth0_client_id\";/" "$file"
        echo "clientId updated successfully in $file"
        sed -i.bak -E "s/^audience: \'.*\";/audience: \'$new_domain/api/v2/\";/" "$file"
        echo "audience updated successfully in $file"
    else
        echo "File $file does not exist"
    fi
}

update_frontend_domain