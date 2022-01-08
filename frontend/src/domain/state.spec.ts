import { SetupNewGameAction, gameStateReducer, INITIAL_GAME_STATE, Stage } from './state'

describe('state', () => {
  it('can start a 2 player game', () => {
    const action = new SetupNewGameAction()

    const newState = gameStateReducer(INITIAL_GAME_STATE, action)

    expect(newState.stage).toBe(Stage.SetupGame)
  })
})
