import { ErrorMessage } from '@hookform/error-message'
import { Button } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { StartGameAction, WithDispatch } from '~/domain/state'

export const GameSetup: React.FC<WithDispatch> = ({ dispatch }) => {
  const [playerCount, setPlayerCount] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const playerNames = Object.entries(data).map(([, name]) => name)
        dispatch(new StartGameAction(playerNames))
      })}
    >
      <h1>Game setup</h1>
      <Button variant="outlined" onClick={() => setPlayerCount(playerCount + 1)} disabled={playerCount === 6}>
        Add player
      </Button>
      <Button variant="contained" type="submit" disabled={playerCount < 2}>
        Start game
      </Button>
      {new Array(playerCount).fill(0).map((_, i) => {
        const fieldName = i.toString()
        return (
          <PlayerInput key={i}>
            <input {...register(fieldName, { required: 'Enter a name' })} placeholder={`Player ${i + 1}`} />
            <ErrorMessage errors={errors} name={fieldName} />
          </PlayerInput>
        )
      })}
    </form>
  )
}

const PlayerInput = styled.div`
  display: block;
`
