import Head from 'next/head'
import { useReducer } from 'react'
import { createGlobalStyle } from 'styled-components'
import { GameSetup } from '~/components/welcome/GameSetup'
import { Welcome } from '~/components/welcome/Welcome'
import { gameStateReducer, INITIAL_GAME_STATE, Stage } from '~/domain/state'

const GlobalTheme = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`

const Home: React.FC = () => {
  const [state, dispatch] = useReducer(gameStateReducer, INITIAL_GAME_STATE)

  const ComponentToUse: React.FC = () => {
    switch (state.stage) {
      case Stage.Welcome:
        return <Welcome dispatch={dispatch} />
      case Stage.SetupGame:
        return <GameSetup />
    }
  }

  return (
    <main>
      <GlobalTheme />
      <Head>
        <title>Skull King Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ComponentToUse />
    </main>
  )
}

export default Home
