describe("About page", () => {
  let route;

  beforeEach(() => {
    route = "About";
    cy.visit(`/${route}`);
  });

  it.skip("should render the page title", () => {
    cy.title().should("include", "About");
  });

  it("should render current route as active navigation option", () => {
    cy.isActiveRoute(".grav-c-block-link", route);
  });

  it("renders a pullquote animation", () => {
    cy.scrollReveal(".js-reveal-element");
  });
});
