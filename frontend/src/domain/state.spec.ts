import {
  SetupNewGameAction,
  gameStateReducer,
  INITIAL_GAME_STATE,
  Stage,
  StartGameAction,
  PlayingGameState,
  RoundPhase,
  StartRoundAction,
} from './state'

describe('state', () => {
  const Tam = 'Tam'
  const Peter = 'Peter'

  it('can start setting up a new game', () => {
    const action = new SetupNewGameAction()

    const newState = gameStateReducer(INITIAL_GAME_STATE, action)

    expect(newState.stage).toBe(Stage.SetupGame)
  })

  describe('Starting a game', () => {
    test('happy path', () => {
      const action = new StartGameAction([Tam, Peter])

      const newState = gameStateReducer(
        {
          stage: Stage.SetupGame,
        },
        action,
      ) as PlayingGameState

      expect(newState.stage).toBe(Stage.PlayingGame)
      expect(newState.game).toStrictlyEqual({
        roundIndex: 0,
        players: [{ name: Tam }, { name: Peter }],
        roundPhase: RoundPhase.Betting,
        rounds: [],
      })
    })
  })

  describe('Starting a round', () => {
    const action = new StartRoundAction([
      { name: Tam, bet: 1 },
      { name: Peter, bet: 1 },
    ])

    const newState = gameStateReducer(
      {
        stage: Stage.PlayingGame,
        game: {
          players: [{ name: Tam }, { name: Peter }],
          roundIndex: 0,
          roundPhase: RoundPhase.Betting,
          rounds: [],
        },
      },
      action,
    ) as PlayingGameState

    expect(newState.stage).toBe(Stage.PlayingGame)
    expect(newState.game).toStrictlyEqual({
      roundIndex: 0,
      players: [{ name: Tam }, { name: Peter }],
      rounds: [{ Tam: { bet: 1 }, Peter: { bet: 1 } }],
      roundPhase: RoundPhase.Playing,
    })
  })
})
