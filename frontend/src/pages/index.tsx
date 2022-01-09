import Head from 'next/head'
import { useLayoutEffect, useReducer } from 'react'
import { createGlobalStyle } from 'styled-components'
import { GameSetup } from '~/components/GameSetup'
import { PlayGame } from '~/components/game/Game'
import { Welcome } from '~/components/Welcome'
import { gameStateReducer, INITIAL_GAME_STATE, ResetStateAction, Stage } from '~/domain/state'

const GlobalTheme = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`

const Home: React.FC = () => {
  const storedState = global.localStorage?.getItem('state')
  const initialState = storedState ? JSON.parse(storedState) : INITIAL_GAME_STATE

  const [state, dispatch] = useReducer(gameStateReducer, initialState)
  useLayoutEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  const ComponentToUse: React.FC = () => {
    switch (state.stage) {
      case Stage.Welcome:
        return <Welcome dispatch={dispatch} />
      case Stage.SetupGame:
        return <GameSetup dispatch={dispatch} />
      case Stage.PlayingGame:
        return <PlayGame game={state.game} dispatch={dispatch} />
    }
  }

  return (
    <main>
      <GlobalTheme />
      <Head>
        <title>Skull King Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => dispatch(new ResetStateAction())}>Reset everything</button>
      <ComponentToUse />
    </main>
  )
}

export default Home
