type Action = SetupNewGameAction | StartGameAction | StartRoundAction

export type State =
  | {
      stage: Exclude<Stage, Stage.PlayingGame>
    }
  | PlayingGameState

export type PlayingGameState = {
  stage: Stage.PlayingGame
  game: Game
}

export type Dispatch = React.Dispatch<Action>

export type WithDispatch = { dispatch: Dispatch }

export const enum Stage {
  Welcome = 'Welcome',
  SetupGame = 'SetupGame',
  PlayingGame = 'PlayingGame',
}

export const INITIAL_GAME_STATE: State = {
  stage: Stage.Welcome,
}

export const gameStateReducer = (currentState: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetupNewGame:
      return {
        stage: Stage.SetupGame,
      }
    case ActionType.StartGame:
      return {
        stage: Stage.PlayingGame,
        game: { roundIndex: 0, players: action.players, roundPhase: RoundPhase.Betting, rounds: [] },
      }
    case ActionType.StartRound:
      if (currentState.stage != Stage.PlayingGame) {
        throw new Error("Can't start a round when not in the playing game stage")
      }

      return {
        ...currentState,
        game: {
          ...currentState.game,
          roundPhase: RoundPhase.Playing,
          rounds: [...currentState.game.rounds, action.round],
        },
      }
  }
}

const enum ActionType {
  SetupNewGame = 'SetupNewGame',
  StartGame = 'StartGame',
  StartRound = 'StartRound',
}

export class SetupNewGameAction {
  public readonly type = ActionType.SetupNewGame
}

export class StartGameAction {
  public readonly type = ActionType.StartGame
  public readonly players: Player[]

  constructor(public readonly playerNames: string[]) {
    if (playerNames.some((p) => !p)) {
      // TODO: replace this with a proper error type
      throw new Error('Some player names are blank')
    }

    this.players = playerNames.map((name) => ({ name }))
  }
}

export class StartRoundAction {
  public readonly type = ActionType.StartRound
  public readonly round: Round

  constructor(playerBets: PlayerWithBet[]) {
    this.round = playerBets.reduce<Round>((round, player) => {
      return { ...round, [player.name]: { bet: player.bet } }
    }, {})
  }
}

export interface Player {
  name: string
}

type PlayerWithBet = Player & { bet: number }

export interface Game {
  players: Player[]
  roundIndex: number
  roundPhase: RoundPhase
  rounds: Round[]
}

export enum RoundPhase {
  Betting = 'Betting',
  Playing = 'Playing',
}

type Round = Record<string, { bet: number }>
