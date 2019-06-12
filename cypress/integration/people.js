describe('People page', () => {
  let route;

  beforeEach(() => {
    route = 'People';
    cy.visit('/people');
  });

  it('should render the page title', () => {
    cy.title().should('include', route);
  });
});
