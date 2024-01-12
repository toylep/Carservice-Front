<script setup>

import axios from 'axios'
import { useCarStorage } from '../storages/CarStorages';
import { useUserStorage } from '../storages/UserStorage';
import { ref } from 'vue';
const carsStorage = ref(useCarStorage())
const userStorage = ref(useUserStorage())
const carHolder = {
    mark: '',
	model: '',
	description: '',
	category:'',
    picture: '',
}
let categories = []
const file = ref(null)
const addCar = async ()=>{
	try{
        console.log(carHolder.picture)
		await axios.post('/api/cars/',carHolder,
		{
			auth:{
				username:userStorage.value.auth.username,
				password:userStorage.value.auth.password,
			},
            headers: {
                "Content-Type": "multipart/form-data"
            },
		})
		.then(res=>res.data)
		.then(data=>carsStorage.value.setCarsFromServer(userStorage.value.auth))
	}catch(err){
		alert('У вас нет прав админа')
		console.log(err)
	}

}
const changePic = (event)=>{
    carHolder.picture = event.target.files[0]
}
</script>

<template>
		<div>
			<form @submit.prevent="addCar">
				<div>
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
										placeholder="Марка"
										v-model="carHolder.mark"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarModel">Введите модель</label>
									<input
										class="form-control"
										id="exampleInputCarModel"
										placeholder="Модель"
										v-model="carHolder.model"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarDesc">Введите описание</label>
									<input
										class="form-control"
										id="exampleInputCarDesc"
										placeholder="Ну какое-нибудь описание"
										v-model="carHolder.description"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarPic">Добавьте картинку</label>
									<input
										type="file"
										class="form-control"
										id="exampleInputCarPic"
                                        ref="file"
										v-on:change="changePic"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarСategory">Добавьте категорию</label>
									<select class="form-select" aria-label="Default select example" v-model="carHolder.category">
										<option value="1">Дорогая</option>
										<option value="2">Средняя</option>
										<option value="3">Дешевая</option>
									</select>
								</div>
								<button 
								action="/" 
								class="btn btn-primary" 
								type="submit"
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

</template>