# EzShop

EzShop is a demo microservices-based e-commerce platform composed of several Spring Boot backend services and React frontends. The repository contains independent modules for product, cart, offers, orders, payment, user management, a gateway, and a service registry plus two Vite + React frontend apps.

This README gives a quick project overview, tech stack, how to run services locally, and pointers for contribution.

## Table of Contents

- Project overview
- Architecture
- Services (backend)
- Frontends
- Prerequisites
- Quick start (local)
- Running individual modules
- Tests
- Contributing
- License


## Project overview

Root folders:

- `ezShop-backend/` — multiple Spring Boot microservices (each under its own folder, e.g. `product-ms`, `cart-ms`, `offers-ms`, `order-ms`, `payment-ms`, `user-ms`, `shop-gateway`, `shop-registry`).
- `ezShop-frontend/` — frontend apps built with React + Vite. Notable subfolders: `ecom-frontend/` (main storefront). A separate `user-frontend/` exists for user-facing flows.


## Architecture

- Microservices: each backend module is a standalone Spring Boot application (Java 17). Services use Spring Cloud components (Eureka for service discovery, Gateway for routing, WebFlux for reactive clients where applicable).
- Data: modules expect a relational DB (PostgreSQL appears referenced in some modules). Each service uses Spring Data JPA where persistence is required.
- Frontend: built with React + Vite and Tailwind/Bootstrap. Communication is via REST to the gateway which proxies to backend services.


## Services (backend)

Typical backend folders you will find inside `ezShop-backend/`:

- `product-ms`
- `cart-ms`
- `offers-ms`
- `order-ms`
- `payment-ms`
- `user-ms`
- `shop-gateway` (Spring Cloud Gateway)
- `shop-registry` (Eureka server)

Each service is a Maven project with a `pom.xml` and includes a Maven wrapper (`mvnw`) so you can build/run without a local Maven installation.


## Frontends

- `ezShop-frontend/ecom-frontend` — React+Vite storefront. Uses dependencies such as React, React Router, Tailwind, Bootstrap, and Vite. Scripts available in `package.json` include `dev`, `build`, `preview`, and `lint`.
- `user-frontend` — another React+Vite frontend (similar stack) (if present).


## Prerequisites

- Java 17 (required by Spring Boot applications)
- Node.js 18+ and npm/yarn (for frontend)
- Docker & Docker Compose (optional, recommended for running DBs and multiple services locally)
- (Optional) PostgreSQL if you want to run services directly against a DB instead of Docker


## Quick start (local)

This project is modular — you can run services individually. A common local dev workflow:

1. Start the service registry (Eureka):

	- Open a terminal in `ezShop-backend/shop-registry`
	- Run the Maven wrapper:

```
./mvnw spring-boot:run
```

2. Start the gateway:

```
cd ezShop-backend/shop-gateway
./mvnw spring-boot:run
```

3. Start required backend services (for example product, cart, payment):

```
cd ezShop-backend/product-ms
./mvnw spring-boot:run
```

Repeat for `cart-ms`, `offers-ms`, `order-ms`, `payment-ms`, `user-ms` as needed. Services should register with the registry and be reachable through the gateway.

4. Start the frontend (storefront):

```
cd ezShop-frontend/ecom-frontend
npm install
npm run dev
```

Open the Vite dev URL (usually http://localhost:5173) and use the app. The frontend will make API calls to the gateway.


## Running individual modules (notes)

- Use the included Maven wrapper (`mvnw`) in each backend module to build or run the service.
- To build a jar for a module:

```
./mvnw clean package -DskipTests
```

- To run tests for a module:

```
./mvnw test
```


## Tests

- Backend modules include unit tests under `src/test/java`. Run them with `./mvnw test` inside the module folder.
- Frontend linting is available via `npm run lint` in the frontend folders.


## Contributing

1. Open an issue describing the bug or feature.
2. Create a git branch for your work.
3. Add tests for new behavior where applicable.
4. Submit a pull request and reference the issue.


## Next steps and suggestions

- Add a `docker-compose.yml` to orchestrate the registry, gateway, database, and a few services for easier local setup.
- Document each module's default ports and configuration properties (e.g., `application.properties` keys) to simplify local runs.
- Add a top-level `Makefile` or npm script to boot the common local developer flow.


## License

Add your project license here (e.g. MIT) if this repo is public.


---