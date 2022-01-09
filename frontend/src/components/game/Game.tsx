import { Game, RoundPhase, WithDispatch } from '~/domain/state'
import { PlayRound } from './PlayRound'
import { RoundSetup } from './RoundSetup'

interface PlayGameProps extends WithDispatch {
  game: Game
}

export const PlayGame: React.FC<PlayGameProps> = ({ game, dispatch }) => {
  const startingPlayerIndex = game.roundIndex % game.players.length
  const playerToStart = game.players[startingPlayerIndex]
  const playerToDeal = game.players[startingPlayerIndex ? startingPlayerIndex - 1 : game.players.length - 1]

  switch (game.roundPhase) {
    case RoundPhase.Betting:
      return <RoundSetup game={game} dispatch={dispatch} playerToDeal={playerToDeal} />
    case RoundPhase.Playing:
      return <PlayRound game={game} dispatch={dispatch} playerToStart={playerToStart} />
  }
}
