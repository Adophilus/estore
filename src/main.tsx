import App from './app'
import './assets/logo.css'
import './assets/styles.css'
import { render } from 'preact'
import 'preact/debug'
import 'preact/devtools'

render(<App />, document.getElementById('app') as HTMLElement)
