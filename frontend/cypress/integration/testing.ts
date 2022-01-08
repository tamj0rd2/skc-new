/// <reference types="cypress" />

describe("Can play a 2 player game", () => {
  const baseUrl = Cypress.env('USE_BUILD') === true ? "./build" : "http://localhost:3000"

  it("starts a game", () => {
    cy.visit(baseUrl + "/")
    cy.get("body").should("contain", "Welcome to Next.js")
  })
})

export {}
