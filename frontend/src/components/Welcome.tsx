import { Button } from '@mui/material'
import { SetupNewGameAction, Dispatch } from '~/domain/state'

interface WelcomeProps {
  dispatch: Dispatch
}

export const Welcome: React.FC<WelcomeProps> = ({ dispatch }) => {
  return (
    <div>
      <Button variant="contained" onClick={() => dispatch(new SetupNewGameAction())}>
        New game
      </Button>
    </div>
  )
}
