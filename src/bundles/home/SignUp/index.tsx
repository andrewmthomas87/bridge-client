import * as React from 'react'
import { Link, Route } from 'react-router-dom'

import Student from './Student'
import Group from './Group'

import './component.less'

const TypeSelect: React.StatelessComponent<{}> = (): JSX.Element => (
	<section className='page small'>
		<h3>Sign up as a...</h3>
		<div>
			<Link to='/sign-up/student' onClick={this._onSelectStudent}>Student</Link>
			<Link to='/sign-up/group' onClick={this._onSelectGroup}>Group</Link>
		</div>
	</section>
)

const SignUp: React.StatelessComponent<{}> = (): JSX.Element => (
	<section id='sign-up'>
		<Route exact path='/sign-up' component={TypeSelect} />
		<Route path='/sign-up/student' component={Student} />
		<Route path='/sign-up/group' component={Group} />
	</section>
)

export default SignUp
