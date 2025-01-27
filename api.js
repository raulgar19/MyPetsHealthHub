import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:7000/api/',
    });
  }

  userLogin(email, password) {
    return this.api.post('AppUsers/userLogin', { email, password });
  }

  vetLogin(email, password) {
    return this.api.post('VetUsers/vetLogin', { email, password });
  }

  addMoney(walletId, amount) {
    return this.api.put(`Wallets/addAmount/${walletId}`, { amount });
  }
}

const apiService = new ApiService();

export default apiService;