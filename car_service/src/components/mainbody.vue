<script>
import axios from 'axios'

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
			// console.log(localStorage.getItem('user'))
			const response = await fetch(this.url + '/cars/', {
				// headers:{
				//     authHeader
				// }
			})
			// console.log(authHeader);
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
}
</script>

<template>
	<head>
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
			crossorigin="anonymous"
		/>
	</head>
		<div class="container-lg" >
			<div class="row">
				<div class="col-sm" v-for="car,index in cars">
					<div
						class="card"
						style="width: 18rem; border-color: black"
						v-if="this.user.is_staff == false && index<5"
					>
						<img :src="car.picture" class="card-img-top" style="height: 200px;"/>
						<div class="card-body bg-dark">
							<h5 class="card-title" style="color: white">
								{{ car.mark }} {{ car.model }}
							</h5>
							<p class="card-text" style="color: white">{{ car.description }}</p>
							<a href="#" class="btn btn-primary">Арендовать</a>
						</div>
					</div>
					<div class="card" style="width: 18rem; border-color: black" 
					v-else
					v-if="index<5"
					>
						<img :src="car.picture" class="card-img-top" style="height: 200px;"/>
						<div class="card-body bg-dark">
							<h5 class="card-title" style="color: white">
								{{ car.mark }} {{ car.model }}
							</h5>
							<p class="card-text" style="color: white">{{ car.description }}</p>
							<a href="#" class="btn btn-primary">Арендовать</a>
							<br />
							<br />
							<a href="" class="btn btn-secondary">Изменить</a>
							<a class="btn btn-danger" @click="deleteCar(car.id)">Удалить</a>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>
