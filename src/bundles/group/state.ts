import { observable, action } from 'mobx'

import config from 'config'
import API, { IUserData } from './API'

class State {

	@observable.ref public $user: IUserData | null = null

	public getUser() {
		const startTime: number = Date.now()
		API.getUser().then((user: IUserData) => {
			setTimeout(action(() => {
				this.$user = user
			}), Math.max(config.loadingMinimumTime - (Date.now() - startTime), 0))
		})
	}

}

export default new State()
