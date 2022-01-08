/// <reference types="cypress" />

describe("Can play a 2 player game", () => {
  it("starts a game", () => {
    cy.visit("./build/")
    cy.get("body").should("contain", "Welcome to Next.js")
  })
})

export {}
