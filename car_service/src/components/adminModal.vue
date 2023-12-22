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
        data-bs-target="#add"
        >Добавить машину
        </span>

		<!-- Modal for Login -->
		<div>
			<form 
			ref="CarAddForm"
			method="post"
			@submit.prevent="()=>alert('hmmm')"
			>
				<div
					class="modal fade"
					id="add"
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
										id="exampleInputUsername"
										placeholder="Username"
										v-model="carHolder.mark"
									/>
								</div>
								<div class="form-group">
									<label for="exampleInputCarMark">Введите модель</label>
									<input
										class="form-control"
										id="exampleInputUsername"
										placeholder="Username"
										v-model="carHolder.model"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarMark">Введите описание</label>
									<input
										class="form-control"
										id="exampleInputUsername"
										placeholder="Username"
										v-model="carHolder.description"
									/>
								</div>
                                <div class="form-group">
									<label for="exampleInputCarMark">Добавьте урлу картинки</label>
									<input
										class="form-control"
										id="exampleInputUsername"
										placeholder="Username"
										v-model="carHolder.picture"
									/>
								</div>
								<button type="submit" class="btn btn-primary">
									Добавить
								</button>
								<!-- ... Other form elements ... -->
							</div>
							<!-- ... Modal footer ... -->
						</div>
					</div>
				</div>
			</form>
		</div>
    </div>

</template>