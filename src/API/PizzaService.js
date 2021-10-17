import jwtDecode from "jwt-decode";
const BASE_URL = 'https://api.kronst.dev/pizza-di-roma';

export default class PizzaService {
	static async getAllProducts() {
		const response = await this.tokenInterceptor(() => fetch(`${BASE_URL}/api/v1/products?all=true`));
		return await response.json();
	}

	static async createProduct(product) {
		const response = await this.tokenInterceptor(() => fetch(`${BASE_URL}/api/v1/products`, {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${localStorage.getItem('authToken')}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(product)
		}));
		return response.status;
	}

	static async updateProduct(product) {
		const response = await this.tokenInterceptor(() => fetch(`${BASE_URL}/api/v1/products`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify(product)
		}));
		return response.status;
	}

	static async getProduct(id) {
		const response = await this.tokenInterceptor(() => fetch(`${BASE_URL}/api/v1/products/${id}`));
		return await response.json();
	}

	static async sendImage(formData) {
		const response = await this.tokenInterceptor(() => fetch(`${BASE_URL}/files/image`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('authToken')}`
			},
			body: formData
		}));
		return await response.json();
	}

	static async login(userData) {
		userData = {...userData, pushToken: ''};
		const response = await fetch(`${BASE_URL}/api/v1/auth/login`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData)
		})

		if (response.status === 200) {
			return await response.json();
		} else {
			console.error(`Nakrilo pizdoi, kapitan: ${response}`)
		}
	}

	static async logout(refreshToken) {
		const data = {refreshToken: refreshToken};
		const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		if (response.status === 204) {
			return response;
		} else {
			console.error(`Nakrilo pizdoi, kapitan: ${response}`)
		}
	}

	static async refreshToken(refreshToken) {
		const data = {refreshToken: refreshToken};
		const response = await fetch(`${BASE_URL}/api/v1/auth/refresh`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})

		console.log(response)
		if (response.status === 200) {
			return response.json();
		} else {
			console.error(`Nakrilo pizdoi, kapitan: ${response.status}`)
			return response.status;
		}
	}



	static async tokenInterceptor(fetch) {
		const tokenExpDate = jwtDecode(localStorage.getItem('authToken')).exp * 1000;
		const isTokenExp = (new Date().getTime() + 60000) > tokenExpDate;

		try {
			if (isTokenExp) {
				return await this.refreshToken(localStorage.getItem('authRefreshToken'))
					.then((response)  => {
						if (response.accessToken) {
							localStorage.setItem('authToken', response?.accessToken);
							localStorage.setItem('authRefreshToken', response?.refreshToken);
							return fetch();
						} else {
							console.error('В интерцептор вернуло ебаный ответ от сервера: '+ response)
						}

					})
			} else {
				return await fetch();
			}
		} catch (e) {
			console.error('Situacia: ' + e);
		}

	}
}

