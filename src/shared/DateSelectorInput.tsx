import { observable, computed, action } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'

import ControlledInput from './ControlledInput'
import DateSelector, { MONTHS } from './DateSelector'

interface IProps {
	initialMonth: number
	initialYear: number
	initialDay: number
	title: string
	block?: boolean
	large?: boolean
	disabled?: boolean
	onChange?(month: number, year: number, day: number): void
	props: Partial<React.InputHTMLAttributes<HTMLInputElement>>
}

@observer
class DateSelectorInput extends React.Component<IProps, {}> {

	@observable private _$month: number
	@observable private _$year: number
	@observable private _$editingMonth: number
	@observable private _$editingYear: number
	@observable private _$day: number
	@observable private _$active: boolean = false

	@computed private get _$dateString(): string {
		return `${MONTHS[this._$month]} ${this._$day}, ${this._$year}`
	}

	public constructor(props: IProps) {
		super(props)

		this._$month = props.initialMonth
		this._$year = props.initialYear
		this._$editingMonth = this._$month
		this._$editingYear = this._$year
		this._$day = props.initialDay
	}

	public render(): JSX.Element[] {
		const editingMonth: number = this._$editingMonth
		const editingYear: number = this._$editingYear
		const dateString: string = this._$dateString
		const active: boolean = this._$active

		return [
			<ControlledInput key='0' title={this.props.title} value={dateString} block={this.props.block} disabled={this.props.disabled} props={{ ...this.props.props, onFocus: this._onClick }} />,
			<DateSelector key='1' visible={active} month={editingMonth} year={editingYear} onPreviousMonth={this._onPrevious} onNextMonth={this._onNext} onSelect={this._onSelect} onCancel={this._onCancel} />
		]
	}

	@action
	private _onClick = () => {
		if (!this.props.disabled) {
			this._$active = true
		}
	}

	@action
	private _onPrevious = () => {
		this._$editingMonth--
		if (this._$editingMonth < 0) {
			this._$editingMonth = 11
			this._$editingYear--
		}
	}

	@action
	private _onNext = () => {
		this._$editingMonth++
		if (this._$editingMonth > 11) {
			this._$editingMonth = 0
			this._$editingYear++
		}
	}

	@action
	private _onSelect = (day: number) => {
		this._$month = this._$editingMonth
		this._$year = this._$editingYear
		this._$day = day
		this._$active = false

		if (this.props.onChange) {
			this.props.onChange(this._$month, this._$year, this._$day)
		}
	}

	@action
	private _onCancel = () => {
		this._$editingMonth = this._$month
		this._$editingYear = this._$year
		this._$active = false
	}

}

export default DateSelectorInput
