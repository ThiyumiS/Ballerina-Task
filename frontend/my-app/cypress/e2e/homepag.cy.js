describe("React CRUD App", () => {
  it("loads the homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Welcome to Our Platform").should("exist");
  });
});

describe("User sign in page", () => {
  it("navigates to sign in page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign In").click();
    cy.contains("Sign In").should("exist");
  });
});

describe("Entering credentials to sign in", () => {
  it("should sign in with valid credentials", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign In").click();
    cy.get('[data-testid="email-input"]').type("john@gmail.com");
    cy.get('[data-testid="password-input"]').type("password");
    cy.get('[data-testid="submit-btn"]').click();
    cy.contains("User Management System").should("exist");
  });
});

describe("Entering details to create a new account", () => {
  it("should create a new account", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Create Account").click();
    cy.contains("Create Account").should("exist");
    cy.get('[data-testid="name-input"]').type("Peter Pan");
    cy.get('[data-testid="email-input"]').type("perter@gmail.com");
    cy.get('[data-testid="password-input"]').type("password");
    cy.get('[data-testid="submit-btn"]').click();

    cy.contains("Add User").click();
  });
});  

//   ################ Adding new User

describe("Add User", () => {
  it("should add a new user", () => {
    cy.visit("http://localhost:3000");

    // Make sure form is visible
    cy.get('[data-testid="name-input"]').should("be.visible");

    // Fill in the form
    cy.get('[data-testid="name-input"]').type("John Doe");
    cy.get('[data-testid="email-input"]').type("john@gmail.com");
    cy.get('[data-testid="submit-btn"]').click();

    // Check for success message
    cy.contains("successfully").should("be.visible");

    // Check that the user appears in the list
    cy.contains("tr", "John Doe").should("exist");
  });
});


///################ View User details##################
// describe("View User Details", () => {
//   it("should display user details when view button is clicked", () => {
//     cy.visit("http://localhost:3000");

//     // Find any user and click their view button
//     cy.get('[data-testid="view-user-btn-46"]').click();

//     // Check that details are displayed
//     cy.get(".user-details").should("exist");
//     cy.contains("button", "Close").click();
//   });
// });


////   ################   Edit an User
// describe("Edit User", () => {
//   it("should edit a user", () => {
//     cy.visit("http://localhost:3000");

//     const uniqueName= "Test user"+Date.now();
//     cy.get('[data-testid="name-input"]').type(uniqueName);
//     cy.get('[data-testid="email-input"]').type("test@example.come");
//     cy.get('[data-testid="submit-btn"]').click();
//     cy.contains("successfully").should("be.visible");

//     cy.contains("tr",uniqueName).should("exist");

//     cy.contains("tr",uniqueName).within(()=>{
//       cy.get('[data-testid="edit-user-btn"]').click();
//     });
//     // Wait for edit form to be fully visible
//     cy.get('[data-testid="name-input"]').should('be.visible');

//     // Fill in the edit form
//     cy.get(".fixed.inset-0").within(() => {
//     cy.get('[data-testid="name-input"]').clear().type("Updated Name");
//     cy.get('[data-testid="email-input"]').clear().type("updated@example.com");
//     cy.get('[data-testid="submit-btn"]').click(); // Submit the form
//     });

//     cy.contains("tr", "Updated Name").should("exist");
//   });
// });


// describe("Delete all John Doe in user list", () => {
//   it("should delete all the John Doe", () => {
//     cy.visit("http://localhost:3000");

    // cy.get("tr").each(($row) => {
    //   if ($row.text().includes("Janny Depp")) {
    //     cy.wrap($row).within(() => {
    //       cy.contains("Delete").click();
    //     });

    //     cy.contains("button", "Delete").click(); // confirm inside modal

    //     // Optional: wait for UI update
    //     cy.wait(500);
    //   }
    // });
//     //cy.contains("Janny Depp").should("not.exist");
//   });
// });

/////   ################ Delete an User
// describe("Delete User", () => {
//   it("should delete a user", () => {
//     cy.visit("http://localhost:3000");

//     // First add a user to delete
//     cy.get('[data-testid="name-input"]').type("Delete Me");
//     cy.get('[data-testid="email-input"]').type("delete@example.com");
//     cy.get('[data-testid="submit-btn"]').click();

//     // // Find and click delete on that user
//     // cy.contains("tr", "Delete Me").find("button").contains("Delete").click();

//     // // Confirm deletion
//     // cy.get('[data-testid="delete-user-btn"]').click();

//     cy.get("tr").each(($row) => {
//       if ($row.text().includes("Delete Me")) {
//         cy.wrap($row).within(() => {
//           cy.contains("Delete").click();
//         });

//         cy.contains("button", "Delete").click(); // confirm inside modal

//         // Optional: wait for UI update
//         cy.wait(500);
//       }
//     }); 
      


//     // Verify deletion
//     cy.contains("Delete Me").should("not.exist");
//   });
// });
