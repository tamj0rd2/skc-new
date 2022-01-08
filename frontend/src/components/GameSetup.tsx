import { useState } from 'react'
import styled from 'styled-components'
import { StartGameAction, WithDispatch } from '~/domain/state'

export const GameSetup: React.FC<WithDispatch> = ({ dispatch }) => {
  const [players, setPlayers] = useState<string[]>([])

  return (
    <section>
      <h1>Game setup</h1>
      <button onClick={() => setPlayers([...players, ''])}>Add player</button>
      {players.map((p, i) => (
        <PlayerInput
          key={i}
          type="text"
          placeholder={`Player ${i + 1}`}
          onChange={(e) => {
            const updatedPlayers = [...players]
            updatedPlayers[i] = e.target.value
            setPlayers(updatedPlayers)
          }}
        />
      ))}
      <button
        onClick={() => {
          // TODO: handle errors
          dispatch(new StartGameAction(players))
        }}
      >
        Start game
      </button>
    </section>
  )
}

const PlayerInput = styled.input`
  display: block;
`
