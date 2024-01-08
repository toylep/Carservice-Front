<script setup>

import axios from 'axios'
import { onBeforeMount, ref } from 'vue'
import getCars from './mainbody.vue'
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
const carHolder = {
    mark: '',
	model: '',
	description: '',
	category:'',
    picture: '',
}
let categories = []
const addCar = async ()=>{
	getUserAndAuth();
	try{
		console.log(user)
		await axios.post('/api/cars/',carHolder,
		{
			auth:{
				username:auth.username,
				password:auth.password,
			},
		}
		)
	}catch(err){
		alert('У вас нет прав админа')
	}

}
onBeforeMount(()=>{
getUserAndAuth()
})
</script>

<template>
    <div>
        <h5 v-if="user.is_staff===true"
        class="ms-1 d-none d-sm-inline"
        aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#addCar"
        >Добавить машину
	</h5>

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
									<label for="exampleInputCarPic">Добавьте урлу картинки</label>
									<input
										class="form-control"
										id="exampleInputCarPic"
										placeholder="url"
										v-model="carHolder.picture"
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