describe("smooth scroll", () => {
  let pageRoute, anchorID;

  beforeEach(() => {
    pageRoute = "careers";
    anchorID = "the-hiring-process";

    //TODO: TypeError at scripts > hero-animation > hero.js:126
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  it("should scroll to the right anchor", () => {
    cy.visit(`/${pageRoute}`);
    cy.get(`a[href="#${anchorID}"]`).click();
    cy.get(`#${anchorID}`).should("be.visible");
  });

  it("window location should indicate the right anchor name", () => {
    cy.visit(`/${pageRoute}`);
    cy.get(`a[href="#${anchorID}"]`).click();
    cy.location(location => expect(location).to.contain(anchorID));
  });
});
