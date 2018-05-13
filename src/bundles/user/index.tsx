import { configure } from 'mobx'

// Only allow updates to observable data inside of actions
configure({ enforceActions: true })

import * as React from 'react'
import { render } from 'react-dom'

import '../../less/global.less'

render(<h1>Hello world</h1>, document.querySelector('div#root'))
