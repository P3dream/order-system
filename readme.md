# Microservices Project with Docker, RabbitMQ, and PostgreSQL

This project demonstrates a microservices architecture using Docker, RabbitMQ, and PostgreSQL. It is designed with scalability, asynchronous communication, and development best practices in mind.

## Environment Variables

Add the following environment variables to all microservices (e.g., in separate `.env` files for each service):

    DATABASE_HOST=postgres
    DATABASE_PORT=5432
    DATABASE_NAME=orders
    DATABASE_USER=postgres
    DATABASE_PASS=postgres

    RABBITMQ_URI=amqp://rabbit:rabbit@rabbitmq:5672
    RABBITMQ_QUEUE=orders_queue

Ensure that the service names in `docker-compose.yml` match those used in the variables (`postgres`, `rabbitmq`).

## How to Run the Project

Make sure Docker and Docker Compose are installed on your machine.

### 1. Start the Services

Run the following command from the root of the project:

    docker compose up -d --build

This command builds the images and starts the containers in detached mode.

## Flowchart Description

The flowchart included in the file `fluxogram.png` illustrates the communication flow between microservices, the PostgreSQL database, and the RabbitMQ messaging system. It shows how data is processed and exchanged between system components, highlighting integration points and service responsibilities.

![Order Process Flowchart](./fluxogram.png)

## Technologies Used

- Docker & Docker Compose
- RabbitMQ for messaging
- PostgreSQL as the database
- Frameworks such as NestJS (depending on the service)

## Project Structure

The structure may vary depending on the services, but generally follows this pattern:

    /project-root
      /service-orders
        .env
        Dockerfile
        ...
      /service-payments
        .env
        Dockerfile
        ...
      docker-compose.yml

## Contact

If you have any questions or suggestions, feel free to open an issue or get in touch.
