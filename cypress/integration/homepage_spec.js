describe("Homepage", () => {
  let route;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the page title", () => {
    cy.title().should("include", "buildit @ wipro digital");
  });

  it("should render the animated hero", () => {
    cy.animatedHero("#js-canvas-hero");
  });
});
