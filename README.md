# Crud project

Crud tasks application built with Vue.js, Node.js, Express and Sequelize.

## Installation

1. Clone the repository.
2. Run `npm install` in both frontend and backend.
3. Create a `.env` file based on `.env.example`.
4. Create the database
   cd backend
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all

5. Start the frontend and backend.
   cd frontend ->npm run dev
   cd backend -> npm run dev

## Features

- Create, update and delete tasks
- Mark tasks as completed
- MySQL database, Sequelize
- REST API
