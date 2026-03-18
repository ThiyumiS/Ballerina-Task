import ballerina/sql;


# function to get the all users from database.
# 
# + return - return value description
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

# function to get user by their name from database.
#
# + name - parameter description
# + return - return value description
public isolated function getUsersByName(string name) returns User[]|sql:Error {
    // Execute the query to fetch users by name.
    stream<User, sql:Error?> resultStream = dbClient->query(getUsersByNameQuery(name));

    // Check if the result is a stream of user records.
    if resultStream is stream<User> {
        return from User user in resultStream
            select user;
    }

    // If there is an error, return an error msg.
    return error("Error when fetching the user by name");
}

# function to get the user by Id from database.
#
# + userId - parameter description
# + return - return value description
public  isolated function getUser(int userId) returns User|sql:Error {
    // Execute the query to fetch a single user by ID.
    User|sql:Error result = dbClient->queryRow(getUserQuery(userId));

    if result is sql:Error {
        return result;
    }

    return result;
}


# function to insert a new user from database.
#
# + payload - parameter description
# + return - return value description
public isolated function insertUser(UserCreate payload) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(insertUserQuery(payload));
}


# function for delete user from database.
#
# + userId - parameter description
# + return - return value description
public isolated function deleteUser(int userId) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(deleteUserQuery(userId));
}

# function for update/edit user from database.
#
# + userId - parameter description  
# + payload - parameter description
# + return - return value description
public isolated function updateUser(int userId, UserUpdate payload) returns sql:ExecutionResult|sql:Error {
    return dbClient->execute(updateUserQuery(userId, payload));
}



