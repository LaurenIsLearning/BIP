describe("Stats Page Tests", () => {
  it("should navigate to blank stats page and display dropdown", () => {
    cy.visit("http://localhost:5173/");
    ``;
    cy.get('[data-testid="nav-stats-btn"] a').click();
    ``;
    cy.get('[data-testid="select-team-stats"]').should("exist");
  });

  it("should allow selection of team from stats dropdown when no team selected", function () {
    cy.visit("http://localhost:5173/Stats");
    ``;
    cy.get('[data-testid="select-team-stats"]').select("1");
    ``;
    cy.url().should("include", "/Stats/1");
    cy.get('[data-testid="select-team-stats"]').should("have.value", "1");
    cy.contains("SEYBERTS").should("exist");
  });

  it("should allow selection of team from stats dropdown when a team is already selected", function () {
    cy.visit("http://localhost:5173/Stats/1");
    ``;
    cy.get('[data-testid="select-team-stats"]').select("3");
    ``;
    cy.url().should("include", "/Stats/3");
    cy.get('[data-testid="select-team-stats"]').should("have.value", "3");
    cy.contains("Rubber Duckies").should("exist");
  });

  it("should allow selection of players, and should not exceed max 5 players", function () {
    cy.visit("http://localhost:5173/Stats/1");
    ``;
    cy.get(
      '[data-testid="player-toggle-May-Listenberger"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Heather-Willet"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Andrew-Nguyen"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Riley-Gardner"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Chris-Morales"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Brayan-Buendia"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get('[data-testid="player-toggle-Brayan-Buendia"]').should(
      "not.have.class",
      "played"
    );
  });

  it("should not select players over the 23 point limit", function () {
    cy.visit("http://localhost:5173/Stats/1");
    ``;
    cy.get('[data-testid="player-toggle-Max-Krause"]').click();
    ``;
    cy.get('[data-testid="player-toggle-Ryan-Hogans"]').click();
    ``;
    cy.get(
      '[data-testid="player-toggle-Brayan-Buendia"] p._player_name_5l8yy_56'
    ).click();
    ``;
    cy.get('[data-testid="player-toggle-Brayan-Buendia"]').should(
      "not.have.class",
      "played"
    );
  });

  it("should allow opening and closing of extra stats display", function () {
    cy.visit("http://localhost:5173/Stats/3");
    ``;
    cy.get(
      '[data-testid="player-expand-Jeff-Mercer-Jr"] img._arrow_icon_5l8yy_97'
    ).click();
    ``;
    cy;
    cy.contains("Session Stats").should("exist");
    ``;
    cy.get(
      '[data-testid="player-expand-Jeff-Mercer-Jr"] img._arrow_icon_5l8yy_97'
    ).click();
    cy.contains("Session Stats").should("not.exist");
  });

  it("should allow changing between which type of stats are displayed for a player", function () {
    cy.visit("http://localhost:5173/Stats/3");
    ``;
    cy.get(
      '[data-testid="player-expand-Jeff-Mercer-Jr"] img._arrow_icon_5l8yy_97'
    ).click();
    ``;
    cy;
    cy.contains("Session Stats").should("exist");
    ``;
    cy.get('[data-testid="player-toggle-session-Jeff-Mercer-Jr"]').click();
    cy.contains("Session Stats").should("not.exist");
  });

  it("should show proper number of combinations and point total", function () {
    cy.visit("http://localhost:5173/Stats/3");
    cy.get('[data-testid="combinations-count"]').contains("3");
    cy.get('[data-testid="point-total"]').contains("0");
    cy.get('[data-testid="player-toggle-Alec-Cordobes"]').click();
    cy.get('[data-testid="combinations-count"]').contains("3");
    cy.get('[data-testid="point-total"]').contains("5");
    cy.get(
      '[data-testid="player-toggle-Luke-Schwieterman"] p._player_name_5l8yy_56'
    ).click();
    cy.get('[data-testid="combinations-count"]').contains("2");
    cy.get('[data-testid="point-total"]').contains("10");
    cy.get(
      '[data-testid="player-toggle-Jeff-Mercer-Jr"] p._player_name_5l8yy_56'
    ).click();
    cy.get('[data-testid="combinations-count"]').contains("1");
    cy.get('[data-testid="point-total"]').contains("17");
    cy.get(
      '[data-testid="player-toggle-Jeff-Mercer-Jr"] p._player_name_5l8yy_56'
    ).click();
    cy.get('[data-testid="combinations-count"]').contains("2");
    cy.get('[data-testid="point-total"]').contains("10");
    cy.get(
      '[data-testid="player-toggle-Luke-Schwieterman"] p._player_name_5l8yy_56'
    ).click();
    cy.get('[data-testid="combinations-count"]').contains("3");
    cy.get('[data-testid="point-total"]').contains("5");
    cy.get('[data-testid="player-toggle-Alec-Cordobes"]').click();
    cy.get('[data-testid="combinations-count"]').contains("3");
    cy.get('[data-testid="point-total"]').contains("0");
  });
});
