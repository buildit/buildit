describe('Jobs page', () => {
  let route;

  beforeEach(() => {
    route = 'Jobs';
    cy.visit('/jobs');
  });

  it('should render the page title', () => {
    cy.title().should('include', route);
  });
});
