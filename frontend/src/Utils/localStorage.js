// Add a product to a localStorage
export const addToFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if(!favorites.some((p) => p._id === product._id)){
        favorites.push(product)
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// Remove product from a localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((product) => product._id != productId);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
};





// Retrive favorites from a localStorage
export const getFavoritesFromLocalStorage = () =>{
    const favoritesJSON = localStorage.getItem('favorites')
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};