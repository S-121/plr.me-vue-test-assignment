import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://dummyjson.com';

class ProductService {
  getProduct() {
    return axios.get(API_URL + '/products', { headers: authHeader() });
  }

  getProductDetail(productId) {
    return axios.get(API_URL + '/products/' + productId, { headers: authHeader() });
  }
}

export default new ProductService();
