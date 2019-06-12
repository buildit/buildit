// TODO: TypeError at scripts > hero-animation > hero.js:126
Cypress.on('uncaught:exception', () => false);

Cypress.Commands.add('isActiveRoute', (selector, route) => {
  cy
    .get(selector)
    .contains(route)
    .should('not.have.attr', 'href');
});

Cypress.Commands.add('toggleMenu', (toggleMenu) => {
  cy.get(toggleMenu).click();
  cy.get(toggleMenu).should('have.attr', 'aria-pressed', 'true');
  cy.get(toggleMenu).click();
  cy.get(toggleMenu).should('have.attr', 'aria-pressed', 'false');
});

Cypress.Commands.add('scrollReveal', (selector) => {
  cy.get(selector).then(($el) => {
    const start = $el.position();
    cy.scrollTo('0%', '60%');
    cy.wait(1000);
    expect(start).to.not.equal($el.position());
  });
});

Cypress.Commands.add('smoothScroll', (anchor) => {
  cy.get(anchor).click();
  cy.get(`a[href="${anchor}"]`).click();
  cy.location(location => expect(location).to.contain(anchor));
});
