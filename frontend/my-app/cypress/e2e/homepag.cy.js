describe("React CRUD App", () => {
  it("loads the homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Add User").should("exist"); // Change text based on your app
  });
});

describe("Add User", () => {
  it("should add a new user", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid ="name-input"]').type("John Doe");
    cy.get('[data-testid ="email-input"]').type("john@gmail.com");
    cy.get('[data-testid="submit-btn"]').click(); // If you're clicking the button by its test ID
  });
});

describe("view users", () => {
  it("should view users", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="view-user-btn-36"]').click(); // Adjust the selector based on your app
    cy.get(".user-details").should("contain", "ID: 36"); // Adjust the class based on your app
    cy.contains("User List").should("exist"); // Change text based on your app
  });
});

describe("Edit User", () => {
  it("should edit a user", () => {
    cy.visit("http://localhost:3000");

    // Find the user to edit (for example, the one with name John Doe)
    cy.contains("tr", "John Doe").within(() => {
      // Click the edit button for this specific user
      cy.get(".edit-button").click();
    });

    // Fill in the edit form
    cy.get('[data-testid="name-input"]').clear().type("Janny Depp");
    cy.get('[data-testid="email-input"]').clear().type("jenny@gmail.com");
    cy.get('[data-testid="submit-btn"]').click(); // Submit the form
    cy.contains("User updated successfully!").should("be.visible");
    cy.contains("tr", "Janny Depp").should("exist");
  });
});

describe("Delete all John Doe in user list", () => {
  it("should delete all the John Doe", () => {
    cy.visit("http://localhost:3000");

    cy.get("tr").each(($row) => {
      if ($row.text().includes("Janny Depp")) {
        cy.wrap($row).within(() => {
          cy.contains("Delete").click();
        });

        cy.contains("button", "Delete").click(); // confirm inside modal

        // Optional: wait for UI update
        cy.wait(500);
      }
    });
    //cy.contains("Janny Depp").should("not.exist");
  });
});
