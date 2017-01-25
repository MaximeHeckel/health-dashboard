package apihandlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/MaximeHeckel/healthDashboard/go/src/server/auth"
	"github.com/MaximeHeckel/healthDashboard/go/src/server/health"
	"github.com/MaximeHeckel/healthDashboard/go/src/server/utils"
	log "github.com/Sirupsen/logrus"
	"gopkg.in/mgo.v2/bson"
	"gopkg.in/oleiade/reflections.v1"
)

type dailyData struct {
	ID   bson.ObjectId `bson:"_id,omitempty"`
	Date string        `json:"date"`
	Data health.Data   `json:"data"`
}

// CalcMinMaxDailyHeartRate returns the min and max heart rate recorded for a selected data entry
func calcMinMaxDailyHeartRate(data health.Data) health.MinMaxStruct {
	var result health.MinMaxStruct
	min := float64(0)
	max := float64(0)
	for _, entry := range data.HeartRate {
		if min == 0 || entry.Value < min {
			min = entry.Value
		}
		if entry.Value > max {
			max = entry.Value
		}
	}
	result.StartDate = data.HeartRate[0].StartDate
	result.Min = min
	result.Max = max
	return result
}

// IndexHandler function that handles the entrypoint of the react app
func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}

// NotFound 404 handler function
func NotFound(w http.ResponseWriter, r *http.Request) {
	http.Error(w, http.StatusText(http.StatusNotFound), http.StatusNotFound)
	return
}

// StatusHandler returns the status of the server
func StatusHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Status: OK")
}

// HealthHandler function that handles
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("--- RECEIVED HEALTH DATA FROM HEALTH PULSE ---")

	auth, httpErr := auth.CheckAuth(w, r)
	if !auth {
		http.Error(w, httpErr.Status, httpErr.StatusCode)
		return
	}

	var healthSample health.Data
	data, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Println(err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	err = json.Unmarshal(data, &healthSample)
	if err != nil {
		log.Errorf("Error while unmarshaling incoming health data: %s", err)
		log.Println(string(data))
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	c := utils.MONGOSESSION.DB("healthDB").C("healthData")
	var results []dailyData
	err = c.Find(bson.M{"date": healthSample.Date}).All(&results)

	if err != nil {
		log.Errorf("Error while finding health data entries: %s", err)
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	// Calculate Min and Max heart rate
	minMaxHR := calcMinMaxDailyHeartRate(healthSample)
	healthSample.MinMaxHeartRate = minMaxHR

	// If there is no entry for the current day create one with the current sample
	if len(results) == 0 {
		err = c.Insert(&dailyData{Date: healthSample.Date, Data: healthSample})
		if err != nil {
			log.Errorf("Error while inserting health data entries: %s", err)
			return
		}
		log.Infof("LOGGED ENTRY %s", healthSample.Date)
		return
	}

	// If there is an entry for the current day, update the entry with the current sample
	colQuerier := bson.M{"date": healthSample.Date}
	change := bson.M{"$set": bson.M{"date": healthSample.Date, "data": healthSample}}
	err = c.Update(colQuerier, change)
	if err != nil {
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}
	log.Infof("UPDATING ENTRY %s", healthSample.Date)
}

// GetData returns all health data of the current date
func GetData(w http.ResponseWriter, r *http.Request) {
	result := dailyData{}
	c := utils.MONGOSESSION.DB("healthDB").C("healthData")
	c.Find(bson.M{"date": utils.GetDate(time.Now())}).One(&result)
	b, _ := json.Marshal(result)
	fmt.Fprintf(w, string(b))
}

// GetEntryAtDate returns the data of a specific entry at a specific date
func GetEntryAtDate(date interface{}, entry string) interface{} {
	isRequestedFieldEntryValid := false
	result := dailyData{}

	c := utils.MONGOSESSION.DB("healthDB").C("healthData")
	c.Find(bson.M{"date": date}).One(&result)
	if entry != "" {
		availableFields, _ := reflections.Fields(result.Data)

		// Check if the requested field entry is available at the requested date
		for _, field := range availableFields {
			if entry == field {
				isRequestedFieldEntryValid = true
			}
		}

		if !isRequestedFieldEntryValid {
			return nil
		}

		requestedData, err := reflections.GetField(result.Data, entry)
		if err != nil {
			log.Errorf("%s", err)
		}
		return requestedData
	}
	return result
}
