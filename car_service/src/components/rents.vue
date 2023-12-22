<script setup>
import axios from 'axios';
import { computed, onMounted, render } from 'vue';
const user = JSON.parse(localStorage.getItem('user'))
let rents = null
const getRents = async ()=>{
    console.log(user)
    let response = await axios.get('http://localhost:8000/cars/rent/'+user.username)
    console.log(response)
    rents = response.data
    return rents
}

onMounted(()=>{
    getRents()
}) 

</script>

<template>
    <div
    style="margin-top: 10px;"
    >
        <div
        class="card-header bg-dark"
        style="color: white;margin-top: 10px;
        ">
        Ваши аренды
        </div>
        <div
        style="color: white;"
        v-if="rents"
        >
        У вас пока нет аренд
        </div>
        <div
        v-else
        v-for="rent in rents"
        >
            <div class="card bg-dark"
            style="margin-top: 10px;">
            <div 
            class="card-header"
            style="color: white;"
            >
                {{rent.car.mark + rent.car.model}}
            </div>
            <div class="card-body">
                <h5 
                class="card-title"
                style="color: white;"
                >Арендовано вами</h5>
                <p 
                class="card-text"
                style="color: white;"
                >Арендовано до {{ rent.end_date }}</p>
            </div>
            </div>
        </div>
    </div>

</template>
<style> 
 .rent{
    background-color: darkgray;
    width: 90%;

 }
</style>