# Billing Backend API

A simple Go backend that serves billing data with pagination support.

## Endpoints

### Health Check
```
GET /ready
```
Always returns a 200 OK status code.

### Billing Data
```
GET /billing?offset=0&length=10
```
Returns billing data with pagination support.

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

## Running the Application

1. Make sure you have Go installed (version 1.16 or higher)
2. Navigate to the backend directory
3. Run the application:
```bash
go run main.go
```
4. The server will start on port 8080

## Building the Application

To build a binary:
```bash
go build -o billing-server
```

Then run the binary:
```bash
./billing-server
``` 