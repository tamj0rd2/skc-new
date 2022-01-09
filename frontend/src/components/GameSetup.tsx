import { Button, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { StartGameAction, WithDispatch } from '~/domain/state'
import { Delete } from '@mui/icons-material'

export const GameSetup: React.FC<WithDispatch> = ({ dispatch }) => {
  const [playerButtonNames, setButtonIds] = useState<string[]>([])

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
      <Button
        variant="outlined"
        onClick={() => setButtonIds([...playerButtonNames, Date.now().toString()])}
        disabled={playerButtonNames.length === 6}
      >
        Add player
      </Button>
      <Button variant="contained" type="submit" disabled={playerButtonNames.length < 2}>
        Start game
      </Button>
      {playerButtonNames.map((fieldName, i) => {
        return (
          <PlayerInput key={fieldName}>
            <TextField
              {...register(fieldName, { required: 'Enter a name' })}
              label={`Player ${i + 1}`}
              error={!!errors[fieldName]}
              helperText={errors[fieldName]?.message}
            />
            <IconButton
              aria-label="delete"
              onClick={() => {
                const updatedButtonIds = [...playerButtonNames]
                updatedButtonIds.splice(i, 1)
                setButtonIds(updatedButtonIds)
              }}
            >
              <Delete />
            </IconButton>
          </PlayerInput>
        )
      })}
    </form>
  )
}

const PlayerInput = styled.div`
  margin-top: 16px;
`
