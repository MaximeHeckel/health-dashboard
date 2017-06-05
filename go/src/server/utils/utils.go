package utils

import (
	"os"
	"strconv"
	"time"

	log "github.com/Sirupsen/logrus"
	"gopkg.in/mgo.v2"
)

// MONGOCLIENTADDRESS variable containing the tcp address of the mongo database container
var MONGOCLIENTADDRESS string

// MONGOSESSION mongodb session object
var MONGOSESSION *mgo.Session

type HTTPError struct {
	Status     string
	StatusCode int
}

func setMongoAddress() string {
	MONGOCLIENTADDRESS = "mongodb:27017"
	if len(os.Getenv("MONGODB_PORT_27017_TCP_ADDR")) != 0 && len(os.Getenv("MONGODB_PORT_28017_TCP_PORT")) != 0 {
		MONGOCLIENTADDRESS = os.Getenv("MONGODB_PORT_27017_TCP_ADDR") + ":" + os.Getenv("MONGODB_PORT_28017_TCP_PORT")
	}

	return MONGOCLIENTADDRESS
}

func initMongoSession(address string) *mgo.Session {
	session, err := mgo.Dial(MONGOCLIENTADDRESS)
	if err != nil {
		log.Errorf("Unable to dial mongo database: %s", err)
		os.Exit(1)
	}
	log.Infof("Connected to mongo database at: %s", address)
	return session
}

func init() {
	MONGOCLIENTADDRESS = setMongoAddress()
	MONGOSESSION = initMongoSession(MONGOCLIENTADDRESS)
}

// GetDate returns stringify date with the format YYYYMMDD
func GetDate(date time.Time) string {
	currentDate := strconv.Itoa(date.Year()) + strconv.Itoa(int(date.Month())) + strconv.Itoa(date.Day())
	return currentDate
}
