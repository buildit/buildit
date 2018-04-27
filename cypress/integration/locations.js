describe("Locations page", () => {
  let route;

  beforeEach(() => {
    route = "Locations";
    cy.visit(`/locations`);
  });

  it("should render the page title", () => {
    cy.title().should("include", route);
  });

  it("should render current route as active navigation option", () => {
    cy.isActiveRoute(".grav-c-block-link", route);
  });

  it("should render a map for each location that opens a new window", () => {
    cy
      .get(".grav-c-two-columns-block")
      .find(".grav-c-location-card")
      .each(value => {
        expect(value.find("a").attr("href")).to.include("google");
        expect(value.find("a").attr("target")).to.include("blank");
      });
  });
});
