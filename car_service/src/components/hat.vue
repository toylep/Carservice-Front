<script>
import loginwWindow from './loginwWindow.vue';

export default{
    name:'hat',
    components:{
    loginwWindow,
    }
}
</script>
<template>
<div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><strong>МОЙ СЕРВИС ПО ПРОКАТУ АВТО</strong></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
        </ul>
        <li class="nav-item">
            <loginwWindow/>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="https://github.com/toylep/">Обо мне</a>
            </li>
            <li class="nav-item">
            <a class="nav-link">Админская панель</a>
            </li>

        </div>
  </div>
</nav>
</div>
</template>