<script setup>

import axios from 'axios'
import { ref } from 'vue'

const carHolder = {
    mark: ref(''),
	model: ref(''),
	description: ref(''),
	category: ref(''),
    picture: ref(''),
}
const addCar = async ()=>{
	try{
		console.log('1')
		await axios.post('http://localhost:8000/cars/',carHolder)
	}catch(err){
		console.log(err)
	}
}
const user = JSON.parse(localStorage.getItem('user'))
</script>

<template>
    <div>
        <span v-if="user.is_staff===true"
        class="ms-1 d-none d-sm-inline"
        aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#addCar"
        >Добавить машину
        </span>

		<div>
			<form @submit.prevent="addCar">
				<div
					class="modal fade"
					id="addCar"
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
                                    Добавление машины
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
									<label for="exampleInputCarMark">Введите марку</label>
									<input
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Username"
										v-model="carHolder.mark"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarModel">Введите модель</label>
									<input
										class="form-control"
										id="exampleInputCarModel"
										placeholder="Username"
										v-model="carHolder.model"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarDesc">Введите описание</label>
									<input
										class="form-control"
										id="exampleInputCarDesc"
										placeholder="Username"
										v-model="carHolder.description"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarPic">Добавьте урлу картинки</label>
									<input
										class="form-control"
										id="exampleInputCarPic"
										placeholder="Username"
										v-model="carHolder.picture"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarСategory">Добавьте категорию</label>
									<input
										class="form-control"
										id="exampleInputCarСategory"
										placeholder="Категория"
										v-model="carHolder.category"
									/>
								</div>
								<button 
								action="/" 
								class="btn btn-primary" 
								type="submit"
								data-bs-target="#addCar"
								data-bs-toggle="modal"
								@click="addCar"
								>
									Добавить
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
    </div>

</template>