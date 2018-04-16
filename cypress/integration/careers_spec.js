describe("Careers page", () => {
  let route, anchor;

  beforeEach(() => {
    route = "Careers";
    anchor = "the-hiring-process";
    cy.visit("/careers");
  });

  it("should render the page title", () => {
    cy.title().should("include", route);
  });

  it("should indicates current route as active on the navigation menu", () => {
    cy
      .get(".grav-c-block-link")
      .find(`a[title='${route}']`)
      .should("not.has.attr", "href");
  });

  it("renders an anchor that uses the smoothScroll feature", () => {
    cy.smoothScroll(`#${anchor}`);
  });

  it("renders job positions which should link to smatrecruiters website", () => {
    cy
      .get(".grav-c-job-list")
      .find(".grav-c-job-card>a")
      .first()
      .should("have.attr", "href")
      .and("match", /smartrecruiters/);
  });
});
