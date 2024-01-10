<script setup>
import axios from 'axios'
import mainbody from './mainbody.vue'
import AdminModal from './adminModal.vue'
import { onBeforeMount, ref } from 'vue';
import {useUserStorage} from '../storages/UserStorage'
import {useCarStorage} from '../storages/CarStorages'

const carStorage = ref(useCarStorage())
const userStorage = ref(useUserStorage())
let categories = ref([])

const get_categories = async () => {
	try {
		const response = await axios.get('/api/cars/category/')
		categories.value =  response.data
	} catch (error) {
		console.error('Error fetching categories:')
	}
}


onBeforeMount(() => {
	if (!(JSON.parse(localStorage.getItem('user')) === null)){
		useUserStorage().setUser(JSON.parse(localStorage.getItem('user')))
		useUserStorage().setAuth(JSON.parse(localStorage.getItem('auth')))
	}
	get_categories();
})

</script>

<template>
	<div>
		<div class="d-flex">
			<div class="d-flex flex-nowrap">
				<div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style="float: left; width: 240px">
					<div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
						<a href="/"
							class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
							<span class="fs-5 d-none d-sm-inline">Menu</span>
						</a>
							<ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
								id="menu">
								<li class="nav-item">
									<span href="#" class="nav-link align-middle px-0" style="color: white;">
										<i class="fs-4 bi-house"></i>
										<h5 class="ms-1 d-none d-sm-inline" v-if="userStorage.user.is_staff">Админский режим</h5>
									</span>
									<a href="#" class="nav-link align-middle px-0"></a>
								</li>
								<li class="nav-item">
									<span href="#" class="nav-link align-middle px-0" style="color: white;">
										<i class="fs-4 bi-house"></i>
										<h5 class="ms-1 d-none d-sm-inline">{{ userStorage.user.username }}</h5>
									</span>
									<h6 class="ms-1 d-none d-sm-inline">Ваш баланс: {{ userStorage.user.balance }} $</h6>
									<a href="#" class="nav-link align-middle px-0"></a>
								</li>
							

								<li>
									<a data-bs-toggle="collapse" class="nav-link px-0 align-middle">
										<h4 class="fs-4 bi-speedometer2"></h4>
										<AdminModal />
									</a>
								</li>
								<li class="nav-item">
									<h5 class="ms-1 d-none d-sm-inline"
										data-bs-toggle="collapse"
										data-bs-target="#home-collapse"
										aria-expanded="true"
										style="color: white;">
										Категории
									</h5>
								</li>
								<li class="nav-item" v-for="cat in categories">
									<hr/>
									<div >
										<a 
										class="ms-1 d-none d-sm-inline"
										@click="carStorage.setCarsFromServerWithCategory(cat.id)" 
										>{{ cat.name }}</a>
									</div>
								</li>
							</ul>
						<hr />
					</div>
					
				</div>
				<div>
					<mainbody />
				</div>
			</div>
		</div>
	</div>
</template>
<style></style>
