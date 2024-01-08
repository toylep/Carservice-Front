<script setup>
import axios from 'axios'
import Rents from './rents.vue'
import { onBeforeMount, ref, onMounted } from 'vue';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
var cars = ref([])
let user = {
	username:'Не авторизован',
	first_name:'Не авторизован',
	balance: 0.0,
	is_staff:false,
}
let auth = {
	username : 'Не авторизован',
	password : 'Не авторизован'
}
const getUserAndAuth = async ()=>{
	try{
		if (!(JSON.parse(localStorage.getItem('user'))===null)){
			user = JSON.parse(localStorage.getItem('user'))
		}
		if (!(JSON.parse(localStorage.getItem('auth'))===null)){
			auth = JSON.parse(localStorage.getItem('auth'))
		}
	} catch(err){
		console.log('no users')
	}
}
let monthCount = 0
const rentCar = async (car) => {
	getUserAndAuth();
	try {
			if(monthCount!=0){
				console.log(monthCount * car.category.price)
			await axios.post('/api/cars/rent/', {
				car: car.id,
				client: user.id,
				cost: monthCount * car.category.price
			}, {
				auth: {
					username: auth.username,
					password: auth.password
				},

			})
		}
		else alert('Нельзя арендовывать на 0 месяцев :/')
	} catch (err) {
		if (err.response.status===400){
			alert('Эта машина уже арендована')
		}
		
		else alert('У вас недостаточно средств')

	}
}
const getCars = async () => {
	console.log('getcars')
	try {
		const response = await axios.get(
			'/api/cars/list', {
			auth: {
				username: auth.username,
				password: auth.password
			}
		})
		// console.log(response.data)
		cars.value = []
		response.data.forEach((el) => {
			cars.value.unshift(el)
		}
		)
		console.log(cars.value)
	} catch (err) {
		console.log('hmm')
		console.log(err)

	}
}


const deleteCar = async (id) => {
	getUserAndAuth();
	console.log('deleteuser')
	console.log(user)
	try {
	await axios.delete('/api/cars/' + id, {
		auth: {
			username: auth.username,
			password: auth.password
		},
	})
	}catch(err){
		alert('У вас нет прав админа')
	}
	getCars()
}
onBeforeMount(() => {
	getUserAndAuth();
	getCars();
	// getHeader();
})

</script>
<template>
	<div>

		<head>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
				crossorigin="anonymous" />
		</head>

		<div class="wrapper d-flex flex-wrap">
			<div class="card list flex" v-for="car in cars"
				:style="{ width: '18rem', borderColor: 'black', margin: '10px' }">
				<img :src="car.picture" class="card-img-top" style="height: 200px" />
				<div class="card-body bg-dark">
					<h5 class="card-title" style="color: white">
						{{ car.mark }} {{ car.model }}
					</h5>
					<p class="card-text" style="color: white">{{ car.description }}</p>
					
					<form>
						<label style="color: white;" for="monthCount">На сколько месяцев?</label>
						<input style="width: 40px;margin-left: 10px;" id="monthCount" type="number" v-model="monthCount">
					</form>
					<a @click="rentCar(car)" class="btn btn-primary" :key="user.is_staff" v-if="!user.is_staff">
						{{ car.category.price }}$/мес Арендовать
					</a>
					
					<template v-else>
						<p class="card-text" style="color: white">Id машины - {{ car.id }} </p>
						<a @click="rentCar(car)" class="btn btn-primary">{{ car.category.price }}$/мес Арендовать</a>
						<br />
						<br />
						<a class="btn btn-danger" @click="deleteCar(car.id)">Удалить</a>
					</template>
				</div>
			</div>
		</div>
		<div class="flex-wrap" style="margin: 10px;">
			<Rents></Rents>
		</div>
	</div>
</template>

<style>
.wrapper {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
	overflow-x: hidden;
	flex-wrap: wrap;
}
</style>
