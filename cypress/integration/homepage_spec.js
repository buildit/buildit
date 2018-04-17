describe("Homepage", () => {
  let route;

  beforeEach(() => {
    cy.visit("/");
  });

  it.skip("should render the page title", () => {
    cy.title().should("include", "About");
  });
});
