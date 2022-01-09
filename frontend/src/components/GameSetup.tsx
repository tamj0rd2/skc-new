import { ErrorMessage } from '@hookform/error-message'
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
      <button onClick={() => setPlayerCount(playerCount + 1)} disabled={playerCount === 6}>
        Add player
      </button>
      {new Array(playerCount).fill(0).map((_, i) => {
        const fieldName = i.toString()
        return (
          <PlayerInput key={i}>
            <input {...register(fieldName, { required: 'Enter a name' })} placeholder={`Player ${i + 1}`} />
            <ErrorMessage errors={errors} name={fieldName} />
          </PlayerInput>
        )
      })}
      <button type="submit">Start game</button>
    </form>
  )
}

const PlayerInput = styled.div`
  display: block;
`
