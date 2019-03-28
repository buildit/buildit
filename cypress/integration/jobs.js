describe("Jobs page", () => {
  let route;

  beforeEach(() => {
    route = "Jobs";
    cy.visit(`/jobs`);
  });

  it("should render the page title", () => {
    cy.title().should("include", route);
  });

  it("renders job positions which should link to smatrecruiters website", () => {
    cy.get(".grav-c-job-list")
      .find(".grav-c-job-card>a")
      .first()
      .should("have.attr", "href")
      .and("match", /smartrecruiters/);
  });
});
