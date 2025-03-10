#!/bin/bash

# Run the backend and frontend together
echo "Starting the Billing Application..."

# Start the backend in the background
echo "Starting the backend server..."
cd backend
go run main.go &
BACKEND_PID=$!
cd ..

# Wait for the backend to start
echo "Waiting for the backend to start..."
sleep 2

# Start the frontend
echo "Starting the frontend application..."
cd frontend
npm start

# When the frontend is stopped, also stop the backend
echo "Stopping the backend server..."
kill $BACKEND_PID 