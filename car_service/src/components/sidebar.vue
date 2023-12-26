<script setup>
import axios from 'axios'
import mainbody from './mainbody.vue'
import AdminModal from './adminModal.vue'
import { onMounted, ref } from 'vue';
let user = ref(JSON.parse(localStorage.getItem('user'))).value
let categories = ref([])
const get_categories = async () => {
	try {
		const response = await axios.get('cars/category/')
		response.data.forEach(element => {
			categories.value.unshift(element)
		});
	} catch (error) {
		console.error('Error fetching categories:', error)
	}
}
onMounted(() => {
	get_categories()
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
									<h5 class="ms-1 d-none d-sm-inline" v-if="user.is_staff">Админский режим</h5>
								</span>
								<a href="#" class="nav-link align-middle px-0"></a>
							</li>
							<li class="nav-item">
								<span href="#" class="nav-link align-middle px-0" style="color: white;">
									<i class="fs-4 bi-house"></i>
									<h5 class="ms-1 d-none d-sm-inline" :key="user">{{ user.username }}</h5>
								</span>
								<a href="#" class="nav-link align-middle px-0"></a>
							</li>

							<li>
								<a data-bs-toggle="collapse" class="nav-link px-0 align-middle">
									<h4 class="fs-4 bi-speedometer2"></h4>
									<AdminModal />
								</a>
							</li>
							<li class="nav-item">
								<h4 class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" 
									data-bs-toggle="collapse"
									data-bs-target="#home-collapse"
									aria-expanded="true"
									style="color: white;">
									Категории
								</h4>
								<div id="home-collapse">
									<hr/>
									<ul class="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#submenu2"
										v-for="category in categories" 
										>
										<li>
											<span class="d-none d-sm-inline">
												<a class="modal-title" href="#" :key="category.id">{{category.name}}</a>
											</span>
											<hr/>
										</li>
										
									</ul>
								</div>

							</li>
							<hr />
							<li>

								<!-- Inside the <ul> with id="submenu1" -->

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
