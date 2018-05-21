import { configure } from 'mobx'

// Only allow updates to observable data inside of actions
configure({ enforceActions: true })

import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import NotFound from './NotFound'

import '../../less/global.less'

render((
	<BrowserRouter basename='/user'>
		<div>
			<Nav />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
), document.querySelector('div#root'))
