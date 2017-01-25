package healthgraphql

import (
	"github.com/MaximeHeckel/healthDashboard/go/src/server/apihandlers"
	"github.com/MaximeHeckel/healthDashboard/go/src/server/health"
	"github.com/graphql-go/graphql"
)

var sampleHealthType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Sample",
	Fields: graphql.Fields{
		"value": &graphql.Field{
			Type: graphql.Int,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				data := p.Source.(health.SampleStruct)
				return data.Value, nil
			},
		},
		"startDate": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				data := p.Source.(health.SampleStruct)
				return data.StartDate, nil
			},
		},
		"endDate": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				data := p.Source.(health.SampleStruct)
				return data.EndDate, nil
			},
		},
	},
})

var sampleHealthTypeString = graphql.NewObject(graphql.ObjectConfig{
	Name: "SampleString",
	Fields: graphql.Fields{
		"value": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// Type assertion
				data := p.Source.(health.SampleStructString)
				return data.Value, nil
			},
		},
		"startDate": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// Type assertion
				data := p.Source.(health.SampleStructString)
				return data.StartDate, nil
			},
		},
		"endDate": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// Type assertion
				data := p.Source.(health.SampleStructString)
				return data.EndDate, nil
			},
		},
	},
})

var sampleHealthTypeMinMax = graphql.NewObject(graphql.ObjectConfig{
	Name: "SampleMinMax",
	Fields: graphql.Fields{
		"min": &graphql.Field{
			Type: graphql.Float,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				data := p.Source.(health.MinMaxStruct)
				return data.Min, nil
			},
		},
		"max": &graphql.Field{
			Type: graphql.Float,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				data := p.Source.(health.MinMaxStruct)
				return data.Max, nil
			},
		},
	},
})

var listSampleHealthType = graphql.NewList(sampleHealthType)
var listSampleHealthTypeString = graphql.NewList(sampleHealthTypeString)

var queryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "HealthData",
	Fields: graphql.Fields{
		"CyclingDistance": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "CyclingDistance"), nil
			},
		},
		"HeartRate": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: listSampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "HeartRate"), nil
			},
		},
		"MinMaxHeartRate": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthTypeMinMax,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "MinMaxHeartRate"), nil
			},
		},
		"SleepAnalysis": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: listSampleHealthTypeString,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "SleepAnalysis"), nil
			},
		},
		"StepCount": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "StepCount"), nil
			},
		},
		"Weight": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "Weight"), nil
			},
		},
		"BodyFatPercentage": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "BodyFatPercentage"), nil
			},
		},
		"BMI": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "BMI"), nil
			},
		},
		"StepCountSamples": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: listSampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "StepCountSamples"), nil
			},
		},
		"WalkingRunningDistance": &graphql.Field{
			Args: graphql.FieldConfigArgument{
				"date": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Type: sampleHealthType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return apihandlers.GetEntryAtDate(p.Args["date"], "WalkingRunningDistance"), nil
			},
		},
	},
})

var schemaConfig = graphql.SchemaConfig{Query: queryType}

// Schema exported graphql schema
var Schema, _ = graphql.NewSchema(schemaConfig)
