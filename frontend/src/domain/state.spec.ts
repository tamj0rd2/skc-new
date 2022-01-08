import {
  SetupNewGameAction,
  gameStateReducer,
  INITIAL_GAME_STATE,
  Stage,
  StartGameAction,
  PlayingGameState,
} from './state'

describe('state', () => {
  it('can start setting up a new game', () => {
    const action = new SetupNewGameAction()

    const newState = gameStateReducer(INITIAL_GAME_STATE, action)

    expect(newState.stage).toBe(Stage.SetupGame)
  })

  describe('Starting a game', () => {
    test('happy path', () => {
      const action = new StartGameAction(['Tam', 'Peter'])

      const newState = gameStateReducer(
        {
          stage: Stage.SetupGame,
        },
        action,
      ) as PlayingGameState

      expect(newState.stage).toBe(Stage.PlayingGame)
      expect(newState.game).toStrictlyEqual({
        roundIndex: 0,
        players: [{ name: 'Tam' }, { name: 'Peter' }],
      })
    })
  })
})
