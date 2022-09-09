package handlers

import "net/http"

func (s *Server) PingHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Pong"))
}
