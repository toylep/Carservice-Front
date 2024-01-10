import {defineStore} from 'pinia'
import axios from 'axios'
export const useUserStorage = defineStore('userStore',{
    state: ()=>({
        user: {
            username: 'Не авторизован',
            name: 'Не авторизован',
            email: 'Не авторизован',
            is_staff: false,
            balance: 0,
        },
        auth:{
            username:'Не авторизован',
            password:'Не авторизован',
        }
    }),
    actions:{
        addBalance(balance){
            this.user.balance=balance
        },
        setUser(user){
            this.user=user
        },
        setAuth(auth){
            this.auth=auth
        },
        async setUserFromServer(){
            await axios.get(
                '/api/users/get/'+this.auth.username
            ).then(res=>res.data)
             .then(data=>{
                this.user=data
		        localStorage.setItem('user', JSON.stringify(data));
             })
             
        }

    }
})