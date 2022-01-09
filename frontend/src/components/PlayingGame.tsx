import { useState } from 'react'
import styled from 'styled-components'
import { Game, Player, RoundPhase, StartRoundAction, WithDispatch } from '~/domain/state'

interface PlayingGameProps extends WithDispatch {
  game: Game
}

export const PlayingGame: React.FC<PlayingGameProps> = ({ game, dispatch }) => {
  const startingPlayerIndex = game.roundIndex % game.players.length
  const playerToStart = game.players[startingPlayerIndex]
  const playerToDeal = game.players[startingPlayerIndex ? startingPlayerIndex - 1 : game.players.length - 1]

  switch (game.roundPhase) {
    case RoundPhase.Betting:
      return <RoundSetup game={game} dispatch={dispatch} playerToDeal={playerToDeal} />
    case RoundPhase.Playing:
      return <RoundPlaying game={game} dispatch={dispatch} playerToStart={playerToStart} />
  }
}

const RoundSetup: React.FC<PlayingGameProps & { playerToDeal: Player }> = (props) => {
  const { game, dispatch, playerToDeal } = props
  return (
    <div>
      <h1>
        Round {game.roundIndex + 1}: {playerToDeal.name} deals, then place bets
      </h1>
      <ul>
        {game.players.map((player, i) => (
          <li key={i}>
            {player.name}
            <input type="number" placeholder="Bet" />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(new StartRoundAction([]))}>Start round</button>
    </div>
  )
}

const RoundPlaying: React.FC<PlayingGameProps & { playerToStart: Player }> = (props) => {
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
