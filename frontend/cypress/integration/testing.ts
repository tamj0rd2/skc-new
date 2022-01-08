describe('Can play a 2 player game', () => {
  const baseUrl = Cypress.env('USE_BUILD') === true ? './build' : 'http://localhost:3000'

  it('starts a game', () => {
    cy.visit(baseUrl + '/')
    cy.title().should('equal', 'Skull King Calculator')
    cy.findByText('New game').click()
    cy.findByText('Game setup').should('be.visible')
  })
})

export {}
