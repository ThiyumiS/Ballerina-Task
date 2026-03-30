export class Loging {
  userLogging(username, password) {
    cy.visit("http://localhost:3000/");
    cy.get('.bg-white').click();

    cy.get('[data-testid="email-input"]').type(username)
    cy.get('[data-testid="password-input"]').type(password)
    cy.get('[data-testid="submit-btn"]').click();
  }  

}

