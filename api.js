import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://localhost:7000/api/",
    });
  }

  registerUser(registerModel) {
    return this.api.post("AppUsers/addUser", registerModel);
  }

  addPet(request) {
    return this.api.post("Pets/addPet", request);
  }

  addMoney(userId, amount) {
    return this.api.put(`Wallets/addAmount/${userId}`, { amount });
  }

  addQuery(request) {
    return this.api.post("ScheduledQueries/addQuery", request);
  }

  userLogin(email, password) {
    return this.api.post("AppUsers/userLogin", { email, password });
  }

  getUserById(userId) {
    return this.api.get(`AppUsers/getById/${userId}`);
  }

  getPetById(petId) {
    return this.api.get(`Pets/getById/${petId}`);
  }

  getUsersByVetId(vetId) {
    return this.api.get(`AppUsers/getByVetId/${vetId}`);
  }

  getPetsByVetId(vetId) {
    return this.api.get(`Pets/getByVetId/${vetId}`);
  }

  getUserPets(userId) {
    return this.api.get(`Pets/getByUserId/${userId}`);
  }

  getUserPetCards(userId) {
    return this.api.get(`PetCards/userPetCards/${userId}`);
  }

  vetLogin(email, password) {
    return this.api.post("VetUsers/vetLogin", { email, password });
  }

  getWalletByUserId(userId) {
    return this.api.get(`Wallets/getWalletByUserId/${userId}`);
  }

  getAllVets() {
    return this.api.get("Vets/getAll");
  }

  getVetQueries(id) {
    return this.api.get(`ScheduledQueries/getByVetId/${id}`);
  }

  getAllGroomings() {
    return this.api.get("Groomings/getAll");
  }

  getAllEmergencies() {
    return this.api.get("Emergencies/getAll");
  }

  getVetByUserId(userId) {
    return this.api.get(`Vets/getById/${userId}`);
  }

  getPetQueries(petId, vetId) {
    return this.api.get(
      `ScheduledQueries/getPetQueries?petId=${petId}&vetId=${vetId}`
    );
  }

  getProductsByProductTypeId(productTypeId) {
    return this.api.get(`Products/getProductsByTypeId/${productTypeId}`);
  }

  confirmPassword(request) {
    return this.api.post("AppUsers/confirmPassword", request);
  }

  updateUser(id, request) {
    return this.api.put(`AppUsers/updateUser/${id}`, request);
  }

  changeBankAccount(userId, request) {
    return this.api.put(`AppUsers/changeBankAccount/${userId}`, request);
  }

  changeEmail(userId, request) {
    return this.api.put(`AppUsers/changeEmail/${userId}`, request);
  }

  changePassword(userId, request) {
    return this.api.put(`AppUsers/changePassword/${userId}`, request);
  }

  deletePetQuery(queryId) {
    return this.api.delete(`ScheduledQueries/removeQuery/${queryId}`);
  }

  deletePet(petId) {
    return this.api.delete(`Pets/deletePet/${petId}`);
  }
}

const apiService = new ApiService();

export default apiService;
