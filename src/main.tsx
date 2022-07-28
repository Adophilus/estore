import 'preact/debug'
import 'preact/devtools'
import App from './app'
import { render } from 'preact'
import 'preact/debug'

render(<App />, document.getElementById('app') as HTMLElement)
