import ballerina_crud_application.database;
import ballerina/http;
import ballerina/sql;

service / on new http:Listener(8080) {


        resource function get .() returns string {
        return "Welcome to Ballerina CRUD application!!!";
    }
    
    // Resource function to get all  users.
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

    resource function get searchUsers/[string name]()  returns database:User[]|http:InternalServerError {
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

       
        return filteredUsers;
        
    }

    // Resource function to create a new user.
      resource function post newUsers( database:UserCreate User) returns http:Created|http:InternalServerError {
        sql:ExecutionResult|sql:Error response = database:insertUser(User);
        if response is error {
            return <http:InternalServerError>{
                body: "Error while inserting an User"
            };
        }
        return http:CREATED;
    }


    // Resource function to delete a user by ID.
    resource function delete delUsers/[int id]() returns http:NoContent|http:InternalServerError {
        sql:ExecutionResult|sql:Error response = database:deleteUser(id);

        if response is error {
            return <http:InternalServerError>{
                body: "Error while deleting book"
            };
        }

        return http:NO_CONTENT;

    }
    


    // Resource function to update a user by ID.
    resource function patch updateUser/[int id](database:UserUpdate User) returns http:NoContent|http:InternalServerError  {
        sql:ExecutionResult|sql:Error response = database:updateUser(id, User);

        if response is error {
            return <http:InternalServerError>{
                body: string `Error while updating user with id ${id}` 
            };
        }

        return  http:NO_CONTENT;

    }

}

