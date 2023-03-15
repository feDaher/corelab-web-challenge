import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from '../src/theme'

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
  body {
    font-family: 'Inter', sans-serif;
    background-color: ${(props) => props.theme.background};
    overflow: hidden;
  }
  html {
    scroll-behavior: smooth;
    overflow-y: scroll;
  }
`

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
