📋Ballerina CRUD Operations – User Management API

This project is a simple RESTful API built using Ballerina that performs basic CRUD (Create, Read, Update, Delete) operations on a list of users.

🚀 Features

Get all users

Get user by ID

Search users by name

Update user

Delete user


📦 Technologies Used

Ballerina (Swan Lake version)

HTTP Module

In-memory data storage (can be extended to SQL or NoSQL databases)

📡 API Endpoints

Method

Endpoint

Description

GET

/users

Get all users

GET

/users/{id}

Get user by ID

GET

/users/search?q=

Search users by name

PUT

/users/{id}

Update a user

DELETE

/users/{id}

Delete a user

🔧 How to Run

Make sure Ballerina is installed. Install Ballerina

Clone or download this repository.

Navigate to the project directory.

Run the project:

bal run




📌 Notes

This is a basic example for learning purposes.

You can enhance it by connecting to a real SQL database and adding input validation.

👨‍💼 Author

Your Nameyour.email@example.comLinkedIn | GitHub

