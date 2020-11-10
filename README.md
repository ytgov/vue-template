# YG vue-template
A template to for Vuejs based web apps for internal services.  

## Development from this template

The intent of this template is to evolve over time, so projects should fork this code into a new repository. That will allow the project files to evolve over time and be able to update the child repositories.

Before starting the API server, you need to create the appropriate .env file which can be done by running `cp src/api/.env src/api/.env.development`. You must then set the appropriate values

To develop within this environment, you must have Node.js and NPM installed on your development machine. Open two terminal windows and open one to `/src/api` and `src/web` respectively. Both the API back-end and the web front-end can be started with: `npm run start:dev`.

Once both are running, open your browser and navigate to http://localhost:8080 to view the application.

## Understanding the environment variables

Environment variables should never be checked into the repository! 

- API_PORT=(the port the API will be listening on (doesn't have to match the docker port))
- FRONTEND_URL=(the url of the service, from browser)
- AUTH_REDIRECT=(FRONTEND_URL from above)/login-complete
- VIVVO_CLIENT_ID=(the client id provided for the service)
- VIVVO_CLIENT_SECRET=(the client secret provided for the service)
- VIVVO_CALLBACK_URL=(the fully qualified url of the API, must match setup in Vivvo)/authorization-code/callback

## Building the container image
docker build -t vue-template .

## Running the container in test or production

By default, the container will run in development mode, but following the step above, you can create the appropriate environment files for the instance you are targetting. Depending, the application will look for either `src/api/.env.test` or `src/api/.env.production`. To tell the API which instance to use, add the environment variable `NODE_ENV` to the docker run command like below.

`docker run -p 8222:3000 -e NODE_ENV=production --restart=on-failure vue-template`