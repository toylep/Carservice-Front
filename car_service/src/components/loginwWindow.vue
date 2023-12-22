<script setup>
import axios from 'axios'
import { ref } from 'vue'

const userHolder = {
	username: ref(''),
	name: ref(''),
	password: ref(''),
	email: ref(''),
	is_staff: ref(false),
	balance: ref(0),
}

const authHolder = {
	username: ref(''),
	password: ref(''),
}

const regUser = async () => {
	try {
		await axios.post('http://localhost:8000/users/reg/', userHolder)
	} catch (error) {
		console.error('Error registering user:', error)
	}
}

const authUser = async () => {
	try {
		const authData = window.btoa(
			`${authHolder.username.value}:${authHolder.password.value}`
		)
		localStorage.setItem('authData', JSON.stringify(authData))

		const response = await axios.get(
			`http://localhost:8000/users/${authHolder.username.value}`
		)
		const userData = response.data

		localStorage.setItem('user', JSON.stringify(userData))
		console.log(userData)
	} catch (error) {
		console.error('Error fetching user data:', error)
	}
}

const getCars = () => {
	// Implement logic to get cars if needed
}
onMounted(getCars)
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

		<!-- Modal for Login -->
		<div>
			<form @submit.prevent="authUser">
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
									<label for="exampleInputUsername">Ваш юзернейм</label>
									<input
										class="form-control"
										id="exampleInputUsername"
										placeholder="Username"
										v-model="authHolder.username"
									/>
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
								<!-- ... Other form elements ... -->
								<button type="submit" class="btn btn-primary">
									Авторизоваться
								</button>
							</div>
							<!-- ... Modal footer ... -->
						</div>
					</div>
				</div>
			</form>
		</div>

		<!-- Modal for Registration -->
		<div>
			<form @submit.prevent="regUser">
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
								<h5 class="modal-title" id="staticBackdropLabel">
									Регистрация
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
									<!-- ... Rest of the form elements for registration ... -->
								</div>
								<button class="btn btn-primary">Зарегистрироваться</button>
							</div>
							<!-- ... Modal footer ... -->
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
