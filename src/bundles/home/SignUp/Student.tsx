import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import API, { ISignUpError } from '../API'

import Input from '../../../shared/Input'

@observer
class Student extends React.Component<{}, {}> {

	private _name: string
	private _email: string
	private _password: string
	private _confirmPassword: string

	@observable private _$headerError: string = ''
	@observable private _$error: ISignUpError = {
		nameError: '',
		emailError: '',
		passwordError: '',
		confirmPasswordError: ''
	}

	public componentDidMount() {
		((findDOMNode(this.refs['first']) as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
	}

	public render(): JSX.Element {
		const headerError: string = this._$headerError
		const { nameError, emailError, passwordError, confirmPasswordError }: ISignUpError = this._$error

		return (
			<section className='page small'>
				<h4>Student</h4>
				<form className='student' onSubmit={this._onSubmit}>
					{headerError ? <div className='error'>{headerError}</div> : null}
					<Input title='Name' block={true} onChange={this._onNameChange} props={{ type: 'text' }} ref='first' />
					{nameError ? <div className='error'>{nameError}</div> : null}
					<Input title='Email' block={true} onChange={this._onEmailChange} props={{ type: 'text' }} />
					{emailError ? <div className='error'>{emailError}</div> : null}
					<Input title='Password' block={true} onChange={this._onPasswordChange} props={{ type: 'password' }} />
					{passwordError ? <div className='error'>{passwordError}</div> : null}
					<Input title='Confirm password' block={true} onChange={this._onConfirmPasswordChange} props={{ type: 'password' }} />
					{confirmPasswordError ? <div className='error'>{confirmPasswordError}</div> : null}
					<button type='submit'>Sign up</button>
				</form>
			</section>
		)
	}

	private _onNameChange = (value: string) => {
		this._name = value
	}

	private _onEmailChange = (value: string) => {
		this._email = value
	}

	private _onPasswordChange = (value: string) => {
		this._password = value
	}

	private _onConfirmPasswordChange = (value: string) => {
		this._confirmPassword = value
	}

	private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (this._name && this._email && this._password && this._confirmPassword) {
			API.signUp(false, this._name, this._email, this._password, this._confirmPassword)
				.then(() => {
					window.location.href = '/user'
				}).catch(this._onError)
		}
	}

	@action
	private _onError = (error: ISignUpError | number) => {
		if (typeof error === 'number') {
			this._$headerError = 'Internal server error. Try again later.'
			this._$error = {
				nameError: '',
				emailError: '',
				passwordError: '',
				confirmPasswordError: ''
			}
		}
		else {
			this._$headerError = ''
			this._$error = error
		}
	}

}

export default Student
