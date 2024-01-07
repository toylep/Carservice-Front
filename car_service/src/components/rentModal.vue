<script setup>


const addRent = async ()=>{
    
}

</script>
<template>
    <div>
        <button v-if="user.is_staff===true"
        class="ms-1 d-none d-sm-inline"
        aria-current="page"
        data-bs-toggle="modal"
        data-bs-target="#addCar"
        >Арендовать
        </button>

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
                                    Аренда
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
									<label for="exampleInputCarMark">На сколько месяцев вы хотите арендовать машину?</label>
									<input
										class="form-control"
										id="exampleInputCarMark"
										placeholder="Марка"
										v-model="carHolder.mark"
									/>
								</div>
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