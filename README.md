# Consolidated MAD Sales Portal

## Frontend Setup
- yarn install
- yarn start
  
## Backend Setup
- Create postgres database named as mad_sales_portal
- set corresponding settings in .env file for database connection and client URL etc.
- yarn install
- yarn migrate
- yarn seed
- yarn start

## Default admin user
kuldeep.saini@madelevator.com

## Frontend .env.local example
PORT=3001

REACT_APP_API_URL=http://localhost:8000/api

## Backend .env file example
NODE_ENV=development

PORT=8000


DB_HOST=localhost

DB_PORT=5432

DB_DATABASE=mad_sales_portal

DB_USERNAME=postgres

DB_PASSWORD=postgres


EMAIL_HOST = localhost

EMAIL_PORT = 1025

EMAIL_USERNAME = apikey

EMAIL_PASSWORD = apikey

EMAIL_USE_TLS = True


JWT_SECRET=jwt_secret


COOKIE_SECRET=cookie_secret


CLIENT_URL=http://localhost:3001


INVITATION_EXPIRES_IN=7


## Backend .env.example file example
NODE_ENV=

PORT=



DB_HOST=

DB_PORT=

DB_DATABASE=

DB_USERNAME=

DB_PASSWORD=


