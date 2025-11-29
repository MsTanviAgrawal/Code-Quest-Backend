# Code Quest Backend

This repository contains the backend for the **Code Quest** project. It is built to handle user data, authentication, quiz logic, and API communication for the Code Quest application. The backend ensures smooth and secure interactions between the client and the server.

## Overview

The Code Quest backend provides all essential server-side functionality such as:

* User authentication and authorization
* Managing quiz questions and answers
* Handling API requests from the frontend
* Storing data securely in MongoDB

The goal of this backend is to be clean, reliable, and easy to maintain.

## Features

* User signup and login
* Secure password handling
* RESTful API endpoints
* Quiz data management
* MongoDB database integration
* Error handling & validations

## Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB / Mongoose**
* **JWT** for authentication (if used)


## Running the Project Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/MsTanviAgrawal/Code-Quest-Backend.git
   ```
2. Navigate into the project folder:

   ```bash
   cd Code-Quest-Backend
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Create a `.env` file with required environment variables:

   ```env
   MONGO_URI=your_mongodb_url
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
5. Start the server:

   ```bash
   npm start
   ```
6. The backend will run on:
   **[http://localhost:5000](http://localhost:5000)**

## Folder Structure

* **/routes** – API routes
* **/controllers** – Logic for each route
* **/models** – MongoDB schemas
* **/middleware** – Auth & validations
* **server.js** – Entry point

## Contact

If you have suggestions, feedback, or want to collaborate, feel free to connect!

Thank you for checking out the Code Quest Backend!
