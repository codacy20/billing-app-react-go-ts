package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

// Order represents a billing order
type Order struct {
	Date string `json:"date"`
	Type string `json:"type"`
}

// BillingResponse is the response structure for the /billing endpoint
type BillingResponse struct {
	Orders []Order `json:"orders"`
	Total  int     `json:"total"`
}

// Generate random order data
func generateOrders(count int) []Order {
	orderTypes := []string{"Pro Annual", "Pro Portfolio", "Sponsored Post", "Basic Plan", "Premium Support"}

	orders := make([]Order, count)
	now := time.Now()

	for i := 0; i < count; i++ {
		// Generate a random date within the last 2 years
		randomDays := rand.Intn(730)
		orderDate := now.AddDate(0, 0, -randomDays)

		// Format the date as "Jan. 02, 2006"
		formattedDate := orderDate.Format("Jan. 02, 2006")

		// Select a random order type
		orderType := orderTypes[rand.Intn(len(orderTypes))]

		orders[i] = Order{
			Date: formattedDate,
			Type: orderType,
		}
	}

	return orders
}

func main() {
	// In Go 1.20+, we don't need to seed the random number generator explicitly
	// It's automatically seeded with a random value at program startup

	// Define the total number of orders in our "database"
	totalOrders := 100

	// Health check endpoint
	http.HandleFunc("/ready", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Billing endpoint with pagination
	http.HandleFunc("/billing", func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Parse query parameters for pagination
		offsetStr := r.URL.Query().Get("offset")
		lengthStr := r.URL.Query().Get("length")

		offset := 0
		if offsetStr != "" {
			var err error
			offset, err = strconv.Atoi(offsetStr)
			if err != nil || offset < 0 {
				http.Error(w, "Invalid offset parameter", http.StatusBadRequest)
				return
			}
		}

		length := 10 // Default page size
		if lengthStr != "" {
			var err error
			length, err = strconv.Atoi(lengthStr)
			if err != nil || length <= 0 || length > 50 {
				http.Error(w, "Invalid length parameter (must be between 1 and 50)", http.StatusBadRequest)
				return
			}
		}

		// Ensure we don't go beyond the total number of orders
		if offset >= totalOrders {
			// Return empty array if offset is beyond total
			response := BillingResponse{
				Orders: []Order{},
				Total:  totalOrders,
			}

			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
			return
		}

		// Calculate how many orders to return
		ordersToReturn := length
		if offset+length > totalOrders {
			ordersToReturn = totalOrders - offset
		}

		// Generate the orders for this page
		orders := generateOrders(ordersToReturn)

		// Create the response
		response := BillingResponse{
			Orders: orders,
			Total:  totalOrders,
		}

		// Return the response as JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(response)
	})

	// Start the server
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
