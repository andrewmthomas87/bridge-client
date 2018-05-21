import config from 'config'

interface ISuccessResponse<T> {
	ok: true
	data: T
}

interface IErrorResponse<T> {
	ok: false
	error: T
}

type IResponse<T, U> = ISuccessResponse<T> | IErrorResponse<U>

interface IUserData {
	id: number
	isGroup: boolean
	name: string
	email: string
}

interface ICreateEventRequest {
	title: string
	location: string
	month: number
	year: number
	day: number
	description: string
}

class API {

	public static getUser(): Promise<IUserData> {
		return this._postJSON<void>('/api/get-user', undefined)
			.then(response => response.json())
			.then((response: IResponse<IUserData, void>) => {
				if (response.ok) {
					return response.data
				}
				else {
					throw -1
				}
			})
	}

	public static createEvent(title: string, location: string, month: number, year: number, day: number, description: string): Promise<void> {
		return this._postJSON<ICreateEventRequest>('/api/create-event', { title, location, month, year, day, description })
			.then(() => { })
	}

	private static _postJSON<T>(endpoint: string, data: T): Promise<Response> {
		return fetch(`${config.server.url}${endpoint}`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(data),
			credentials: 'include'
		}).then((response: Response) => {
			if (response.status === 200) {
				return response
			}
			else {
				throw response.status
			}
		})
	}

}

export { IUserData, API as default }
