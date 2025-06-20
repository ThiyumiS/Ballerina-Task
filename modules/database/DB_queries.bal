import ballerina/sql;

isolated function getUsersQuery() returns sql:ParameterizedQuery => `
    SELECT 
        id,
        name,
        email
    FROM 
        Users;
`;

isolated function insertUserQuery(UserCreate payload) returns sql:ParameterizedQuery => `
    INSERT INTO  Users
        (
            name,
            email
        )
    VALUES
        (
            ${payload.name},
            ${payload.email}
        )
`;

isolated function deleteUserQuery(int userId) returns sql:ParameterizedQuery => `
    DELETE FROM Users WHERE id = ${userId}
`;

isolated function updateUserQuery(int userId, UserUpdate payload) returns sql:ParameterizedQuery =>`
    UPDATE Users
        SET 
            name= COALESCE(${payload.name}, name),
            email = COALESCE(${payload.email}, email)

        WHERE id = ${userId}
`;