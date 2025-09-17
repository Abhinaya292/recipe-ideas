import React from 'react';

function FilterPanel({ filters, onFiltersChange }) {
  const moodOptions = [
    { id: 'comfort', label: 'Comfort Food' },
    { id: 'light', label: 'Light & Fresh' },
    { id: 'dessert', label: 'Sweet Treats' },
    { id: 'snack', label: 'Quick Snacks' }
  ];

  const cookingTimeOptions = [
    { id: 'quick', label: '≤15 mins' },
    { id: 'medium', label: '≤30 mins' },
    { id: 'long', label: '>30 mins' }
  ];

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'glutenfree', label: 'Gluten-Free' },
    { id: 'lowcarb', label: 'Low Carb' }
  ];

  const toggleFilter = (category, value) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];

    onFiltersChange({
      ...filters,
      [category]: newValues
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-grid">
        <div className="filter-group">
          <div className="filter-label">Mood</div>
          <div className="filter-options">
            {moodOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleFilter('mood', option.id)}
                className={`filter-tag ${filters.mood.includes(option.id) ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Cooking Time</div>
          <div className="filter-options">
            {cookingTimeOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleFilter('cookingTime', option.id)}
                className={`filter-tag ${filters.cookingTime.includes(option.id) ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <div className="filter-label">Dietary Needs</div>
          <div className="filter-options">
            {dietaryOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleFilter('dietary', option.id)}
                className={`filter-tag ${filters.dietary.includes(option.id) ? 'active' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;