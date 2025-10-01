describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('logging', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/login');
    cy.get('.grid > :nth-child(1)').click();
    cy.get(':nth-child(1) > .w-16').should('be.visible');
    cy.get(':nth-child(2) > .w-16').should('be.visible');
    cy.get(':nth-child(3) > .w-16 > .w-8 > path').should('be.visible');
    cy.get('.bg-white').should('be.enabled');
    cy.get('.bg-white').click();
  
    cy.get('[data-testid="email-input"]').type('thiyumi@wso2.com');
    cy.get('[data-testid="password-input"]').type('thiyu123');
    cy.get('[data-testid="email-input"]').should('have.value', 'thiyumi@wso2.com');
    cy.get('[data-testid="password-input"]').should('have.value', 'thiyu123');
    cy.get('[data-testid="submit-btn"]').should('be.enabled');
    cy.get('[data-testid="submit-btn"]').click();
    /* ==== End Cypress Studio ==== */

  });
})