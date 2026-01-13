import { useState, useEffect } from 'react';
import type { CountryIso2 } from 'react-international-phone';

const FALLBACK_COUNTRY: CountryIso2 = 'us';
const CACHE_KEY = 'user_country_code';

export const useUserCountry = () => {
  const [country, setCountry] = useState<CountryIso2>(FALLBACK_COUNTRY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = async () => {
      // Check cache first
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        setCountry(cached as CountryIso2);
        setIsLoading(false);
        return;
      }

      try {
        // Use ipapi.co for free IP geolocation (no API key required)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

        const response = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.country_code) {
            const countryCode = data.country_code.toLowerCase() as CountryIso2;
            setCountry(countryCode);
            sessionStorage.setItem(CACHE_KEY, countryCode);
          }
        }
      } catch (error) {
        // Silently fail and use fallback country (US)
        console.debug('Could not detect country, using default:', FALLBACK_COUNTRY);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountry();
  }, []);

  return { country, isLoading };
};

export default useUserCountry;
