describe("Homepage", () => {
  let route;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the page title", () => {
    cy.title().should("include", "Buildit @ Wipro Digital");
  });
});
