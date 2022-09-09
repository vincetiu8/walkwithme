package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	h "github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	motor2 "github.com/sonr-io/sonr/third_party/types/motor"
	"walkwithme-backend/accounts"
	"walkwithme-backend/handlers"
)

func createRouter(s *handlers.Server) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/", s.PingHandler).Methods("GET")

	// Account Management
	// Create Account
	r.HandleFunc("/accounts/create", s.CreateAccountHandler).Methods("POST")

	// Log into account
	r.HandleFunc("/accounts/login", s.LoginHandler).Methods("POST")

	// Change Username
	r.HandleFunc("/accounts/username", s.ChangeUsernameHandler).Methods("PUT")

	// Change Password
	r.HandleFunc("/accounts/password", s.ChangePasswordHandler).Methods("PUT")

	// Change Name
	r.HandleFunc("/accounts/name", s.ChangeNameHandler).Methods("PUT")

	// Finding other users
	// Register travel plan
	r.HandleFunc("/search/registerplan", s.RegisterPlanHandler).Methods("POST")

	// Search for users
	r.HandleFunc("/search/findpartner", s.FindPartnerHandler).Methods("POST")

	// Operations when walking
	// Confirm arrived at destination
	r.HandleFunc("/walk/finishedwalk", s.FinishedWalkHandler).Methods("POST")

	return r
}

func main() {
	s, err := handlers.NewServer()
	if err != nil {
		panic(err)
	}

	aesPskKey, _ := os.ReadFile("aesPskKey")

	_, err = s.Mtr.Login(motor2.LoginRequest{
		Did:       "snr1d7w5cr7nxa84gtwgcpv6fhgfrjquvpqygmxq2y",
		Password:  "amongus",
		AesPskKey: aesPskKey,
	})
	if err != nil {
		panic(err)
	}

	queryResp, err := s.Mtr.QueryWhatIsByDid("did:snr:QmTYGoTAsamNDN2UtGBdHeY3GAigFB41fwXmcSjoAY5Fvd") // Schema DID
	fmt.Println(queryResp.WhatIs)

	bucket, err := s.Mtr.GetBucket("did:snr:1cdad848e8ba493bafd67c9357d993ed") // Bucket DID

	for _, item := range bucket.GetBucketItems() {
		m, err := s.Mtr.QueryObject(item.Uri)
		if err != nil {
			panic(err)
		}
		j, err := json.Marshal(m)
		var user accounts.User
		err = json.Unmarshal(j, &user)
		s.Users = append(s.Users, user)
	}

	r := createRouter(s)
	headersOk := h.AllowedHeaders([]string{
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
		"accept",
		"origin",
		"Cache-Control",
		"X-Requested-With",
	})
	originsOk := h.AllowedOrigins([]string{"*"})
	credentialsOk := h.AllowCredentials()
	methodsOk := h.AllowedMethods([]string{
		"CREATE",
		"GET",
		"POST",
		"PUT",
		"DELETE",
	})

	fmt.Println("Listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", h.CORS(originsOk, headersOk, methodsOk, credentialsOk)(r)))
}
