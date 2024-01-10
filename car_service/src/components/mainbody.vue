<script setup>
import axios from 'axios';
import rents from './rents.vue';
import { onBeforeMount, ref } from 'vue';
import {useCarStorage} from '../storages/CarStorages'
import { useUserStorage } from '../storages/UserStorage';
import { useRentStorage } from '../storages/RentStorage';

const carsStorage = ref(useCarStorage())
const userStorage = ref(useUserStorage())
const rentStorage = ref(useRentStorage())
let monthCount = 0
const rentCar = async (car) => {
	try {
			if(monthCount!=0){
				console.log(monthCount * car.category.price)
			await axios.post('/api/cars/rent/', {
				car: car.id,
				client: userStorage.value.user.id,
				cost: monthCount * car.category.price
			}, {
				auth: {
					username: userStorage.value.auth.username,
					password: userStorage.value.auth.password
				},

			})
		}
		else alert('Нельзя арендовывать на 0 месяцев :/')
	} catch (err) {
		console.log(err)
		if (err.response.status===400){
			alert('Эта машина уже арендована')
		}
		else alert('У вас недостаточно средств')
	}
	carsStorage.value.setCarsFromServer(userStorage.value.auth)
	rentStorage.value.setRentsFromServer(userStorage.value.auth)
	userStorage.value.setUserFromServer()
}

onBeforeMount(()=>{
	carsStorage.value.setCarsFromServer(userStorage.value.auth)
}
)

const deleteCar = async (id) => {

	try {
	await axios.delete('/api/cars/' + id, {
		auth: {
			username: userStorage.value.auth.username,
			password: userStorage.value.auth.password
		},
	})
	}catch(err){
		alert('У вас нет прав админа')
		console.log(err)
	}
	carsStorage.value.setCarsFromServer(userStorage.value.auth)
}


</script>
<template>
	<div>

		<head>
			<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
				integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
				crossorigin="anonymous" />
		</head>

		<div class="wrapper d-flex flex-wrap">
			<div class="card list flex" v-for="car in carsStorage.cars"
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
					<a @click="rentCar(car)" class="btn btn-primary" v-if="!userStorage.user.is_staff">
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
			<rents></rents>
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
