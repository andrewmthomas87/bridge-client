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

interface ISignInRequest {
	email: string,
	password: string
}

interface ISignUpRequest {
	isGroup: boolean
	name: string
	email: string
	password: string
	confirmPassword: string
}

interface ISignUpError {
	nameError: string
	emailError: string
	passwordError: string
	confirmPasswordError: string
}

class API {

	public static signIn(email: string, password: string): Promise<boolean> {
		return API._postJSON<ISignInRequest>('/sign-in', { email, password })
			.then((response: Response) => {
				if (response.status === 200) {
					return response.json()
				}
				else {
					throw response.status
				}
			})
			.then((response: IResponse<void, void>) => {
				return response.ok
			})
	}

	public static signUp(isGroup: boolean, name: string, email: string, password: string, confirmPassword: string): Promise<void> {
		return API._postJSON<ISignUpRequest>('/sign-up', { isGroup, name, email, password, confirmPassword })
			.then((response: Response) => {
				if (response.status === 200) {
					return response.json()
				}
				else {
					throw response.status
				}
			})
			.then((response: IResponse<void, ISignUpError>) => {
				if (response.ok) {
					return
				}
				else {
					throw response.error
				}
			})
	}

	private static _postJSON<T>(endpoint: string, data: T): Promise<Response> {
		return fetch(`${config.server.url}${endpoint}`, {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(data),
			credentials: 'include'
		})
	}

}

export { ISignUpRequest, ISignUpError, API as default }
