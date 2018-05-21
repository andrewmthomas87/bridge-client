import * as React from 'react'

import './component.less'

interface IProps {
	title: string
	block?: boolean
	large?: boolean
	disabled?: boolean
	onChange?(value: string): void
	props: Partial<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
}

class TextArea extends React.Component<IProps, {}> {

	public render(): JSX.Element {
		const className: string = `text-area ${this.props.block ? 'block' : ''} ${this.props.large ? 'large' : ''}`

		return (
			<div className={className}>
				<div>{this.props.title}</div>
				<textarea disabled={this.props.disabled} onChange={this._onChange} {...this.props.props} />
			</div>
		)
	}

	private _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		if (this.props.onChange) {
			this.props.onChange(event.currentTarget.value)
		}
	}

}

export default TextArea
