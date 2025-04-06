import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "http://MyPetsHealthHub.somee.com/api/",
    });
  }

  registerUser(registerModel) {
    return this.api.post("AppUsers/addUser", registerModel);
  }

  addPet(request) {
    return this.api.post("Pets/addPet", request);
  }

  addPost(request) {
    return this.api.post("Posts/addPost", request);
  }

  addMoney(userId, amount) {
    return this.api.put(`Wallets/addAmount/${userId}`, { amount });
  }

  deductMoney(userId, amount) {
    return this.api.put(`Wallets/deductAmount/${userId}`, { amount });
  }

  addQuery(request) {
    return this.api.post("ScheduledQueries/addQuery", request);
  }

  userLogin(email, password) {
    console.log("Se envia la peticion POST");
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

  getUserPosts(userId) {
    return this.api.get(`Posts/getUserPosts/${userId}`);
  }

  getCommunityPosts(userId) {
    return this.api.get(`Posts/getCommunityPosts/${userId}`);
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

  getVetByAppUserId(userId) {
    return this.api.get(`AppUsers/getVetByUserId/${userId}`);
  }

  getQueryById(queryId) {
    return this.api.get(`ScheduledQueries/getQueryById/${queryId}`);
  }

  getPetQueries(petId, vetId) {
    return this.api.get(
      `ScheduledQueries/getPetQueries?petId=${petId}&vetId=${vetId}`
    );
  }

  getUserPetsQueries(userId) {
    return this.api.get(`ScheduledQueries/getUserPetsQueries/${userId}`);
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

  changeVet(userId, vetId) {
    return this.api.put("AppUsers/changeVet", { userId, vetId });
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

  deleteUser(userId) {
    return this.api.delete(`AppUsers/deleteUser/${userId}`);
  }
}

const apiService = new ApiService();

export default apiService;
