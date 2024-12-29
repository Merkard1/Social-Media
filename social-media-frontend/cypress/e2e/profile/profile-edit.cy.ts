let profileId = "";

describe("User visits profile page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login().then((data) => {
      // profileId = data.id;
      // cy.visit(`profile/${data.id}`);
      profileId = data.id;
      cy.log(`Profile ID: ${profileId}`);
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it("profile is loaded successfully", () => {
    // cy.getByTestId("ProfileCard.name").should("have.value", "testname");
    cy.getByTestId("ProfileCard.name").should("exist").and("have.attr", "value").and("not.be.empty");
    cy.getByTestId("ProfileCard.name").should("have.value", "testname");
  });
  it("And edits it", () => {
    const newName = "new";
    const newLastname = "lastname";
    cy.updateProfile(newName, newLastname);
    cy.getByTestId("ProfileCard.name").should("have.value", newName);
    cy.getByTestId("ProfileCard.lastname").should(
      "have.value",
      newLastname,
    );
  });
});
