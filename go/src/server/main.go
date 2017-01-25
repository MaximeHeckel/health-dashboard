package main //import "github.com/MaximeHeckel/healthDashboard/go/src/server"

import (
	"flag"
	"net/http"

	"github.com/MaximeHeckel/healthDashboard/go/src/server/apihandlers"
	"github.com/MaximeHeckel/healthDashboard/go/src/server/healthgraphql"
	"github.com/MaximeHeckel/healthDashboard/go/src/server/utils"
	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
	"github.com/graphql-go/handler"
	"github.com/rs/cors"
)

//https://elithrar.github.io/article/vue-react-ember-server-golang/

func main() {
	var entry string
	var static string
	var port string

	flag.StringVar(&entry, "entry", "./index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "static", ".", "the directory to serve static files from.")
	flag.StringVar(&port, "port", "8000", "the `port` to listen on.")
	flag.Parse()

	defer utils.MONGOSESSION.Close()

	h := handler.New(&handler.Config{
		Schema: &healthgraphql.Schema,
		Pretty: true,
	})

	r := mux.NewRouter()
	r.Path("/api/v1/status").HandlerFunc(apihandlers.StatusHandler)
	r.Path("/api/v1/healthhook").HandlerFunc(apihandlers.HealthHandler)
	r.Path("/api/v1/health/graphql").Handler(h)
	r.NotFoundHandler = http.HandlerFunc(apihandlers.NotFound)
	r.PathPrefix("/dist").Handler(http.FileServer(http.Dir(static)))
	r.PathPrefix("/").HandlerFunc(apihandlers.IndexHandler(entry))

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	handlers := c.Handler(r)
	log.Infof("Server started")
	http.ListenAndServe(":8000", handlers)
}
