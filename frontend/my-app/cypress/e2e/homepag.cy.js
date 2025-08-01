// describe("React CRUD App", () => {
//   it("loads the homepage", () => {
//     cy.visit("http://localhost:3000");
//     cy.contains("Add User").should("exist"); // Change text based on your app
//   });
// });

describe("React CRUD App", () => {
  it("loads the homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("User Management").should("exist");
  });
});

// describe("Add User", () => {
//   it("should add a new user", () => {
//     cy.visit("http://localhost:3000");
//     cy.get('[data-testid ="name-input"]').type("John Doe");
//     cy.get('[data-testid ="email-input"]').type("john@gmail.com");
//     cy.get('[data-testid="submit-btn"]').click(); // If you're clicking the button by its test ID
//   });
// });

//Adding new User

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

// describe("view users", () => {
//   it("should view users", () => {
//     cy.visit("http://localhost:3000");
//     cy.get('[data-testid="view-user-btn-36"]').click(); // Adjust the selector based on your app
//     cy.get(".user-details").should("contain", "ID: 36"); // Adjust the class based on your app
//     cy.contains("User List").should("exist"); // Change text based on your app
//   });
// });

//View User details
describe("View User Details", () => {
  it("should display user details when view button is clicked", () => {
    cy.visit("http://localhost:3000");

    // Find any user and click their view button
    cy.get("tr").first().find("button").contains("View").click();

    // Check that details are displayed
    cy.get(".user-details").should("exist");
    cy.contains("button", "Close").click();
  });
});

// describe("Edit User", () => {
//   it("should edit a user", () => {
//     cy.visit("http://localhost:3000");

//     // Find the user to edit (for example, the one with name John Doe)
//     cy.contains("tr", "John Doe").within(() => {
//       // Click the edit button for this specific user
//       cy.get(".edit-button").click();
//     });

//     // Fill in the edit form
//     cy.get('[data-testid="name-input"]').clear().type("Janny Depp");
//     cy.get('[data-testid="email-input"]').clear().type("jenny@gmail.com");
//     cy.get('[data-testid="submit-btn"]').click(); // Submit the form
//     cy.contains("User updated successfully!").should("be.visible");
//     cy.contains("tr", "Janny Depp").should("exist");
//   });
// });

//Edit an User
describe("Edit User", () => {
  it("should edit a user", () => {
    cy.visit("http://localhost:3000");

    // First add a user to edit
    cy.get('[data-testid="name-input"]').type("Test User");
    cy.get('[data-testid="email-input"]').type("test@example.com");
    cy.get('[data-testid="submit-btn"]').click();

    // Find and click edit on that user
    cy.contains("tr", "Test User").find("button").contains("Edit").click();

    // Edit the user
    cy.get('[data-testid="name-input"]').clear().type("Updated User");
    cy.get('[data-testid="email-input"]').clear().type("updated@example.com");
    cy.get('[data-testid="submit-btn"]').click();

    // Verify update
    cy.contains("updated successfully").should("exist");
    cy.contains("Updated User").should("exist");
  });
});

// describe("Delete all John Doe in user list", () => {
//   it("should delete all the John Doe", () => {
//     cy.visit("http://localhost:3000");

//     cy.get("tr").each(($row) => {
//       if ($row.text().includes("Janny Depp")) {
//         cy.wrap($row).within(() => {
//           cy.contains("Delete").click();
//         });

//         cy.contains("button", "Delete").click(); // confirm inside modal

//         // Optional: wait for UI update
//         cy.wait(500);
//       }
//     });
//     //cy.contains("Janny Depp").should("not.exist");
//   });
// });

//Delete an User
describe("Delete User", () => {
  it("should delete a user", () => {
    cy.visit("http://localhost:3000");

    // First add a user to delete
    cy.get('[data-testid="name-input"]').type("Delete Me");
    cy.get('[data-testid="email-input"]').type("delete@example.com");
    cy.get('[data-testid="submit-btn"]').click();

    // Find and click delete on that user
    cy.contains("tr", "Delete Me").find("button").contains("Delete").click();

    // Confirm deletion
    cy.contains("button", "Delete").click();

    // Verify deletion
    cy.contains("successfully deleted").should("exist");
    cy.contains("Delete Me").should("not.exist");
  });
});
