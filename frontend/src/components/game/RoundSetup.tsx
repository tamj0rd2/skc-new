import { WithDispatch, Game, Player, StartRoundAction } from '~/domain/state'

interface RoundSetupProps extends WithDispatch {
  game: Game
}

export const RoundSetup: React.FC<RoundSetupProps & { playerToDeal: Player }> = (props) => {
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
