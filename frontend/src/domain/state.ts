type Action = SetupNewGameAction | StartGameAction

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
        game: { roundIndex: 0, players: action.players },
      }
  }
}

const enum ActionType {
  SetupNewGame = 'SetupNewGame',
  StartGame = 'StartGame',
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

export interface Player {
  name: string
  bet?: number
}

export interface Game {
  players: Player[]
  roundIndex: number
}
