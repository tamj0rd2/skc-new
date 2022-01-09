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
    <section>
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
    </section>
  )
}

const RoundPlaying: React.FC<PlayingGameProps & { playerToStart: Player }> = (props) => {
  const { game, playerToStart } = props
  return (
    <section>
      <h1>
        Round {game.roundIndex + 1}: Play cards - {playerToStart.name} starts
      </h1>
    </section>
  )
}
