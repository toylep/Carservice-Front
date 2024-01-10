import {defineStore} from 'pinia'
import axios from 'axios'
export const useCarStorage = defineStore('carStore',{
    state: () => ({
        cars:[]
    }),
    actions:{
        setCars(cars){
            this.cars = cars
        },
        addCar(car){
            this.cars.push(car)
        },
        async setCarsFromServer(auth){
            try {
                const response = await axios.get(
                    '/api/cars/list', {
                    auth: {
                        username: auth.username,
                        password: auth.password
                    }
                })
                this.cars = response.data
            } catch (err){
                alert('Нет соединения с сервером :(')
                console.log(err)
            }
        },
        async setCarsFromServerWithCategory(category_id){
            try {
                const response =await axios.get('/api/cars/category/'+category_id)
                this.cars = response.data
            } catch (err){
                alert('Нет соединения с сервером :(')
                console.log(err)
            }
        }

    }
})