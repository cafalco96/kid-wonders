// Función para obtener la URL de la imagen de ARASAAC
  export const getArasaacImageUrl = (id: number) => {
    return `https://api.arasaac.org/v1/pictograms/${id}`;
  };