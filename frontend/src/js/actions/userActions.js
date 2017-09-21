import axios from 'axios';

export function login(user) {
  return function(dispatch){
    axios.post('http://localhost:8000/backend/login/',{
        username:user.username,
        password:user.password
    })
    .then((response)=>{
        console.log(response.data);
    })
    }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function usersignup() {
  return {
    type: 'SET_USER_AGE',
    payload: age,
  }
}
