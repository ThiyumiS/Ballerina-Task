import ballerina/sql;

public type DatabaseConfig record {|
    # User of the database
    string user;
    # Password of the database
    string password;
    # Name of the database
    string database;
    # Host of the database
    string host;
    # Port
    int port;
|};

# User record type.
public type User record {|

    # User ID
    @sql:Column {name: "id"}
    readonly int id;

    # User name
    @sql:Column {name: "name"}
    string name;

    # User email
    @sql:Column {name: "email"}
    string email;

      
|};

# User create record type.
public type UserCreate record {|
  
    # User name
    string name;

    # User email
    string email;
   
|};


#  User update record type.
public type UserUpdate record {|
    #  User name
    string? name = ();
    #  User email
    string? email = ();
   
|};
