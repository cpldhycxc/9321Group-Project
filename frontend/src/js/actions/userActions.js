import axios from 'axios';


export function login(user) {
    localStorage.setItem('userinfo', "dfddf");
    return {
        type: 'LOGGED_IN',
        payload: {
            username: user.username,
            password: user.password
        }
    }
}

export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name,
  };
}

export function usersignup() {
  return {
    type: 'SET_USER_AGE',
    payload: age,
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
