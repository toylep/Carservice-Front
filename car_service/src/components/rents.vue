<script setup>
import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import { useUserStorage } from '../storages/UserStorage';
import { useRentStorage } from '../storages/RentStorage';
import { useCarStorage } from '../storages/CarStorages';
const carsStorage = ref(useCarStorage())
const rentStorage = ref(useRentStorage())
const userStorage = ref(useUserStorage())
var rents = ref([])

const deleteRents = async (rent_id) =>{
	await axios.delete('/api/cars/rent/'+rent_id)
	rentStorage.value.setRentsFromServer(userStorage.value.auth)
	carsStorage.value.setCarsFromServer(userStorage.value.auth)
}

onBeforeMount(() => {
	rentStorage.value.setRentsFromServer(userStorage.value.auth)
})
</script>

<template>
	<div style="margin-top: 10px">
			<div class="card-header bg-dark" style="color: white; margin-top: 10px">
				Ваши аренды
			</div>
			<div v-if="rentStorage.rents && rentStorage.rents.length === 0">У вас пока нет аренд</div>
			<div v-else-if="rentStorage.rents">
				<div
					class="card bg-dark"
					style="margin-top: 10px"
					v-for="rent in rentStorage.rents"
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
