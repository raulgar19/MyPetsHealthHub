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

  getUserById(userId) {
    return this.api.get(`AppUsers/getById/${userId}`)
  }

  getUsersByVetId(vetId) {
    return this.api.get(`AppUsers/getByVetId/${vetId}`)
  }

  getPetsByVetId(vetId) {
    return this.api.get(`Pets/getByVetId/${vetId}`)
  }

  getUserPets(userId) {
    return this.api.get(`Pets/getByUserId/${userId}`)
  }

  vetLogin(email, password) {
    return this.api.post('VetUsers/vetLogin', { email, password });
  }

  getAllVets() {
    return this.api.get('Vets/getAll');
  }

  getVetQueries(id) {
    return this.api.get(`ScheduledQueries/getByVetId/${id}`);
  }

  getAllGroomings() {
    return this.api.get('Groomings/getAll');
  }

  getAllEmergencies() {
    return this.api.get('Emergencies/getAll');
  }

  getVetByUserId(userId) {
    return this.api.get(`Vets/getById/${userId}`)
  }

  addMoney(walletId, amount) {
    return this.api.put(`Wallets/addAmount/${walletId}`, { amount });
  }
}

const apiService = new ApiService();

export default apiService;