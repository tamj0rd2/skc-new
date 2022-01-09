import { useState } from 'react'
import styled from 'styled-components'
import { WithDispatch, Game, Player } from '~/domain/state'

interface PlayRoundProps extends WithDispatch {
  game: Game
}

export const PlayRound: React.FC<PlayRoundProps & { playerToStart: Player }> = (props) => {
  const { game, playerToStart } = props
  const numOfTricks = game.roundIndex + 1

  return (
    <div>
      <h1>
        Round {game.roundIndex + 1}: Play cards - {playerToStart.name} starts
      </h1>
      {new Array(numOfTricks).fill(0).map((_, i) => (
        <TrickScoringBit key={i} trickIndex={i} players={game.players} />
      ))}
    </div>
  )
}

const TrickScoringBit: React.FC<{ trickIndex: number; players: Player[] }> = (props) => {
  const { trickIndex, players } = props
  const [winner, setWinner] = useState<Player | undefined>()

  return (
    <TrickScoring>
      <h2>Trick {trickIndex + 1} winner:</h2>
      <ul>
        {players.map((player, i) => (
          <WinnerButton key={i} isWinner={winner === player} onClick={() => setWinner(player)}>
            {player.name}
          </WinnerButton>
        ))}
      </ul>
    </TrickScoring>
  )
}

const TrickScoring = styled.section`
  h2 {
    display: inline-block;
  }

  ul {
    display: inline-block;
    padding-left: 0;
  }
`

const WinnerButton = styled.button<{ isWinner?: boolean }>`
  background: ${(props) => (props.isWinner ? 'green' : 'default')};
  color: ${(props) => (props.isWinner ? 'white' : 'default')};
`
