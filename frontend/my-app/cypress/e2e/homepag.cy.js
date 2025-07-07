describe("React CRUD App", () => {
  it("loads the homepage", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Add User").should("exist"); // Change text based on your app
  });
});
