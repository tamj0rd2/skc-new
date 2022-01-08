describe('Can play a 2 player game', () => {
  it('starts a game', () => {
    cy.visit('/')
    cy.title().should('equal', 'Skull King Calculator')
    cy.findByText('New game').click()
    cy.findByText('Game setup').should('be.visible')

    // TODO: Feature: remove a player
    cy.findByText('Add player').click()
    cy.findByPlaceholderText('Player 1').type('Tam')
    cy.findByText('Add player').click()
    cy.findByPlaceholderText('Player 2').type('Peter')
  })
})

export {}
