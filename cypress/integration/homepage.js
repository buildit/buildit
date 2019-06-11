describe("Homepage", () => {
  let route;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the page title", () => {
    cy.title().should("include", "Buildit @ Wipro Digital");
  });

  it("should add a link for each location", () => {
    cy.get(".grav-c-callout")
      .find("li")
      .each(value => {
        expect(value.find("a").attr("href")).to.include("/locations/");
      });
  });
});
