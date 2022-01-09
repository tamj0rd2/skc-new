import { ErrorMessage } from '@hookform/error-message'
import { Button } from '@mui/material'
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
  const invalidBetMessage = `Bet must be from 0 to ${roundNumber}`

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
      <ul>
        {game.players.map((player) => {
          return (
            <BetInput key={player.name}>
              {player.name}
              <input
                type="number"
                placeholder="Bet"
                {...register(player.name, {
                  required: invalidBetMessage,
                  min: { value: 0, message: invalidBetMessage },
                  max: { value: roundNumber, message: invalidBetMessage },
                })}
              />
              <ErrorMessage errors={errors} name={player.name} />
            </BetInput>
          )
        })}
      </ul>
      <Button variant="contained" type="submit">
        Start round
      </Button>
    </form>
  )
}

const BetInput = styled.li``
