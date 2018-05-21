import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import API from '../API'

import Input from '../../../shared/Input'

import './component.less'

@observer
class SignIn extends React.Component<{}, {}> {

	@observable private _$error: string = ''

	public componentDidMount() {
		((findDOMNode(this.refs['email']) as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
	}

	public render(): JSX.Element {
		const error: string = this._$error

		return (
			<section id='sign-in'>
				<section className='page small'>
					<h4>Sign in</h4>
					<form onSubmit={this._onSubmit}>
						{error ? <div className='error'>{error}</div> : null}
						<Input title='Email' block={true} props={{ type: 'text' }} ref='email' />
						<Input title='Password' block={true} props={{ type: 'password' }} ref='password' />
						<button type='submit'>Sign in</button>
					</form>
				</section>
			</section>
		)
	}

	private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const email: string = ((findDOMNode(this.refs['email']) as HTMLDivElement).querySelector('input') as HTMLInputElement).value
		const password: string = ((findDOMNode(this.refs['password']) as HTMLDivElement).querySelector('input') as HTMLInputElement).value

		API.signIn(email, password).then((ok: boolean) => {
			if (ok) {
				window.location.href = '/user'
			}
			else {
				this._onError()
			}
		}).catch(this._onError)
	}

	@action
	private _onError = () => {
		this._$error = 'Invalid email/password combination'
	}

}

export default SignIn
