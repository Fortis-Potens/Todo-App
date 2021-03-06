# Todo-App

[![fortispotens](https://circleci.com/gh/fortispotens/Todo-App.svg?style=svg)](https://app.circleci.com/pipelines/github/fortispotens/Todo-App)

<hr />
A simple Nodejs Todo RESTful API application

### Features

The features listed here are can be tested on Postman by passing the url endpoints to perform the following features:

```
- Goto Todo API Home page
- Create a new Todo
- Fetch all Todos
- Fetch a specific Todo
- Delete a specific Todo
- Update a specific Todo
```

### Technologies Used

- Nodejs: an open source server framework that allows you to run JavaScript on the server.
- Express: open source server-side framework for starting out Javascript server quickly on the fly.
- MongoDB Atlas: a cloud based NO-SQL database service.
- Heroku: a cloud based PaaS service for hosting web applications and RESTful API.

### Live URL

https://fortispotens.herokuapp.com/

### API endpoints

| HTTP VERB | ENDPOINT         | FUCTIONALITY                  |
| --------- | ---------------- | ----------------------------- |
| GET       | /                | Goto Todo API Home page       |
| POST      | api/v2/todos     | Create a new Todo             |
| GET       | api/v2/todos     | Fetch all Todos               |
| GET       | api/v2/todos/:id | Fetch a specific Todo         |
| DELETE    | api/v2/todos/:id | Delete a specific Todo        |
| PUT       | api/v2/todos/:id | Update a specific Todo        |
| POST      | api/v2/email     | Send email to an invited user |

The POST (Send email to an invited user) endpoint makes a call to a Message Queue service hosted on https://github.com/fortispotens/Email-Node-RabbitMQ
This service is built with RabbitMQ service (Amqplib) and AWS SES mail service.

Live URL: https://nodemq.herokuapp.com/

### How to clone the project:

To clone this repository:

```
- Ensure you have git and node.js installed.

- Run `git clone https://github.com/Fortis-Potens/Todo-App.git`.

- Run `npm install`.

- Run `npm run data:import` to seed data into the MongoDB database.

- Run `npm start` to start the server.

- Follow the [Todo API endpoints documentation!](https://fortispotens.herokuapp.com/) to test the Application.
```

### Author

| Name:  | Tobechukwu Obitube     |
| ------ | ---------------------- |
| Email: | fortispotens@gmail.com |
