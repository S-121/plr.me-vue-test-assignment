import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://dummyjson.com';

class UserService {
  updateProfile(user) {
    return axios.put(API_URL + '/users/' + user.id, {
      headers: authHeader(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      gender: user.gender,
     })
     .then(res => {
        return res.data;
     });
  }

  getSingleUser(id) {
    return axios.get(API_URL + '/users/' + id);
  }
}

export default new UserService();
