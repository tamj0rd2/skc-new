/// <reference types="cypress" />

describe("Can play a 2 player game", () => {
  it("starts a game", () => {
    cy.visit("/")
    cy.get("body").should("contain", "Skull King Calculator")
  })
})
