<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const authHeader = JSON.parse(localStorage.getItem('header'))
const user = JSON.parse(localStorage.getItem('user'))
const rents = ref(null)
const loading = ref(true)
const error = ref(null)

const getRents = async () => {
	try {
		const response = await axios.get(
			`/cars/rent/user/${user.username}`,{
				headers:{
				authHeader,
			},
			data: carHolder
			}
		)
		rents.value = response.data
	} catch (err) {
		error.value = err.message || 'Error fetching data'
	} finally {
		loading.value = false
	}
}
const deleteRents = async (rent_id) =>{
	axios.delete('/cars/rent/'+rent_id)
}

onMounted(() => {
	if (user.username) {
		getRents()
	}
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
					<a @click="rentDelete(rent.id)" class="btn btn-primary">Отменить покупку</a>
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
