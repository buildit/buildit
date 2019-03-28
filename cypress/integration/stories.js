describe("Stories page", () => {
  let route;

  beforeEach(() => {
    route = "Stories";
    cy.visit(`/stories`);
  });

  it("should render the page title", () => {
    cy.title().should("include", route);
  });

});
