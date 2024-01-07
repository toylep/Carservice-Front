<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
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
	user = JSON.parse(localStorage.getItem('user'))
	auth = JSON.parse(localStorage.getItem('auth'))
}
const rents = ref([])

const getRents = async () => {
	getUserAndAuth();
	try {
		const response = await axios.get(
			`/api/cars/rent/user/${user.username}`,
			{
				auth:{
					username:auth.username,
					password:auth.password,
				}
			}
			
		)
		console.log(response.data)
		response.data.forEach((el)=>{
			rents.value.unshift(el)
		})
	} catch (err) {
		error.value = err.message || 'Error fetching data'
	} 
}
const deleteRents = async (rent_id) =>{
	await axios.delete('/api/cars/rent/'+rent_id)
}

onMounted(() => {
	getUserAndAuth();
	getRents();
	
})
</script>

<template>
	<div style="margin-top: 10px">
		<div class="card-header bg-dark" style="color: white; margin-top: 10px">
			Ваши аренды
		</div>
		<div style="color: white" v-if="loading">Loading...</div>
		<div style="color: white" v-if="error">
			Похоже у вас еще нет Аренд...
		</div>
		<div v-else-if="rents && rents.length === 0">У вас пока нет аренд</div>
		<div v-else-if="rents">
			<div
				class="card bg-dark"
				style="margin-top: 10px"
				v-for="rent in rents"
				:key="rent.id"
			>
				<div class="card-header" style="color: white">
					{{ rent.car.mark }} {{ rent.car.model }}
				</div>
				<div class="card-body">
					<h5 class="card-title" style="color: white">Арендовано вами</h5>
					<p class="card-text" style="color: white">
						Арендовано до {{ rent.end_date }}
					</p>
					<a @click="deleteRents(rent.id)" class="btn btn-primary">Отменить покупку</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.rent {
	background-color: darkgray;
	width: 90%;
}
</style>
