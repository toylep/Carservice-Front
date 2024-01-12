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
const carChange = async () =>{
    // console.log(car)
    const repsonce = await axios.put('/api/cars/'+carStorage.value.change_id,carHolder,{
        auth: userStorage.value.auth
    })
    carStorage.value.setCarsFromServer( userStorage.value.auth)
}
const setCar = ()=>{
    carStorage.value.setChangeId(props.car)
    console.log(carStorage.value.change_id)
}
// onBeforeMount(()=>{
//     console.log(props.car)
// })
</script>
<template>
    <div>
        <button v-if="userStorage.user.is_staff===true"
        class="btn btn-warning"
        aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#changeCar"
        @click="setCar"
        >Изменить машину 
        </button>

		<div>
			<form @submit.prevent="carChange">
				<div
					class="modal fade"
					id="changeCar"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabindex="-1"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true"
				>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel1">
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
								data-bs-target="#changedCar"
								data-bs-toggle="modal"
								@click="carChange"
								>
									Изменить
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
    </div>
</template>