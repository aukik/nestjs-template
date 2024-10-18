
# NestJS 10 API project template

[![License](https://img.shields.io/github/license/saluki/nestjs-template.svg)](https://github.com/saluki/nestjs-template/blob/master/LICENSE)

Scaffold quickly your next [NestJS 10](https://nestjs.com/) API project with
❤️ using this template

- Crafted for Docker environments (Dockerfile support and environment variables)
- REST API with [Prisma](https://www.prisma.io/) support
- Swagger documentation, [Joi](https://github.com/hapijs/joi) validation, Winston logger, ...
- Folder structure, code samples and best practices
- Fast HTTP server with [Fastify](https://fastify.dev/)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM
- A database such as PostgreSQL. You may use the provided `docker-compose.yml` file.

[Docker](https://www.docker.com/) may also be useful for advanced testing and image building, although it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation

``` sh
git clone https://github.com/saluki/nestjs-template my-project
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./my-project
npm install
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing the environment variables used for development.

```
cp .env.example .env
vi .env
```

For a standard development configuration, you can leave the default values for `API_PORT`, `API_PREFIX` and `API_CORS` under the `Api configuration` section. The `SWAGGER_ENABLE` rule allows you to control the Swagger documentation module for NestJS. Leave it to `1` when starting this example.

Next comes to the Prisma configuration: change the DATABASE_URL according to your own database setup.

Last but not least, define a `JWT_SECRET` to sign the JWT tokens or leave the default value in a development environment. Update the `JWT_ISSUER` to the correct value as set in the JWT.

### 1.3 Launch and discover

You are now ready to launch the NestJS application using the command below.

```sh
# For use in development environments only, performs a Prisma migration
npx prisma migrate dev

# Launch the development server with TSNode
npm run dev
```

You can now head to `http://localhost:3000/docs` and see your API Swagger docs. The example passenger API is located at the `http://localhost:3000/api/v1/passengers` endpoint.

For restricted routes, for testing you can use the below JWT

```
eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJERUZBVUxUX0lTU1VFUiIsImlhdCI6MTYzMTEwNDMzNCwicm9sZSI6InJlc3RyaWN0ZWQifQ.o2HcQBBpx-EJMcUFiqmAiD_jZ5J92gRDOyhybT9FakE
```

> The sample JWT above does not have an expiry, remember to use a valid JWT and enforce the required claims in production

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── modules
│   ├── app.module.ts
│   ├── common/  # The common module contains pipes, guards, service and provider used in the whole application
│   ├── passenger/  # A module example that manages "passenger" resources
│   │   ├── controller/
│   │   │   └── passenger.controller.ts
│   │   ├── flow/  # The "flow" directory contains the pipes, interceptors and everything that may change the request or response flow
│   │   │   └── passenger.pipe.ts
│   │   ├── model/
│   │   │   ├── passenger.data.ts  # The model that will be returned in the response
│   │   │   └── passenger.input.ts  # The model that is used in the request
│   │   ├── passenger.module.ts
│   │   ├── service/
│   │   │   └── passenger.service.ts
│   │   └── spec/
│   └── tokens.ts
└── server.ts
```

## 3. Default NPM commands

The NPM commands below are already included with this template and can be used to quickly run, build and test your project.

```sh
# Start the application using the transpiled NodeJS
npm run start

# Run the application using "ts-node"
npm run dev

# Transpile the TypeScript files
npm run build

# Run the project' functional tests
npm run test

# Lint the project files using TSLint
npm run lint
```

## 5. Healtcheck support

A healthcheck API is a REST endpoint that can be used to validate the status of the service along with its dependencies. The healthcheck API endpoint internally triggers an overall health check of the service. This can include database connection checks, system properties, disk availability and memory availability.

The example healthcheck endpoint can be request with the token located in the `HEALTH_TOKEN` environment variable.

```sh
curl -H 'Authorization: Bearer ThisMustBeChanged' http://localhost:3000/api/v1/health
```

## 6. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with NestJS.



# NestJS Application Structure Explanation

### Root Directory

- **prisma/**: Contains Prisma ORM related files
  - **schema.prisma**: Defines your data model and database schema
  - **migrations/**: Holds database migration files
    - **20240113113057_passengers_table/migration.sql**: A specific migration for creating the passengers table

- **src/**: The main source code directory
  - **server.ts**: The entry point of the application

### Modules
The application is organized into modules, which are the building blocks of a NestJS application:

- **App Module (src/modules/app.module.ts)**
  - The root module of the application
  - **tokens.ts**: Likely contains dependency injection tokens

- **Common Module (src/modules/common/)**
  - Contains shared functionality used across the application
  - **Components**:
    - **Controllers**: health.controller.ts for health checks
    - **Pipes**: joi-validation.pipe.ts for input validation
    - **Interceptors**: log.interceptor.ts for logging
  - **Providers**:
    - **config.provider.ts**: Configuration management
    - **logger.service.ts**: Logging service
    - **prisma.provider.ts**: Prisma database connection
  - **Security**:
    - Various guards for authentication and authorization
  - **Spec**: Contains unit tests

- **Passenger Module (src/modules/passenger/)**
  - Handles passenger-related functionality
  - **Components**:
    - **Controller**: passenger.controller.ts for handling HTTP requests
    - **Service**: passenger.service.ts for business logic
    - **Model**: Data transfer objects and input validation schemas
    - **Spec**: Contains unit tests for the passenger module

### Key Concepts

- **Modularity**: The application is divided into modules (Common and Passenger), promoting a clean and maintainable structure.
- **Dependency Injection**: NestJS uses a powerful DI system, evident in the providers and module structure.
- **Database Integration**: Prisma ORM is used for database operations and migrations.
- **Security**: Various guards are implemented for authentication and authorization.
- **Validation**: Input validation is handled using pipes (e.g., joi-validation.pipe.ts).
- **Testing**: The structure includes dedicated spec files for unit testing.
- **Configuration**: Environment-specific configuration is managed through the config provider.

This structure follows NestJS best practices, promoting scalability, maintainability, and separation of concerns in the application architecture.



# NestJS Common Module Components
## Controllers

### health.controller.ts

**Purpose:** Provides endpoints for health checks of the application.

**Functionality:**
- Typically exposes a `/health` endpoint.
- Returns the status of the application and its dependencies (e.g., database connection).

**Importance:** Essential for monitoring and ensuring the application is running correctly.

## Pipes

### joi-validation.pipe.ts

**Purpose:** Implements input validation using the Joi library.

**Functionality:**
- Validates incoming request data (body, query parameters, etc.) against predefined schemas.
- Throws exceptions for invalid data, preventing it from reaching the route handlers.

**Importance:** Ensures data integrity and security by validating input before processing.

## Interceptors

### log.interceptor.ts

**Purpose:** Implements logging functionality for requests and responses.

**Functionality:**
- Intercepts incoming requests and outgoing responses.
- Logs relevant information such as request method, URL, response status, and execution time.

**Importance:** Provides valuable insights for debugging, monitoring, and auditing.

## Providers

### config.provider.ts

**Purpose:** Manages application configuration.

**Functionality:**
- Loads and provides access to environment-specific configuration (e.g., from .env files).
- Often uses NestJS's ConfigModule for centralized configuration management.

**Importance:** Allows for easy configuration changes across different environments (development, production, etc.).

### logger.service.ts

**Purpose:** Provides a centralized logging service.

**Functionality:**
- Implements methods for different log levels (info, error, debug, etc.).
- May integrate with external logging services or format logs for better readability.

**Importance:** Ensures consistent logging across the application, aiding in troubleshooting and monitoring.

### prisma.provider.ts

**Purpose:** Manages the Prisma ORM database connection.

**Functionality:**
- Initializes and provides the Prisma client to other parts of the application.
- Handles database connection lifecycle (connect, disconnect).

**Importance:** Centralizes database connection management, ensuring efficient use of database resources.

## Security

### Various Guards

**Purpose:** Implement authentication and authorization mechanisms.

**Types might include:**
- **guest.guard.ts:** Allows access to public routes.
- **restricted.guard.ts:** Protects routes that require authentication.
- **health.guard.ts:** Specifically for protecting health check endpoints.

**Functionality:**
- Intercept requests and check for necessary credentials or permissions.
- Prevent unauthorized access to protected routes.

**Importance:** Critical for maintaining application security and controlling access to resources.

## Spec

### basic-unit-test.spec.ts

**Purpose:** Contains unit tests for the common module components.

**Functionality:**
- Tests individual units of code in isolation (e.g., functions, classes).
- Ensures that each component of the common module works as expected.

**Importance:** Maintains code quality, catches bugs early, and facilitates refactoring.

These components collectively provide a robust foundation for the application, handling cross-cutting concerns like configuration, logging, security, and data validation. They are designed to be reusable across different parts of the application, promoting consistency and reducing code duplication.
