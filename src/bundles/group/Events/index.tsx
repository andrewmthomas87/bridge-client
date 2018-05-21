import * as React from 'react'
import { Link } from 'react-router-dom'

import './component.less'

class Events extends React.Component<{}, {}> {

	public render(): JSX.Element {
		return (
			<section id='events'>
				<section className='page large'>
					<h3>EPIC Events</h3>
					<Link to='/create-event'>Create event</Link>
				</section>
			</section>
		)
	}

}

export default Events
