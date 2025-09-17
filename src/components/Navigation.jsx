import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, HandHeart,Salad } from 'lucide-react';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <ChefHat size={32} />
          RecipeFinder
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/favorites" 
              className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              My Favorites <Salad size={22}/>
            </Link>
            
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;