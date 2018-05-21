import { configure } from 'mobx'

// Only allow updates to observable data inside of actions
configure({ enforceActions: true })

import { observer } from 'mobx-react'
import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import state from './state'

import Nav from './Nav'
import Home from './Home'
import Events from './Events'
import CreateEvent from './Events/CreateEvent'
import NotFound from './NotFound'

import '../../less/global.less'

const App: React.StatelessComponent<{}> = observer((): JSX.Element => {
	const loaded: boolean = !!state.$user
	if (!loaded) {
		return <div id='loading' />
	}

	return (
		<BrowserRouter basename='/user'>
			<div>
				<Nav />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/events' component={Events} />
					<Route path='/create-event' component={CreateEvent} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	)
})

render(<App />, document.querySelector('div#root'))

state.getUser()
