describe("About page", () => {
  let route;

  beforeEach(() => {
    route = "About";
    cy.visit(`/about`);
  });

  it("should render the page title", () => {
    cy.title().should("include", route);
  });

  it("should render current route as active navigation option", () => {
    cy.isActiveRoute(".grav-c-nav-link", route);
  });

  it("renders a pullquote animation", () => {
    cy.scrollReveal(".js-reveal-element");
  });
});
