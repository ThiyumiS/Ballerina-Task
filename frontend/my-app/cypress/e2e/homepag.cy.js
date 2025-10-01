import { AddingUser } from "./logging page/addingUser";
import {Loging} from "./logging page/loging"

const loging = new Loging();
const addingUserPOM = new AddingUser();

  it("Adding a new user", () => {
      addingUserPOM.logingAndGoToAddUserPage("Test user 4", "test123");
      addingUserPOM.addUser("nethuli", "nethuli@example.com");
  
  });

  it("Loging as Thiyumi - Viewing user details", () => {

    loging.userLogging("Thiyumi", "thiyu123");

    cy.get('[data-testid="view-user-btn-232"]').click();

    cy.get(".user-details").should("exist");
    cy.contains("button", "Close").click();

  });

  it(" loging as Test user 1 - Edit a user called 'Test user'", () => {
    
    addingUserPOM.logingAndGoToAddUserPage("Test user 1", "test123");

    addingUserPOM.addUser("Test user", "test@example.com");
    cy.contains("successfully").should("be.visible");

  
    cy.get(':nth-child(1) > .space-x-2 > [data-testid="edit-user-btn"]').click();
    cy.get('.flex > .border').click();
    cy.get(':nth-child(1) > .space-x-2 > [data-testid="edit-user-btn"]').should('be.enabled');
    cy.get(':nth-child(1) > .space-x-2 > [data-testid="edit-user-btn"]').click();
    cy.get('.max-w-xl > form > :nth-child(2) > [data-testid="name-input"]').click();
    cy.get('.max-w-xl > form > :nth-child(2) > [data-testid="name-input"]').clear('Updated new user\\');
    cy.get('.max-w-xl > form > :nth-child(2) > [data-testid="name-input"]').type('Updated new user');
    cy.get('.max-w-xl > form > .mb-6 > [data-testid="email-input"]').click();
    cy.get('.max-w-xl > form > .mb-6 > [data-testid="email-input"]').clear('updated@example.com');
    cy.get('.max-w-xl > form > .mb-6 > [data-testid="email-input"]').type('Newupdated@example.com');
    cy.get('.max-w-xl > form > .flex > [data-testid="submit-btn"]').click();
 
  });

  it("Loging as Test user 2 - Delete the 'Delete Me' user", () => {

    loging.userLogging("Test user 2", "test123");

    //First add a user to delete
    cy.get('[data-testid="name-input"]').type("Delete Me");
    cy.get('[data-testid="email-input"]').type("john@gmail.com");
    cy.get('[data-testid="submit-btn"]').click();

        // Wait for the user to appear in the list
        cy.contains("tr", "Delete Me").should("not.exist");

        // Find the row with the user we want to delete
        cy.contains("tr", "Delete Me").within(() => {
          // Look for a delete button - using a more generic selector
          // This could be a button with text "Delete" or with a data-testid
          cy.contains("Delete").click();
          cy.get('[data-testid="delete-user-btn"]').click();
         
        });
        cy.contains("Are you sure you want to delete the user Delete Me?").should("be.visible");
        cy.contains("button","Delete User").click();
       
  });

 


