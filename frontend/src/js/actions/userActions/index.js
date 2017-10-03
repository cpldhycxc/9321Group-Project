import axios from 'axios';


export function login(user,changestate) {
    localStorage.setItem('id_token', user.userName);
    return function(dispatch){
      axios.post('http://localhost:8080/login/', {
          userName:user.userName,
          password:user.password,
      })
      .then((response)=>{
        if(response.data.success){
          dispatch({
            type: 'LOGGED_IN',
            payload: response.data,
          })
        } else {
          localStorage.removeItem('id_token');
          changestate();
        }
      })
      .catch((err)=> {
        console.log(err);
      })
      }
}

export function signuprequest(user) {
    console.log(user);
    return axios.post('http://localhost:8080/signup/',{
      userName:user.username,
      password:user.password,
      email:user.email,
      firstName:user.firstname,
      lastName:user.lastname,
      birthday:user.birthday,
    })
}

export function checkuser(username) {
  return axios.get(`http://localhost:8080/checkExistence/${username}`)
}

export function logout() {
  localStorage.removeItem('id_token')
  return {
    type: 'LOGGED_OUT',
  };
}

export function searchByUsername(username1,username2){
  return axios.post('http://localhost:8080/userProfile/',{
    selectUserName:username1,
    userName : username2,
  })
}

// return function(dispatch){
  // axios.post('http://localhost:8000/backend/login/',{
  //     user
  // })
  // .then((response)=>{
  //
  // })
//   }
// function(dispatch){
//  axios.post('http://localhost:8080/',{
//      user
//  })
//  .then((response)=>{
//      localStorage.setItem('id_token', response);
//      dispatch({
//          type: 'LOGGED_IN',
//          payload: response
//      })
//  })
//  .catch((err) => {
//      console.log(err)
//  })
//  }
