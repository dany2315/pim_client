import axios from 'axios';


const currentUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api":"https://env-mango.jcloud-ver-jpe.ik-server.com/api";

// Créer une instance pour l'environnement de développement
const api = axios.create({
  baseURL: currentUrl
  // Autres configurations spécifiques à l'environnement de développement
});

export default api