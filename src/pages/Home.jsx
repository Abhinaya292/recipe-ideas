import React, { useState, useEffect } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { searchByIngredient, searchByName } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import FilterPanel from '../components/FilterPanel';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    mood: [],
    cookingTime: [],
    dietary: [],
    includeIngredients: [],
    excludeIngredients: []
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      let results = [];
      
      // Try searching by ingredient first
      const ingredientResults = await searchByIngredient(searchQuery);
      if (ingredientResults.length > 0) {
        results = ingredientResults;
      } else {
        // If no results, try searching by name
        const nameResults = await searchByName(searchQuery);
        results = nameResults;
      }

      // Apply filters
      const filteredResults = applyFilters(results, filters);
      setRecipes(filteredResults);

      if (filteredResults.length === 0) {
        setError('No recipes found matching your criteria. Try different search terms or adjust your filters!');
      }
    } catch (err) {
      setError('Oops! Something went wrong while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (recipes, filters) => {
    let filtered = [...recipes];

    // Filter by mood (category mapping)
    if (filters.mood.length > 0) {
      const categoryMap = {
        comfort: ['Beef', 'Pork', 'Lamb'],
        light: ['Chicken', 'Seafood', 'Vegetarian'],
        dessert: ['Dessert'],
        snack: ['Starter', 'Side']
      };

      filtered = filtered.filter(recipe => 
        filters.mood.some(mood => {
          const categories = categoryMap[mood] || [mood];
          return categories.some(cat => 
            recipe.strCategory.toLowerCase().includes(cat.toLowerCase())
          );
        })
      );
    }

    // Filter by cooking time (simulated based on category)
    if (filters.cookingTime.length > 0) {
      const quickCategories = ['Starter', 'Side', 'Breakfast'];
      const mediumCategories = ['Chicken', 'Pasta', 'Seafood', 'Vegetarian'];
      
      filtered = filtered.filter(recipe => {
        const isQuick = quickCategories.some(cat => 
          recipe.strCategory.toLowerCase().includes(cat.toLowerCase())
        );
        const isMedium = mediumCategories.some(cat => 
          recipe.strCategory.toLowerCase().includes(cat.toLowerCase())
        );

        return filters.cookingTime.some(time => {
          if (time === 'quick' && isQuick) return true;
          if (time === 'medium' && isMedium) return true;
          if (time === 'long' && !isQuick && !isMedium) return true;
          return false;
        });
      });
    }

    return filtered;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const loadSampleRecipes = async () => {
    setLoading(true);
    try {
      const sampleResults = await searchByIngredient('chicken');
      setRecipes(sampleResults.slice(0, 8));
    } catch (err) {
      setError('Failed to load sample recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSampleRecipes();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-title">
            <Sparkles size={48} style={{ display: 'inline', marginRight: '16px' }} />
            Find Your Perfect Recipe
          </h1>
          <p className="hero-subtitle">
            Discover amazing recipes based on ingredients you have, your mood, 
            and dietary preferences. Perfect for busy professionals who want great food fast.
          </p>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by ingredient or recipe name (e.g., chicken, pasta, chocolate)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-input"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="search-button"
            >
              <Search size={20} />
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>

          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </div>

        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={handleSearch}
          />
        )}

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Searching for delicious recipes...</p>
          </div>
        )}

        {recipes.length > 0 && !loading && (
          <div className="recipes-section">
            <div className="results-header">
              <h2 className="results-count">
                Found {recipes.length} amazing recipe{recipes.length !== 1 ? 's' : ''}
              </h2>
            </div>
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.idMeal} recipe={recipe} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;