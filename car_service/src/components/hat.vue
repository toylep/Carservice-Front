<script setup>
import axios from 'axios';
import loginwWindow from './loginwWindow.vue';
import { useUserStorage } from '../storages/UserStorage';
import { ref } from 'vue';
let balance=0
let userStorage = ref(useUserStorage())
const addBalance = async ()=>{
  await axios.patch('/api/users/'+userStorage.value.user.id,{
    balance:userStorage.value.user.balance+balance
  })
  await userStorage.value.setUserFromServer()
  alert('Баланс пополнен')
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
              <input 
              type="number" v-model="balance"
              style="width: 100px;"
              >
            </form>
          </li>
          <li>
            <a class="nav-link" @click="addBalance">Пополнить баланс</a> 
          </li>

        </div>
      </div>
    </nav>
  </div>
</template>