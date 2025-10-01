import {Loging} from "./logging page/loging"

const loging = new Loging();

describe("User sign in page", () => {
  it("navigates to sign in page", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Sign In").click();
    cy.contains("Sign In").should("exist");
  });
});

describe("Create new account", () => {
  it("Creating a new account", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Create Account").click();
    cy.contains("Create Account").should("exist");
    cy.get('[data-testid="name-input"]').type("Test 01");
    cy.get('[data-testid="email-input"]').type("test@gmail.com");
    cy.get('[data-testid="password-input"]').type("password");
    cy.get('[data-testid="submit-btn"]').click();

  });
});  

describe("Logging into the web app", () => {
  it("Logging process", () => {
    loging.userLogging("test@gmail.com", "password1234");
  });
});