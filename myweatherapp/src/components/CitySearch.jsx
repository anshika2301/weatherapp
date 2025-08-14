import React, { useState, useEffect } from 'react';
import { Search, X, MapPin, Star } from 'lucide-react';
import { searchCities } from '../utils/weatherApi';
import { debounce } from '../utils/debounce';
import { getFavoriteCities, saveFavoriteCity, removeFavoriteCity } from '../utils/storage';

export const CitySearch = ({ onCitySelect, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFavorites(getFavoriteCities());
  }, []);

  const debouncedSearch = debounce(async (searchQuery) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    try {
      const cities = await searchCities(searchQuery);
      setSuggestions(cities);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      debouncedSearch(query);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [query]);

  const handleCitySelect = (city) => {
    onCitySelect({
      lat: city.lat,
      lon: city.lon,
      name: city.name,
      country: city.country
    });
    onClose();
  };

  const toggleFavorite = (city) => {
    const isFavorite = favorites.some(fav => 
      fav.lat === city.lat && fav.lon === city.lon
    );

    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = removeFavoriteCity(city);
    } else {
      updatedFavorites = saveFavoriteCity(city);
    }
    
    setFavorites(updatedFavorites);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="glass-card rounded-3xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-slide-up shadow-glass-lg">
        {/* Header */}
        <div className="p-8 border-b border-white border-opacity-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3"></div>
              Search Location
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all duration-300 hover:scale-110"
            >
              <X size={22} />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70" size={22} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city..."
              className="w-full bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 rounded-2xl px-12 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 transition-all duration-300"
              autoFocus
            />
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 border-2 border-white border-opacity-30 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-96 overflow-y-auto scrollbar-hide">
          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="mb-8">
              <h3 className="text-white text-lg font-bold mb-4 flex items-center">
                <Star className="mr-3 text-yellow-400" size={20} />
                Favorites
              </h3>
              <div className="space-y-3">
                {favorites.map((city, index) => (
                  <button
                    key={`fav-${index}`}
                    onClick={() => handleCitySelect(city)}
                    className="w-full text-left p-4 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-2xl transition-all duration-300 flex items-center justify-between hover-lift"
                  >
                    <div className="flex items-center text-white">
                      <div className="p-2 bg-blue-400 bg-opacity-30 rounded-full mr-4">
                        <MapPin size={16} className="text-blue-200" />
                      </div>
                      <div>
                        <span className="font-semibold text-lg">{city.name}</span>
                        {city.country && <span className="text-opacity-70 ml-2 text-sm">({city.country})</span>}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(city);
                      }}
                      className="text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:scale-110"
                    >
                      <Star size={18} fill="currentColor" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {suggestions.length > 0 && (
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Search Results</h3>
              <div className="space-y-3">
                {suggestions.map((city, index) => {
                  const isFavorite = favorites.some(fav => 
                    fav.lat === city.lat && fav.lon === city.lon
                  );
                  
                  return (
                    <button
                      key={`search-${index}`}
                      onClick={() => handleCitySelect(city)}
                      className="w-full text-left p-4 bg-white bg-opacity-15 hover:bg-opacity-25 rounded-2xl transition-all duration-300 flex items-center justify-between hover-lift"
                    >
                      <div className="flex items-center text-white">
                        <div className="p-2 bg-green-400 bg-opacity-30 rounded-full mr-4">
                          <MapPin size={16} className="text-green-200" />
                        </div>
                        <div>
                          <span className="font-semibold text-lg">{city.name}</span>
                          {city.country && <span className="text-opacity-70 ml-2 text-sm">({city.country})</span>}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(city);
                        }}
                        className={`transition-colors ${
                          isFavorite 
                            ? 'text-yellow-400 hover:text-yellow-300 hover:scale-110' 
                            : 'text-white text-opacity-40 hover:text-opacity-60 hover:scale-110'
                        }`}
                      >
                        <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                      </button>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && suggestions.length === 0 && query.length >= 2 && (
            <div className="text-center py-12">
              <div className="text-white text-opacity-70 text-lg">
                No cities found for "{query}"
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};