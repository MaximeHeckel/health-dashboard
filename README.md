# Health Dashboard

This repository contains all the source code of my personal health dashboard (see [https://health.maximeheckel.com](https://health.maximeheckel.com))
I built this in order to provide a web interface for my healthkit data.


## Tech stack

This project relies on:

- React for the frontend
- GraphQL as query language to contact the API
- Golang for the server side (both API and server)
- MongoDB for data storage

## Installation

### Running the project
The easiest way to get the project working in production mode is through [Docker](https://github.com/docker/docker) and [docker-compose](https://github.com/docker/compose).
This project contains the Dockerfile necessary to build the project

Note: Docker 17.05 at least is required to build this project as it uses multi-stage builds (see [https://docs.docker.com/engine/userguide/eng-image/multistage-build/](https://docs.docker.com/engine/userguide/eng-image/multistage-build/))

To run the project in production mode:

```
docker-compose up
```

This will download the required docker images and build the health dashboard docker image, spin them up, and link them under the same network.

The UI should then be accessible under
[http://yourhostname:8000]()

### Pushing and accessing data

The backend accepts new data against [http://yourhostname:8000/api/v1/healthhook]()
Here's an example payload:

```
{
	"date":"20170224",
	"heartRate":
		[{
			"value":72,
			"startDate":"2017-02-24T18:58:26.947-0800",
			"endDate":"2017-02-24T18:58:26.947-0800"
		},
		...
		],
	"stepCountSamples":
		[{
			"value":34,
			"startDate":"2017-02-24T18:58:26.947-0800",
			"endDate":"2017-02-24T18:58:26.947-0800"
		},
		...
		],
	"sleepAnalysis":
		[{
			"value":"INBED",
			"startDate":"2017-02-24T18:58:26.947-0800",
			"endDate":"2017-02-24T18:58:26.947-0800"
		},
		...
		],
	"stepCount": {
		"value": 1000,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	},
	"cyclineDistance": {
		"value": 1000,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	},
	"walkinRunningDistance": {
		"value": 1000,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	},
	"weight": {
		"value": 7000,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	},
	"bodyfatpercentage": {
		"value": 12,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	},
	"bmi": {
		"value": 22,
		"startDate":"2017-02-24T18:58:26.947-0800",
		"endDate":"2017-02-24T18:58:26.947-0800"
	}
}

```

The data can be then accessed with a GraphQL client against: [http://yourhostname:8000/api/v1/health/graphql]()


Note: If you want to require authentication on the [http://yourhostname:8000/api/v1/healthhook]() endpoint you can add to the following environment variables:
`USER` and `PASS`. You'll then need to include an `Authorization` header to any POST request against this endpoint:

`Authorization: Basic USER:PASS` where `USER:PASS` is in base64.

## Contributing

If you want to contribute to the development of this project here's how you can run it in development mode:

### Without Docker and Compose
1. You'll need at least node 7 and Golang 1.7 installed on your machine. 
2. Pull the project in your GOPATH
3. Export the following envvars to target the host and port of your MongoDB instance: `MONGODB_PORT_27017_TCP_ADDR` and `MONGODB_PORT_28017_TCP_PORT`
4. Run `yarn`
5. Run `yarn start`. This will start the Golang server under [http://localhost:8000]() and the Webpack dev server for the frontend under [http://localhost:3000]().

### With Docker and Compose
1. You'll need at least Docker 17.05
2. Run `docker-compose -f docker-compose.dev.yml up --build --force-recreate`. This will start the Golang server under [http://localhost:8000]() and the Webpack dev server for the frontend under [http://localhost:3000]() in a container as well as the mongo container linked to the previous one.

Every change in the frontend code is hot reloaded.
For backend changes you will need to manually restart the Go server.

Note: The Golang part of the project uses [govendor](https://github.com/kardianos/govendor) in order to manage dependencies

