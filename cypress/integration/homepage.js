describe("Homepage", () => {
  let route;

  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("should render the page title", () => {
    cy.title().should("include", "buildit @ wipro digital");
  });
});
