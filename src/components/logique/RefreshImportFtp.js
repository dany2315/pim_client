import {useContext} from "react"
//import context

import api from "../../utils/Axios";

async function ImportFtp(fournisseur ,showSnackbar ,showLoading, hideLoading) {
    
    if (fournisseur.host &&
        fournisseur.username &&
        fournisseur.password &&
        fournisseur.filName) {
        try {
            showLoading();
            console.log(
                "value : ",
                fournisseur.password,
                fournisseur.username,
                fournisseur.host,
                fournisseur.filNames
            );
            const response = await api.post("/fournisseur/ftp", {
                urlFtp: fournisseur.host,
                nomUtilis: fournisseur.username,
                pass: fournisseur.password,
                nameFile: fournisseur.filName,
            });
            hideLoading();
            showSnackbar("Importation par FTP reussi ", "success");
            console.log("reponse ftp", response.data);
            return response.data;
        } catch (error) {
            console.log("error ftp", error);
            hideLoading();
            showSnackbar("Importation par FTP echouer !!", "error");
        }
    }
}

  function handleFile(data) {
    const dataNoFilter = data;
    // Filtrer les objets où 'sku' est vide
    let filteredData = [];
    if (dataNoFilter) {
        filteredData = dataNoFilter.filter((item) => {
            for (let key in item) {
                if (item.hasOwnProperty(key) && item[key] === "") {
                    return false;
                }
            }
            return true;
        });
    }
    return filteredData;
}

 export  async function HandleRefreshFtp(fournisseur ,showSnackbar ,showLoading, hideLoading) {
    console.log("je taime");
  
    const data = await ImportFtp(fournisseur ,showSnackbar ,showLoading, hideLoading);
    const updatedData = handleFile(data);
    showLoading();
    //Sortir le data final en enlevant les champs et les valeur des
    //articles indispenssable et garder que les autre
    const updateDatascop = updatedData.map((item) => {
        const updatedItem = {};
        Object.keys(item).forEach((key, index) => {
            const updatedKey = fournisseur.fieldNames[index];
            if (updatedKey) {
                updatedItem[updatedKey] = item[key];
            }
        });
        fournisseur.fieldNames.forEach((updatedKey, index) => {
            if (updatedKey === "non_necessaire") {
                delete updatedItem[index]; // Supprimer la clé
                delete updatedItem[updatedKey]; // Supprimer la valeur correspondante
            }
        });
        return updatedItem;
    });

    try {
        const response = await api.post(
            "/fournisseur/ftp/refreshFournisseurFtp",
            {
                data: updateDatascop,
                collectionName: fournisseur.collectionName,
            }
        );
        console.log("succes resauvgarde ", response.data);
        hideLoading();
        showSnackbar("Mise a niveau effectuer !", "success");
    } catch (error) {
        hideLoading();
        showSnackbar("Mise a niveau echouer !", "error");
        console.error("Erreur lors de la resauvegarde des données :", error);
    }
}
