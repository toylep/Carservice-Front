import { ref } from "vue"

var user = ref({
	username:'Не авторизован',
	first_name:'Не авторизован',
	balance: 0.0,
	is_staff:false,
})
var auth = ref({
	username : 'Не авторизован',
	password : 'Не авторизован'
})
const getUserAndAuth = async ()=>{
	try{
		if (!(JSON.parse(localStorage.getItem('user'))===null)){
			user = JSON.parse(localStorage.getItem('user'))
		}
		if (!(JSON.parse(localStorage.getItem('auth'))===null)){
			auth = JSON.parse(localStorage.getItem('auth'))
		}
	} catch(err){
		console.log('no users')
	}
}