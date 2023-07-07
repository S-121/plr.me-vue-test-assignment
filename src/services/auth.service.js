import axios from 'axios';

const API_URL = 'https://dummyjson.com';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/login', {
        username: user.username,
        password: user.password
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + '/users/add', {
      username: user.username,
      email: user.email,
      password: user.password,
      cpassword: user.cpassword
    });
  }
}

export default new AuthService();
