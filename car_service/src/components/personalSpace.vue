<script setup>
import axios from 'axios';
const rents = async ()=>{
    user = JSON.stringify(localStorage.getItem('user'))
    axios.get('http://localhost:8000/')
}
</script>

<template>
    <div>
        <div class="rent">
            
        </div>
    </div>

</template>
<style> 
 .rent{
    background-color: darkgray;
    width: 90%;

 }
</style>