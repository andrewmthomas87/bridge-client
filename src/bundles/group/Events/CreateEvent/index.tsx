import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { findDOMNode } from 'react-dom'
import { RouteComponentProps } from 'react-router-dom'

import API from '../../API'

import Input from '../../../../shared/Input'
import TextArea from '../../../../shared/TextArea'
import DateSelectorInput from '../../../../shared/DateSelectorInput'

import './component.less'

@observer
class CreateEvent extends React.Component<RouteComponentProps<void>, {}> {

	@observable private _$loading: boolean = false

	private _month: number
	private _year: number
	private _day: number

	public constructor(props: any) {
		super(props)

		const date: Date = new Date()
		this._month = date.getMonth()
		this._year = date.getFullYear()
		this._day = date.getDate()
	}

	public render(): JSX.Element {
		const loading: boolean = this._$loading

		return (
			<section className='page'>
				{loading ? <div id='loading' /> : null}
				<h4>Create event</h4>
				<form onSubmit={this._onSubmit}>
					<Input title='Title' block={true} large={true} disabled={loading} props={{ type: 'text' }} ref='title' />
					<Input title='Location' block={true} disabled={loading} props={{ type: 'text' }} ref='location' />
					<DateSelectorInput initialMonth={this._month} initialYear={this._year} initialDay={this._day} title='Date' block={true} disabled={loading} onChange={this._onDateChange} props={{}} ref='date' />
					<TextArea title='Description' block={true} disabled={loading} props={{ rows: 4 }} ref='description' />
					<button type='submit' disabled={loading}>Create</button>
				</form>
			</section>
		)
	}

	private _onDateChange = (month: number, year: number, day: number) => {
		this._month = month
		this._year = year
		this._day = day
	}

	@action
	private _onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (this._$loading) {
			return
		}

		const title: string = ((findDOMNode(this.refs['title']) as HTMLDivElement).querySelector('input') as HTMLInputElement).value
		const location: string = ((findDOMNode(this.refs['location']) as HTMLDivElement).querySelector('input') as HTMLInputElement).value
		const description: string = ((findDOMNode(this.refs['description']) as HTMLDivElement).querySelector('textarea') as HTMLTextAreaElement).value
		if (title && location) {
			this._$loading = true
			API.createEvent(title, location, this._month, this._year, this._day, description)
				.then(() => {
					this.props.history.push('/events')
				})
				.catch(action(() => {
					this._$loading = false
				}))
		}
	}

}

export default CreateEvent
