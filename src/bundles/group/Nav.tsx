import * as React from 'react'
import { NavLink } from 'react-router-dom'

const Nav: React.StatelessComponent<{}> = (): JSX.Element => (
	<nav>
		<div>Bridge</div>
		<div>
			<NavLink exact to='/' activeClassName='active'><span>Home</span></NavLink>
			<NavLink to='/profile' activeClassName='active'><span>Profile</span></NavLink>
			<NavLink to='/events' activeClassName='active'><span>Events</span></NavLink>
			<a className='primary' href='/sign-out'><span>Sign out</span></a>
		</div>
	</nav>
)

export default Nav
