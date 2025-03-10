# Billing Application with React and Go

A full-stack billing application with a React frontend and Go backend.

## Project Structure

- `frontend/`: React TypeScript frontend application
- `backend/`: Go backend API server

## Quick Start

To run both the frontend and backend together, use the provided script:

```bash
./run-app.sh
```

This will start the backend server on port 8080 and the frontend application on port 3000.

## Backend

The backend is a Go application that provides two endpoints:

- `/ready`: Health check endpoint that always returns 200 OK
- `/billing`: Returns billing data with pagination support

### Running the Backend

```bash
cd backend
./run.sh
```

Or manually:

```bash
cd backend
go run main.go
```

The server will start on port 8080.

## Frontend

The frontend is a React TypeScript application that displays billing information.

### Environment Variables

The frontend uses environment variables to configure the API endpoint. Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:8080
```

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The application will start on port 3000.

## API Documentation

### Billing Endpoint

```
GET /billing?offset=0&length=10
```

#### Query Parameters

- `offset` (optional): The starting index of the data to return (default: 0)
- `length` (optional): The number of items to return (default: 10, max: 50)

#### Response Format

```json
{
  "orders": [
    {
      "date": "Jan. 01, 2023",
      "type": "Pro Annual"
    },
    ...
  ],
  "total": 100
}
```
