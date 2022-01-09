import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { WithDispatch, Game, Player, StartRoundAction, PlayerWithBet } from '~/domain/state'

interface RoundSetupProps extends WithDispatch {
  game: Game
}

export const RoundSetup: React.FC<RoundSetupProps & { playerToDeal: Player }> = (props) => {
  const { game, dispatch, playerToDeal } = props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const roundNumber = game.roundIndex + 1
  const invalidBetMessage = `Bet must be between 0 and ${roundNumber}`

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const playerBets = Object.entries(data).map<PlayerWithBet>(([name, bet]) => ({ name, bet }))
        dispatch(new StartRoundAction(playerBets))
      })}
    >
      <h1>
        Round {roundNumber}: {playerToDeal.name} deals, then place bets
      </h1>
      {game.players.map((player) => {
        const fieldName = player.name
        return (
          <PlayerInput key={fieldName}>
            <TextField
              label={`${player.name}'s bet`}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]?.message}
              type="number"
              {...register(player.name, {
                required: invalidBetMessage,
                min: { value: 0, message: invalidBetMessage },
                max: { value: roundNumber, message: invalidBetMessage },
              })}
            />
          </PlayerInput>
        )
      })}
      <Button variant="contained" type="submit">
        Start round {roundNumber}
      </Button>
    </form>
  )
}

const PlayerInput = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`
