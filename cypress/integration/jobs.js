describe('Jobs page', () => {
  let route;

  beforeEach(() => {
    route = 'Jobs';
    cy.visit('/jobs');
  });

  it('should render the page title', () => {
    cy.title().should('include', route);
  });

  it('renders job positions which should link to smartrecruiters website', () => {
    cy.get('section>ul>li>a')
      .first()
      .should('have.attr', 'href')
      .and('match', /smartrecruiters/);
  });
});
