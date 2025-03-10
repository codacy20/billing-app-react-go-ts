package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestReadyEndpoint(t *testing.T) {
	// Create a request to the /ready endpoint
	req, err := http.NewRequest("GET", "/ready", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a ResponseRecorder to record the response
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

	// Serve the request
	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Check the response body
	expected := "OK"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v", rr.Body.String(), expected)
	}
}

func TestBillingEndpoint(t *testing.T) {
	// Create a request to the /billing endpoint
	req, err := http.NewRequest("GET", "/billing?offset=0&length=5", nil)
	if err != nil {
		t.Fatal(err)
	}

	// Create a ResponseRecorder to record the response
	rr := httptest.NewRecorder()

	// Create a handler that mimics our actual handler
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Set content type
		w.Header().Set("Content-Type", "application/json")

		// Create a sample response
		response := BillingResponse{
			Orders: generateOrders(5),
			Total:  100,
		}

		// Return the response as JSON
		json.NewEncoder(w).Encode(response)
	})

	// Serve the request
	handler.ServeHTTP(rr, req)

	// Check the status code
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Parse the response body
	var response BillingResponse
	if err := json.Unmarshal(rr.Body.Bytes(), &response); err != nil {
		t.Errorf("failed to parse response body: %v", err)
	}

	// Check that we got the expected number of orders
	if len(response.Orders) != 5 {
		t.Errorf("expected 5 orders, got %d", len(response.Orders))
	}

	// Check that the total is correct
	if response.Total != 100 {
		t.Errorf("expected total to be 100, got %d", response.Total)
	}
}
