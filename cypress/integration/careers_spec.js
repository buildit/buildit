describe("careers", () => {
  let route, anchor;

  beforeEach(() => {
    route = "Careers";
    anchor = "the-hiring-process";
    cy.visit("/careers");
  });

  it("should render a page title", () => {
    cy.title().should("include", route);
  });

  it("should indicates current route as active on the navigation menu", () => {
    cy
      .get(".grav-c-block-link")
      .find(`a[title='${route}']`)
      .should("not.has.attr", "href");
  });

  it("has an anchor that uses smoothScroll feature", () => {
    cy.smoothScroll(`#${anchor}`);
  });

  it("list job positions that link to smatrecruiters", () => {
    cy
      .get(".grav-c-job-list")
      .find(".grav-c-job-card>a")
      .first()
      .should("have.attr", "href")
      .and("match", /smartrecruiters/);
  });
});
