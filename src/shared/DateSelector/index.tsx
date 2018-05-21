import * as React from 'react'

import './component.less'

const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface IProps {
	visible: boolean
	month: number
	year: number
	onPreviousMonth(): void
	onNextMonth(): void
	onSelect(day: number): void
	onCancel(): void
}

class DateSelector extends React.Component<IProps, {}> {

	private get _monthLength(): number {
		switch (this.props.month) {
			case 0:
				return 31
			case 1:
				if ((this.props.year % 4 === 0 && this.props.year % 100 !== 0) || this.props.year % 400 === 0) {
					return 29
				}

				return 28
			case 2:
				return 31
			case 3:
				return 30
			case 4:
				return 31
			case 5:
				return 30
			case 6:
				return 31
			case 7:
				return 31
			case 8:
				return 30
			case 9:
				return 31
			case 10:
				return 30
			case 11:
				return 31
			default:
				return 0
		}
	}

	private get _dayOffset(): number {
		return new Date(this.props.year, this.props.month).getDay()
	}

	public render(): JSX.Element {
		const dayElements: JSX.Element[] = []
		if (this.props.visible) {
			for (let i = 0; i < 42; i++) {
				if (i >= this._dayOffset && i - this._dayOffset < this._monthLength) {
					dayElements.push(<div key={i} className='day' data-day={i - this._dayOffset + 1} onClick={this._onSelect}>{i - this._dayOffset + 1}</div>)
				}
				else {
					dayElements.push(<div key={i} className='empty' />)
				}
			}
		}

		return (
			<section className={`modal-background ${this.props.visible ? 'visible' : ''}`} onClick={this._onCancel}>
				<section className='page'>
					<h4>Select date</h4>
					<section className='date-selector'>
						<div className='controls'>
							<a onClick={this.props.onPreviousMonth}>{'<'}</a>
							<h3>{MONTHS[this.props.month]}, {this.props.year}</h3>
							<a onClick={this.props.onNextMonth}>{'>'}</a>
						</div>
						<div className='calendar'>
							<div className='labels'>
								<div>Sun</div>
								<div>Mon</div>
								<div>Tue</div>
								<div>Wed</div>
								<div>Thu</div>
								<div>Fri</div>
								<div>Sat</div>
							</div>
							<div className='days'>{dayElements}</div>
						</div>
					</section>
				</section>
			</section>
		)
	}

	private _onSelect = (event: React.MouseEvent<HTMLDivElement>) => {
		const day: number = parseInt(event.currentTarget.getAttribute('data-day') || '')
		if (!isNaN(day)) {
			this.props.onSelect(day)
		}
	}

	private _onCancel = (event: React.MouseEvent<HTMLElement>) => {
		if (event.currentTarget === event.target) {
			this.props.onCancel()
		}
	}

}

export { MONTHS, DateSelector as default }
