<script>
import axios from 'axios'
import Rents from './rents.vue'

export default {
	name: 'mainbody',
	data() {
		return {
			url: 'http://localhost:8000',
			cars: [],
			user: JSON.parse(localStorage.getItem('user')),
		}
	},
	methods: {
		async getCars() {
			const response = await fetch(this.url + '/cars/', {})
			const data = await response.json()
			this.cars = data
		},
		async deleteCar(id) {
			await axios.delete(this.url + '/cars/' + id)
			this.getCars()
		},
		async createCar(mark, model, description) {
			await axios.post(this.url + '/cars/', {
				mark: mark,
				model: model,
				description: description,
			})
		},
	},
	created() {
		this.getCars()
		// console.log(this.user);
	},
	components: { Rents, Rents },
}
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
				v-for="car in cars"
				:key="car.id"
				class="card list flex-fill"
				:style="{ width: '18rem', borderColor: 'black', margin: '10px' }"
			>
				<img :src="car.picture" class="card-img-top" style="height: 200px" />
				<div class="card-body bg-dark">
					<h5 class="card-title" style="color: white">
						{{ car.mark }} {{ car.model }}
					</h5>
					<p class="card-text" style="color: white">{{ car.description }}</p>
					<a href="#" class="btn btn-primary" v-if="!user.is_staff"
						>Арендовать</a
					>
					<template v-else>
						<a href="#" class="btn btn-primary">Арендовать</a>
						<br />
						<br />
						<a href="" class="btn btn-secondary">Изменить</a>
						<a class="btn btn-danger" @click="deleteCar(car.id)">Удалить</a>
					</template>
				</div>
			</div>
		</div>
		<div>
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
