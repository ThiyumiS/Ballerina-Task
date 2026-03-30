describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('test1', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('.bg-white').click();
    cy.get('.text-gray-500 > .w-5').click();
    cy.get('.bg-white').should('be.visible');
    cy.get('.bg-white').click();
    cy.get('[data-testid="email-input"]').clear('t');
    cy.get('[data-testid="email-input"]').type('test@.com');
    cy.get('[data-testid="password-input"]').clear('1');
    cy.get('[data-testid="password-input"]').type('1234');
    cy.get('[data-testid="submit-btn"]').click();
    /* ==== End Cypress Studio ==== */
  });
})