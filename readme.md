# README #

### What is this repository for? ###

* Repository for the backend services for MediCare, part of the lecture "Software Engineering for Business Applications" of the Technical University of Munich
* Version 0.0.1

### How do I get set up? ###

* Summary of set up

The project has been configured to be used with docker containers. To start working you will need to clone the repository by using

```
git clone https://msalazar93@bitbucket.org/ss18sebateam52/seba-medicare-backend.git
```

Checkout the development branch

```
cd seba-medicare-backend
git checkout develop
```

Start the proyect

```
docker-compose up --build
```

This will start the project on your localhost on port 3000

* Configuration

First you need to install docker on your local machine, otherwise the previous command won't work

* Dependencies
 TBD
* Database configuration

The database of the project is configured as a separate container running a Mongo image. As an extra abstraction an additional container holding the volume information for the database has been configured in the docker-compose file of the project

To access the database, once the containers are running, execute:

docker exec -it mongo mongo

This will give you access to the database and execute queries

* How to run tests
 TBD
* Deployment instructions
 TBD