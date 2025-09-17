const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by ingredient:', error);
    throw new Error('Failed to search recipes');
  }
};

export const searchByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by name:', error);
    throw new Error('Failed to search recipes');
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error getting recipe details:', error);
    throw new Error('Failed to get recipe details');
  }
};

export const getRecipesByCategory = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by category:', error);
    throw new Error('Failed to search by category');
  }
};