describe('Playing a game', () => {
  const Tam = 'Tam'
  const Peter = 'Peter'

  it('can enter the game setup screen', () => {
    cy.visit('/')
    cy.title().should('equal', 'Skull King Calculator')
    cy.findByText('New game').click()
    cy.findByText('Game setup').should('be.visible')
  })

  it('can add 2 players', () => {
    cy.findByText('Add player').click()
    cy.findByPlaceholderText('Player 1').type(Tam)
    cy.findByText('Add player').click()
    cy.findByPlaceholderText('Player 2').type(Peter)
  })

  it('can start the game', () => {
    cy.findByText('Start game').click()
  })

  it('can place bets for round 1', () => {
    cy.findByText('Round 1: Place bets').should('be.visible')
    cy.findByText(Tam).should('be.visible').siblings().findByPlaceholderText('Bet').type('1')
    cy.findByText(Peter).should('be.visible').siblings().findByPlaceholderText('Bet').type('1')
  })
})

export {}
