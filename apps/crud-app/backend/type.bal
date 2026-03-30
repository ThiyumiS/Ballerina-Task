public type User record {
    # User ID
    readonly int id;

    # User name
    string name;

    # User email
    string email;
};

// public  type ErrorDetails record {|
//     #Error message
//     string message;
//     #Error Details
//     string Details;

// |};


// public type UserNotFound record {|
//     *http:NotFound;
//     ErrorDetails body;  
// |}

