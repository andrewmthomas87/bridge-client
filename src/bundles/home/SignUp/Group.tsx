import * as React from 'react'
import { findDOMNode } from 'react-dom'

import Input from '../../../shared/Input'

class Group extends React.Component<{}, {}> {

	public componentDidMount() {
		((findDOMNode(this.refs['first']) as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
	}

	public render(): JSX.Element {
		return (
			<section>
				<h4>Group</h4>
				<form className='group' onSubmit={this._onSubmit}>
					<Input title='Group name' block={true} props={{ type: 'text' }} ref='first' />
					<Input title='Email' block={true} props={{ type: 'email' }} />
					<Input title='Password' block={true} props={{ type: 'password' }} />
					<Input title='Confirm password' block={true} props={{ type: 'password' }} />
					<button type='submit'>Sign up</button>
				</form>
			</section>
		)
	}

	private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
	}

}

export default Group