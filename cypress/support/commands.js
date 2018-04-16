Cypress.Commands.add("smoothScroll", anchor => {
  cy.get(anchor).click();
  cy.get(`a[href="${anchor}"]`).click();
  cy.location(location => expect(location).to.contain(anchor));
});

Cypress.Commands.add("toggleMenu", toggleMenu => {
  cy.get(toggleMenu).click();
  cy.get(toggleMenu).should("have.attr", "aria-pressed", "true");
  cy.get(toggleMenu).click();
  cy.get(toggleMenu).should("have.attr", "aria-pressed", "false");
});

Cypress.Commands.add("activeRoute", (selector, route) => {
  cy
    .get(selector)
    .contains(route)
    .should("not.have.attr", "href");
});

//TODO: TypeError at scripts > hero-animation > hero.js:126
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
