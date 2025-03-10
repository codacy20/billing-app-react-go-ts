#!/bin/bash

# Test the API endpoints
echo "Testing the /ready endpoint..."
curl -s http://localhost:8080/ready
echo -e "\n"

echo "Testing the /billing endpoint with default parameters..."
curl -s http://localhost:8080/billing | jq .
echo -e "\n"

echo "Testing the /billing endpoint with offset=5 and length=3..."
curl -s "http://localhost:8080/billing?offset=5&length=3" | jq .
echo -e "\n"

echo "Testing the /billing endpoint with invalid parameters..."
curl -s "http://localhost:8080/billing?offset=-1" -v
echo -e "\n" 