package handlers

import (
	"encoding/json"
	"net/http"
)

func (s *Server) FinishedWalkHandler(w http.ResponseWriter, r *http.Request) {
	var rating struct {
		Username  string `json:"username"`
		OtherUser string `json:"other_user"`
		Rating    int    `json:"rating"`
	}
	err := json.NewDecoder(r.Body).Decode(&rating)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Bad Request"))
		return
	}

	for i, walk := range s.OngoingWalks {
		if walk.User1 == rating.Username || walk.User2 == rating.Username {
			s.OngoingWalks = append(s.OngoingWalks[:i], s.OngoingWalks[i+1:]...)
			break
		}
	}

	for i, user := range s.Users {
		if user.Username == rating.OtherUser {
			s.Users[i].TotalRating += rating.Rating
			s.Users[i].NumRatings++

			break
		}
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Finished Walk"))
}
