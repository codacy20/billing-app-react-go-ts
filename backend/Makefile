.PHONY: build run clean docker-build docker-run

# Build the application
build:
	go build -o billing-server .

# Run the application
run:
	go run main.go

# Clean build artifacts
clean:
	rm -f billing-server

# Build Docker image
docker-build:
	docker build -t billing-server:latest .

# Run Docker container
docker-run:
	docker run -p 8080:8080 billing-server:latest 