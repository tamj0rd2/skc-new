import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { WithDispatch, Game, Player } from '~/domain/state'

interface PlayRoundProps extends WithDispatch {
  game: Game
}

export const PlayRound: React.FC<PlayRoundProps & { playerToStart: Player }> = (props) => {
  const { game, playerToStart } = props
  const numOfTricks = game.roundIndex + 1

  return (
    <form>
      <h1>
        Round {game.roundIndex + 1}: Play cards - {playerToStart.name} starts
      </h1>
      {new Array(numOfTricks).fill(0).map((_, i) => (
        <TrickWinnerSelection key={i} trickIndex={i} players={game.players} />
      ))}
    </form>
  )
}

const TrickWinnerSelection: React.FC<{ trickIndex: number; players: Player[] }> = (props) => {
  const { trickIndex, players } = props

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Trick {trickIndex + 1} winner:</FormLabel>
      <RadioGroup aria-label="gender" defaultValue="female" name="radio-buttons-group" row>
        {players.map((player) => (
          <FormControlLabel
            key={player.name}
            value={player.name}
            control={<Radio />}
            label={player.name}
            labelPlacement="start"
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
