package auth

import (
	"encoding/base64"
	"net/http"
	"os"
	"strings"

	"github.com/MaximeHeckel/health-dashboard/go/src/server/utils"
)

// CheckAuth basic authentication
func CheckAuth(w http.ResponseWriter, r *http.Request) (bool, *utils.HTTPError) {
	s := strings.SplitN(r.Header.Get("Authorization"), " ", 2)

	if len(s) != 2 {
		return false, &utils.HTTPError{StatusCode: http.StatusUnauthorized, Status: http.StatusText(http.StatusUnauthorized)}
	}

	b, err := base64.StdEncoding.DecodeString(s[1])
	if err != nil {
		return false, &utils.HTTPError{StatusCode: http.StatusUnauthorized, Status: http.StatusText(http.StatusUnauthorized)}
	}

	pair := strings.SplitN(string(b), ":", 2)
	if len(pair) != 2 {
		return false, &utils.HTTPError{StatusCode: http.StatusUnauthorized, Status: http.StatusText(http.StatusUnauthorized)}
	}

	if pair[0] == os.Getenv("USER") && pair[1] == os.Getenv("PASS") {
		return true, nil
	}

	return false, &utils.HTTPError{StatusCode: http.StatusUnauthorized, Status: http.StatusText(http.StatusUnauthorized)}
}
