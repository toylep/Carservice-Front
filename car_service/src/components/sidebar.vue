<script>
import axios from 'axios'
import mainbody from './mainbody.vue'
import AdminModal from './adminModal.vue'
export default {
	name: 'sidebar',
	components: {
    mainbody,
    AdminModal
},
	data() {
		return {
			categories: [],
		}
	},
	methods: {
		async get_categories() {
			try {
				const response = await axios.get('/category/')
				this.categories = response.data
			} catch (error) {
				console.error('Error fetching categories:', error)
			}
		},
	},
}
</script>

<template>
	<div>
		<div class="container-">
			<div class="row flex-nowrap">
				<div
					class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
					style="float: left; width: 240px"
				>
					<div
						class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100"
					>
						<a
							href="/"
							class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
						>
							<span class="fs-5 d-none d-sm-inline">Menu</span>
						</a>
						<ul
							class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
							id="menu"
						>
							<li class="nav-item">
								<a href="#" class="nav-link align-middle px-0">
									<i class="fs-4 bi-house"></i>
									<span class="ms-1 d-none d-sm-inline">Главная страница</span>
								</a>
								<a href="#" class="nav-link align-middle px-0"></a>
								<hr />
							</li>
							<li>
								<a
									href="#submenu1"
									data-bs-toggle="collapse"
									class="nav-link px-0 align-middle"
								>
									<i class="fs-4 bi-speedometer2"></i>
									<AdminModal></AdminModal>
								</a>
								<a
									href="#submenu2"
									data-bs-toggle="collapse"
									class="nav-link px-0 align-middle"
								>
									<i class="fs-4 bi-speedometer2"></i>
									<span class="ms-1 d-none d-sm-inline">Категории авто</span>
								</a>
								<!-- Inside the <ul> with id="submenu1" -->
								<ul
									class="collapse show nav flex-column ms-1"
									id="submenu1"
									data-bs-parent="#menu"
								>
									<li v-for="category in categories" :key="category.id">
										<a href="#" class="nav-link px-0">
											<span class="d-none d-sm-inline">{{
												category.name
											}}</span>
										</a>
									</li>
								</ul>
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
