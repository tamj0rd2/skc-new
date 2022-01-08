import { Game } from '~/domain/state'

interface PlayingGameProps {
  game: Game
}

export const PlayingGame: React.FC<PlayingGameProps> = ({ game }) => {
  return (
    <section>
      <h1>Round {game.roundIndex + 1}: Place bets</h1>
      <ul>
        {game.players.map((player, i) => (
          <li key={i}>
            {player.name}
            <input type="number" placeholder="Bet" />
          </li>
        ))}
      </ul>
    </section>
  )
}
