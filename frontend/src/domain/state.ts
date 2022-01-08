type Action = SetupNewGameAction

export interface State {
  stage: Stage
}

export type Dispatch = React.Dispatch<Action>

export const enum Stage {
  Welcome = 'Welcome',
  SetupGame = 'SetupGame',
}

export const INITIAL_GAME_STATE: State = {
  stage: Stage.Welcome,
}

export const gameStateReducer = (currentState: State, action: Action): State => {
  switch (action.constructor) {
    case SetupNewGameAction:
      return {
        stage: Stage.SetupGame,
      }
    default:
      throw new Error(`unhandled action type ${action.constructor.name}`)
  }
}

export class SetupNewGameAction {}
