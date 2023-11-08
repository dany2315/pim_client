import axios from 'axios';



const currentUrl = window.location.origin === "http://localhost:3000" ? "http://localhost:5000/api":"https://env-mango.jcloud-ver-jpe.ik-server.com/api";



// Créer une instance pour l'environnement de développement
const api = axios.create({
  baseURL: currentUrl
  // Autres configurations spécifiques à l'environnement de développement
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tokNCS'); 
  console.log(token, 'aaaa');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});



api.interceptors.response.use(
  response => {
    if (response.status=== 401 || 403) {
      
    }
    // Traitement de la réponse avant qu'elle n'atteigne l'application
    console.log('Réponse interceptée :', response);
    // Ajoutez ici votre logique de gestion des réponses

    return response;
  },
  error => {
    // Gestion des erreurs
    return Promise.reject(error);
  }
);


export default api