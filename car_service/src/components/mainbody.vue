<script setup>
import axios from 'axios'
import Rents from './rents.vue'
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
// axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true
var cars = ref([])
let user = {
	username:'demo',
	password:'demo',
	is_staff:false,
}

let auth = JSON.parse(localStorage.getItem('auth'))

const getUser = async ()=>{
	if (JSON.parse(localStorage.getItem('user')) != null){
		user = JSON.parse(localStorage.getItem('user'))
	}
}
const rentCar = async (car_id) => {
	try{

		await axios.post('api/cars/rent/', {
			auth:{
			username:auth.username,
			password:auth.password
			},
			car: car_id,
			client: user.id,
		})
	}catch(err){
		alert('Эта машина уже арендована')
	}
}
const getCars = async ()=>{
	try{
		const response = await axios.get(
			'api/cars/', {
		auth:{
			username:auth.username,
			password:auth.password
		}
		})
		console.log(response.data)
		response.data.forEach(element => {
			cars.value.unshift(element)
		});
		console.log(cars)
	}catch(err){
		console.log('hmm')
		console.log(err)

	}
}

const deleteCar= async (id) =>{
	await axios.delete('api/cars/' + id,{
		auth:{
			username:auth.username,
			password:auth.password
			},
	})
	this.getCars()
}
onMounted(()=>{
	getCars();
	getUser();
	// getHeader();
})
</script>
<template>
	<div>
		<head>
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
				rel="stylesheet"
				integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
				crossorigin="anonymous"
			/>
		</head>

		<div class="wrapper d-flex flex-wrap">
			<div
				class="card list flex"
				v-for="car,index in cars"
				:style="{ width: '18rem', borderColor: 'black', margin: '10px' }"
			>
				<img :src="car.picture"  class="card-img-top" style="height: 200px" />
				<div class="card-body bg-dark">
					<h5 class="card-title"  style="color: white">
						{{ car.mark }} {{ car.model }}
					</h5>
					<p class="card-text" style="color: white" >{{ car.description }}</p>
					<a  @click="rentCar(car.id)" class="btn btn-primary" :key="user.is_staff" v-if="!user.is_staff" >
					Арендовать
					</a>
					<template
					 v-else
					 >
					 <p class="card-text" style="color: white">Id машины - {{ car.id }} </p>
						<a @click="rentCar(car.id)" class="btn btn-primary">Арендовать</a>
						<br />
						<br />
						<a class="btn btn-danger" @click="deleteCar(car.id)">Удалить</a>
					</template>
				</div>
			</div>
		</div>
		<div class="flex-wrap"
		style="margin: 10px;"
		>
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
