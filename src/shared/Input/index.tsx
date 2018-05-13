import * as React from 'react'

import './component.less'

interface IProps {
	title: string
	block?: boolean
	onChange?(value: string): void
	props: Partial<React.InputHTMLAttributes<HTMLInputElement>>
}

class Input extends React.Component<IProps, {}> {

	public render(): JSX.Element {
		const className: string = `input ${this.props.block ? 'block' : ''}`

		return (
			<div className={className}>
				<div>{this.props.title}</div>
				<input onChange={this._onChange} {...this.props.props} />
			</div>
		)
	}

	private _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (this.props.onChange) {
			this.props.onChange(event.currentTarget.value)
		}
	}

}

export default Input
