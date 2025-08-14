const STORAGE_KEYS = {
  FAVORITE_CITIES: 'weather-app-favorites',
  PREFERRED_UNITS: 'weather-app-units',
  LAST_LOCATION: 'weather-app-last-location'
};

export const getFavoriteCities = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITE_CITIES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorite cities:', error);
    return [];
  }
};

export const saveFavoriteCity = (city) => {
  try {
    const favorites = getFavoriteCities();
    const exists = favorites.some(fav => 
      fav.lat === city.lat && fav.lon === city.lon
    );
    
    if (!exists) {
      const updated = [...favorites, city];
      localStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(updated));
      return updated;
    }
    
    return favorites;
  } catch (error) {
    console.error('Error saving favorite city:', error);
    return getFavoriteCities();
  }
};

export const removeFavoriteCity = (cityToRemove) => {
  try {
    const favorites = getFavoriteCities();
    const updated = favorites.filter(city => 
      !(city.lat === cityToRemove.lat && city.lon === cityToRemove.lon)
    );
    localStorage.setItem(STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error removing favorite city:', error);
    return getFavoriteCities();
  }
};

export const getPreferredUnits = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.PREFERRED_UNITS) || 'metric';
  } catch (error) {
    return 'metric';
  }
};

export const setPreferredUnits = (units) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PREFERRED_UNITS, units);
  } catch (error) {
    console.error('Error saving preferred units:', error);
  }
};

export const getLastLocation = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LAST_LOCATION);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

export const setLastLocation = (location) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_LOCATION, JSON.stringify(location));
  } catch (error) {
    console.error('Error saving last location:', error);
  }
};