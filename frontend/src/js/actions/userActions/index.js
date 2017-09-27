import axios from 'axios';


export function login(user) {
    localStorage.setItem('id_token', user.userName);
    return function(dispatch){
      axios.post('http://localhost:8080/login/', {
          userName:user.userName,
          password:user.password,
      })
      .then((response)=>{
        dispatch({
          type: 'LOGGED_IN',
          payload: response.data,
        })
      })
      .catch((err)=> {
        console.log(err);
      })
      }
}

export function signuprequest(user) {

}

export function checkuser(username) {
  console.log("checking the fucking user");
  return axios.get(`http://localhost:8080/checKExistence/${username}`);
}

export function logout() {
  localStorage.removeItem('id_token')
  return {
    type: 'LOGGED_OUT',
  };
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
