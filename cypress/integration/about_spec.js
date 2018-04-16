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
    cy.activeRoute(".grav-c-block-link", route);
  });

  it("renders a pullquote animation", () => {
    cy.get(".js-reveal-element").then($el => {
      let start = $el.position();
      cy.scrollTo("0%", "60%");
      cy.wait(1000);
      expect(start).to.not.equal($el.position());
    });
  });
});
