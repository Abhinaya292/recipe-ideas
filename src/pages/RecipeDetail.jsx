import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Heart, Youtube, ChefHat, BookOpen } from 'lucide-react';
import { getRecipeDetails } from '../services/api';
import { useFavorites } from '../context/FavoritesContext';
import ErrorMessage from '../components/ErrorMessage';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const recipeData = await getRecipeDetails(id);
        if (recipeData) {
          setRecipe(recipeData);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to load recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim() || ''} ${ingredient.trim()}`.trim());
      }
    }
    return ingredients;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const handleFavoriteToggle = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.idMeal)) {
      removeFromFavorites(recipe.idMeal);
    } else {
      addToFavorites({
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strCategory: recipe.strCategory
      });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading recipe details...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container">
        <ErrorMessage 
          message={error || 'Recipe not found'} 
          onRetry={() => navigate('/')}
        />
      </div>
    );
  }

  const ingredients = getIngredients(recipe);
  const youtubeVideoId = getYouTubeVideoId(recipe.strYoutube);
  const isRecipeFavorite = isFavorite(recipe.idMeal);

  return (
    <div className="recipe-detail">
      <div className="container">
        <button
          onClick={() => navigate(-1)}
          className="back-button"
        >
          <ArrowLeft size={16} />
          Back to Results
        </button>

        <div className="detail-header">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="detail-image"
          />
          
          <h1 className="detail-title">{recipe.strMeal}</h1>
          
          <div className="detail-meta">
            <div className="detail-badge">
              <ChefHat size={16} />
              {recipe.strCategory}
            </div>
            <div className="detail-badge">
              <Clock size={16} />
              30-45 mins
            </div>
            <div className="detail-badge">
              <Users size={16} />
              4 servings
            </div>
            <button
              onClick={handleFavoriteToggle}
              className={`detail-badge favorite-badge ${isRecipeFavorite ? 'active' : ''}`}
            >
              <Heart size={16} fill={isRecipeFavorite ? 'currentColor' : 'none'} />
              {isRecipeFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        </div>

        <div className="detail-content">
          <div className="detail-main">
            <h2 className="section-title">
              <BookOpen size={24} />
              Instructions
            </h2>
            <div className="instructions">
              {recipe.strInstructions.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index}>
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="ingredients-card">
              <h3 className="section-title">
                <ChefHat size={20} />
                Ingredients
              </h3>
              <ul className="ingredients-list">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient-item">
                    <div className="ingredient-bullet"></div>
                    <span className="ingredient-text">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {youtubeVideoId && (
              <div className="youtube-card">
                <h3 className="section-title">
                  <Youtube size={20} />
                  Video Tutorial
                </h3>
                <iframe
                  className="youtube-embed"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="Recipe Video"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;