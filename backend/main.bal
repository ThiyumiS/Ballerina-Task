// sort the imports.
import ballerina_task.database;

import ballerina/http;
import ballerina/sql;

//Create a CORS config(connected the frontend with the backend).
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowHeaders: ["Content-Type"],
        allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
}

service / on new http:Listener(8080) {

    resource function get .() returns string {
        return "Welcome to Ballerina CRUD application!!!";
    }

    // Resource function to get all users
    resource function get users() returns database:User[]|http:InternalServerError {
        // Call the getUsers function to fetch data from the database.
        database:User[]|error response = database:getUsers();

        // If there's an error while fetching, return an internal server error.
        if response is error {
            return <http:InternalServerError>{
                body: "Error while retrieving users"
            };
        }

        // Return the response containing the list of Users.
        return response;
    }

    resource function get users/[int id]() returns database:User|http:InternalServerError {
        // Call the getUser function to fetch data from the database.
        database:User|error response = database:getUser(id);

        // If there's an error while fetching, return an internal server error.
        if response is error {
            return <http:InternalServerError>{
                body: string `Error while retrieving user with id ${id}`
            };
        }

        // Return the response containing the User.
        return response;

    }

    resource function get searchUsers/[string name]() returns database:User[]|http:InternalServerError {
        // Call the getUsers function to fetch data from the database.
        database:User[]|error response = database:getUsers();

        // If there's an error while fetching, return an internal server error.
        if response is error {
            return <http:InternalServerError>{
                body: "Error while retrieving users"
            };
        }

        // Filter the users based on the name.
        database:User[] filteredUsers = from database:User user in response
            where user.name == name
            select user;

        // Return the filtered users.
        return filteredUsers;

    }

    resource function post newUsers(database:UserCreate User) returns json|http:InternalServerError {
        sql:ExecutionResult|sql:Error response = database:insertUser(User);
        if response is error {
            return <http:InternalServerError>{
                // body: "Error while inserting an User"

                body: {
                    "success": false,
                    "message": "Error while inserting an User"
                }
            };

        }

        // Extract the generated ID from the response
        int|string generatedId = 0;
        if (response is sql:ExecutionResult) {
            anydata|error lastInsertId = response.lastInsertId;
            if (lastInsertId is int) {
                generatedId = lastInsertId;
            } else if (lastInsertId is string) {
                generatedId = lastInsertId;
            }
        }

        // Return JSON response with success status, message and the created user
        return {
            "success": true,
            "message": "User created successfully",
            "user": {
                "id": generatedId,
                "name": User.name,
                "email": User.email
            }
        };

    }

    resource function delete delUsers/[int id]() returns json|http:InternalServerError {
        sql:ExecutionResult|sql:Error response = database:deleteUser(id);

        if response is error {
            return <http:InternalServerError>{
                body: {
                    "success": false,
                    "message": "Error while deleting user"
                }
            };
        }

        // Return JSON response with success status and message
        return {
            "success": true,
            "message": string `User with id ${id} was successfully deleted`
        };

    }

    resource function patch updateUser/[int id](database:UserUpdate User) returns json|http:InternalServerError {
        sql:ExecutionResult|sql:Error response = database:updateUser(id, User);

        if response is error {
            return <http:InternalServerError>{
                body: {
                    "success": false,
                    "message": string `Error while updating user with id ${id}`
                }
            };
        }

        // Return JSON response with success status and message
        return {
            "success": true,
            "message": string `User with id ${id} was successfully updated`,
            "updatedUser": {
                "id": id,
                "name": User.name,
                "email": User.email
            }
        };

    }

}

