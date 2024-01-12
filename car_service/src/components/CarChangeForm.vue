<script setup>
import axios from 'axios';
import { useCarStorage } from '../storages/CarStorages';
import { useUserStorage } from '../storages/UserStorage';
import { onBeforeMount, ref } from 'vue';
import { defineProps } from 'vue';
const props = defineProps(['car'])
const userStorage = ref(useUserStorage())
const carStorage = ref(useCarStorage())
const carHolder = {
    mark: '',
	model: '',
	description: '',
	category:'',
    picture: '',
}
let id = 0
const carChange = async () =>{
    console.log(carHolder.picture)
    const repsonce = await axios.put('/api/cars/'+id,carHolder,{
        auth: userStorage.value.auth,
        headers: {
                "Content-Type": "multipart/form-data"
            },

    })
    carStorage.value.setCarsFromServer( userStorage.value.auth)
}

const changePic = (event)=>{
    carHolder.picture = event.target.files[0]
    console.log(carHolder.picture)
}

</script>
<template>
			<form @submit.prevent="carChange">
				<div>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel1">
                                    Измененение машины
								</h5>
							</div>
                            
							<div class="modal-body">
                                <div class="form-group">
									<label for="exampleInputCarMark">Введите id</label>
									<input
                                        type="number"
										class="form-control"
										id="exampleInputCarMark"
										placeholder="1 например"
										v-model="id"
									/>
								</div>
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
								>
									Изменить
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
</template>