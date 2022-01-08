import { SetupNewGameAction, Dispatch } from '~/domain/state'

interface WelcomeProps {
  dispatch: Dispatch
}

export const Welcome: React.FC<WelcomeProps> = ({ dispatch }) => {
  return (
    <div>
      <button onClick={() => dispatch(new SetupNewGameAction())}>New game</button>
    </div>
  )
}
