import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
      setLoading(false);
      setError(null);
    };

    const error = (err) => {
      setError(err.message);
      setLoading(false);
      // Fallback to default location (New York)
      setLocation({
        lat: 40.7128,
        lon: -74.0060,
        accuracy: null
      });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  const refreshLocation = () => {
    setLoading(true);
    setError(null);
    
    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
      setLoading(false);
    };

    const error = (err) => {
      setError(err.message);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return { location, loading, error, refreshLocation };
};