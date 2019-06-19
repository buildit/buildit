describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render the page title', () => {
    cy.title().should('include', 'Buildit @ Wipro Digital');
  });

  it('should add a link for each location', () => {
    cy.get('.grav-c-callout')
      .find('li')
      .each((value) => {
        expect(value.find('a').attr('href')).to.include('/locations/');
      });
  });

  it('should open an article when clicking it', () => {
    const link = cy.get('.grav-c-card-basic')
      .find('a')
      .first();

    link.then(($el) => {
      link.click();
      cy.get('h1')
        .first()
        .contains($el.text().trim());
    });
  });

  describe('navigation', () => {
    function verifyPage(name) {
      cy.get('.grav-c-nav-menu')
        .find(`a[href='/${name.toLowerCase()}/']`)
        .click()
        .get('h1')
        .first()
        .contains(name);
    }

    it('should follow the stories link', () => {
      verifyPage('Stories');
    });

    it('should follow the people link', () => {
      verifyPage('People');
    });

    it('should follow the jobs link', () => {
      verifyPage('Jobs');
    });
  });
});
