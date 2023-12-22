<script>
import axios from 'axios'
export function authHeader() {
	// return authorization header with basic auth credentials
	let authData = JSON.parse(localStorage.getItem('authData'))
	console.log(authData)
	if (authData) {
		console.log({ Authorization: 'Basic ' + authData })
		return { Authorization: 'Basic ' + authData }
	} else {
		console.log({ Authorization: 'Basic ' + authData })
		return {}
	}
}
export default {
	name: 'loginWindow',
	data() {
		return {
			userHolder: {
				username: '',
				name: '',
				password: '',
				email: '',
				is_staff: false,
				balance: 0,
			},
			authHolder: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		regUser() {
			axios.post('http://localhost:8000/users/reg/', this.userHolder)
		},
		async authUser() {
			try {
				console.log(this.authHolder.username)
				let authData = window.btoa(
					this.authHolder.username + ':' + this.authHolder.password
				)
				localStorage.setItem('authData', JSON.stringify(authData))
				console.log(1)
				console.log('http://localhost:8000/users/' + this.authHolder.username)

				const response = await axios.get(
					'http://localhost:8000/users/' + this.authHolder.username,
					{}
				)

				const userData = response.data

				localStorage.setItem('user', JSON.stringify(userData))
				console.log(userData)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		},
	},
	// created(){
	//     this.getCars()
	// }
}
</script>

<template>
	<div>
		<a
			class="nav-link active"
			aria-current="page"
			data-bs-toggle="modal"
			data-bs-target="#login"
		>
			Авторизоваться
		</a>

		<!-- Modal -->
		<div>
			<form>
				<div
					class="modal fade"
					id="login"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabindex="-1"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true"
				>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">
									Авторизация
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<div class="form-group">
										<label for="exampleInputUsername">Ваш юзернейм</label>
										<input
											class="form-control"
											id="exampleInputUsername"
											placeholder="Username"
											v-model="authHolder.username"
										/>
									</div>
								</div>
								<div class="form-group">
									<label for="exampleInputPassword1">Password</label>
									<input
										type="password"
										class="form-control"
										id="exampleInputPassword1"
										placeholder="Password"
										v-model="authHolder.password"
									/>
								</div>
								<div class="form-check">
									<input
										type="checkbox"
										class="form-check-input"
										id="exampleCheck1"
									/>
									<label class="form-check-label" for="exampleCheck1"
										>Check me out</label
									>
								</div>
								<button
									@click="this.authUser()"
									type="submit"
									class="btn btn-primary"
								>
									Авторизоваться
								</button>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button
									type="button"
									class="btn btn-primary"
									data-bs-toggle="modal"
									data-bs-target="#register"
								>
									Нет аккаунта?
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div>
			<div
				class="modal fade"
				id="register"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabindex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">Регистрация</h5>
							<button
								type="button"
								class="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body">
							<div class="form-group">
								<label for="exampleInputName">Как к вам обращаться?</label>
								<input
									class="form-control"
									id="exampleInputName"
									placeholder="Ваше имя"
									v-model="userHolder.name"
								/>
							</div>
							<div class="form-group">
								<label for="exampleInputUsername">Ваш юзернейм</label>
								<input
									class="form-control"
									id="exampleInputUsername"
									placeholder="Username"
									v-model="userHolder.username"
								/>
							</div>
							<div class="form-group">
								<label for="exampleInputEmail1">Email</label>
								<input
									type="email"
									class="form-control"
									id="exampleInputEmail1"
									placeholder="Enter email"
									v-model="userHolder.email"
								/>
							</div>
							<div class="form-group">
								<label for="exampleInputPassword">Password</label>
								<input
									type="password"
									class="form-control"
									id="exampleInputPassword"
									placeholder="Password"
									v-model="userHolder.password"
								/>
							</div>
							<div class="form-check">
								<input
									type="checkbox"
									class="form-check-input"
									id="exampleCheck1"
								/>
								<label class="form-check-label" for="exampleCheck1"
									>Check me out</label
								>
							</div>
							<div class="form-group">
								<label for="exampleInputEmail1">Баланс</label>
								<input
									class="form-control"
									id="exampleInputEmail1"
									placeholder="Ваш баланс(Да,это костыль)"
									v-model="userHolder.balance"
								/>
							</div>
							<button @click="regUser()" class="btn btn-primary">
								Зарегиситрироваться
							</button>
						</div>
						<div class="modal-footer">
							<button
								type="button"
								class="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button
								type="button"
								class="btn btn-primary"
								data-bs-toggle="modal"
								data-bs-target="#login"
							>
								Уже есть аккаунт?
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
