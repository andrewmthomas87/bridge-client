import { configure } from 'mobx'

// Only allow updates to observable data inside of actions
configure({ enforceActions: true })

import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Students from './Students'
import Groups from './Groups'
import SignIn from './SignIn'
import SignUp from './SignUp'
import NotFound from './NotFound'

import '../../less/global.less'

render((
	<BrowserRouter>
		<div>
			<Nav />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/students' component={Students} />
				<Route path='/groups' component={Groups} />
				<Route path='/sign-in' component={SignIn} />
				<Route path='/sign-up' component={SignUp} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</BrowserRouter>
), document.querySelector('div#root'))
