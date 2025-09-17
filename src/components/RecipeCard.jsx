import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, Eye } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isRecipeFavorite = isFavorite(recipe.idMeal);

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.idMeal}`);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isRecipeFavorite) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites(recipe);
    }
  };

  const getCookingTime = (category) => {
    const timeMap = {
      'Starter': '15 mins',
      'Side': '20 mins',
      'Breakfast': '15 mins',
      'Chicken': '35 mins',
      'Pasta': '25 mins',
      'Seafood': '30 mins',
      'Beef': '45 mins',
      'Dessert': '40 mins',
      'Vegetarian': '25 mins',
      'Pork': '40 mins',
      'Lamb': '50 mins'
    };
    return timeMap[category] || '30 mins';
  };

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
        loading="lazy"
      />
      <div className="recipe-content">
        <div className="recipe-category">{recipe.strCategory}</div>
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <div className="recipe-meta">
          <div className="cooking-time">
            <Clock size={16} />
            {getCookingTime(recipe.strCategory)}
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`favorite-button ${isRecipeFavorite ? 'active' : ''}`}
            title={isRecipeFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={18} fill={isRecipeFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;