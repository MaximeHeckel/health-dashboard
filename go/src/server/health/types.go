package health

// SampleStruct data struct containing a float as value from startDate to endDate
type SampleStruct struct {
	Value     float64 `json:"value"`
	StartDate string  `json:"startDate"`
	EndDate   string  `json:"endDate"`
}

// SampleStructString data struct containing a string as value from startDate to endDate
type SampleStructString struct {
	Value     string `json:"value"`
	StartDate string `json:"startDate"`
	EndDate   string `json:"endDate"`
}

// MinMaxStruct data struct containing a min and max float
type MinMaxStruct struct {
	Min       float64
	Max       float64
	StartDate string
}

// Data incoming data struct from healthPulse
type Data struct {
	CyclingDistance        SampleStruct   `json:"cyclingDistance"`
	HeartRate              []SampleStruct `json:"heartRate"`
	MinMaxHeartRate        MinMaxStruct
	SleepAnalysis          []SampleStructString `json:"sleepAnalysis"`
	StepCount              SampleStruct         `json:"stepCount"`
	StepCountSamples       []SampleStruct       `json:"stepCountSample"`
	WalkingRunningDistance SampleStruct         `json:"walkingRunningDistance"`
	Weight                 SampleStruct         `json:"weight"`
	BodyFatPercentage      SampleStruct         `json:"bodyfatpercentage"`
	BMI                    SampleStruct         `json:"bmi"`
	Date                   string               `json:"date"`
}
