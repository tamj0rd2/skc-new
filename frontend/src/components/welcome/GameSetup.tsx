import { useState } from 'react'
import styled from 'styled-components'
import { WithClassName } from '~/styles'

type PlayerInfo = { name?: string }

export const GameSetup: React.FC = () => {
  const [players, setPlayers] = useState<PlayerInfo[]>([])

  return (
    <section>
      <h1>Game setup</h1>
      <button onClick={() => setPlayers([...players, {}])}>Add player</button>
      {players.map((p, i) => (
        <PlayerInput key={i} index={i} />
      ))}
    </section>
  )
}

type PlayerInputProps = WithClassName & PlayerInfo & { index: number }

const PlayerInput = styled(({ className, index }: PlayerInputProps) => {
  return <input className={className} type="text" placeholder={`Player ${index + 1}`} />
})`
  display: block;
`
