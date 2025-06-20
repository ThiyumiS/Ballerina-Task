import ballerina/sql;

// Define the function to fetch user from the database.
public isolated function getUsers() returns User[]|sql:Error {

    // Execute the query and return a stream of User records.
    stream<User, sql:Error?> resultStream = dbClient->query(getUsersQuery());
    
    // Check if the result is a stream of user records.
    if resultStream is stream<User> {
        return from User user in resultStream
            select user;
    }
    
    // If there is an error, return an error msg.
    return error("Error when fetching the user");

}

public  isolated function getUser(int userId) returns User|sql:Error {
    // Execute the query to fetch a single user by ID.
    User|sql:Error result = dbClient->queryRow(getUserQuery(userId));

    // If the result is an error, return it.
    if result is sql:Error {
        return result;
    }

    // If the result is a User, return it.
    return result;
}


public isolated function insertUser(UserCreate payload) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(insertUserQuery(payload));
}


public isolated function deleteUser(int userId) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(deleteUserQuery(userId));
}

public isolated function updateUser(int userId, UserUpdate payload) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(updateUserQuery(userId, payload));
}



