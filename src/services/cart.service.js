import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://dummyjson.com';

class CartService {
  getCart(user_id) {
    return axios.get(API_URL + '/carts/user/' + user_id, { headers: authHeader() });
  }
}

export default new CartService();
