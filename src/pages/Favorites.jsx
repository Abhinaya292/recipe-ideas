import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Sparkles } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import RecipeCard from '../components/RecipeCard';

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites">
        <div className="container">
          <div className="favorites-header">
            <h1 className="favorites-title">
              <Heart size={40} style={{ display: 'inline', marginRight: '16px' }} />
              My Favorite Recipes
            </h1>
          </div>
          
          <div className="empty-favorites">
            <Heart className="empty-icon" />
            <h3 className="empty-title">No favorites yet</h3>
            <p className="empty-text">
              Start exploring recipes and save your favorites here for quick access. 
              Build your personal collection of go-to recipes!
            </p>
            <Link to="/" className="empty-button">
              <Search size={16} />
              Discover Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <div className="container">
        <div className="favorites-header">
          <h1 className="favorites-title">
            <Heart size={40} style={{ display: 'inline', marginRight: '16px' }} />
            My Favorite Recipes
          </h1>
          <p className="hero-subtitle">
            <Sparkles size={20} style={{ display: 'inline', marginRight: '8px' }} />
            {favorites.length} amazing recipe{favorites.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>

        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;