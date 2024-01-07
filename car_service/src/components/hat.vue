<script setup>
import axios from 'axios';
import loginwWindow from './loginwWindow.vue';
let balance=0
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
	user = JSON.parse(localStorage.getItem('user'))
	auth = JSON.parse(localStorage.getItem('auth'))
}
const addBalance = async ()=>{
  getUserAndAuth();
  await axios.patch('/api/users/'+user.id,{
    balance:user.balance+balance
  })
}
</script>
<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><strong>МОЙ СЕРВИС ПО ПРОКАТУ АВТО</strong></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>
          <li class="nav-item">
            <loginwWindow />
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/toylep/">Обо мне</a>
          </li>
          <li class="nav-item">
            <form>
              <a class="nav-link" @click="addBalance">Пополнить баланс</a> 
              <input type="number" v-model="balance">
            </form>
          </li>

        </div>
      </div>
    </nav>
  </div>
</template>