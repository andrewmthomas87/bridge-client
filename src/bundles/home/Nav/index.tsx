import * as React from 'react'
import { NavLink } from 'react-router-dom'

import './component.less'

const Nav: React.StatelessComponent<{}> = (): JSX.Element => (
	<nav>
		<div>Bridge</div>
		<div>
			<NavLink to='/' activeClassName='active'><span>Home</span></NavLink>
			<NavLink to='/students' activeClassName='active'><span>Students</span></NavLink>
			<NavLink to='/groups' activeClassName='active'><span>Groups</span></NavLink>
			<NavLink to='/sign-in' activeClassName='active'><span>Sign in</span></NavLink>
			<NavLink className='primary' to='/sign-up' activeClassName='active'><span>Sign up</span></NavLink>
		</div>
	</nav>
)

export default Nav
