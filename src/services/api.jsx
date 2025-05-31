import { config } from '../../config';

// Function to fetch random travel images from Unsplash
export async function fetchTravelImages() {
    try {
        // Check if API key is set
        if (!config.UNSPLASH_API_KEY || config.UNSPLASH_API_KEY === 'YOUR_UNSPLASH_API_KEY') {
            console.error('Unsplash API key is not configured');
            return null;
        }

        console.log('Fetching images from Unsplash...');
        const response = await fetch(
            `https://api.unsplash.com/photos/random?count=6&query=travel,landscape&client_id=${config.UNSPLASH_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched images from Unsplash');
        
        return data.map(image => ({
            image: image.urls.regular,
            text: image.location?.title || image.alt_description || 'Beautiful Travel Spot',
            name: image.alt_description || 'Travel Image'
        }));
    } catch (error) {
        console.error('Error fetching images:', error);
        return null;
    }
}

// Function to fetch location data from OpenTripMap
export async function fetchLocationData(lat, lon) {
    try {
        // Check if API key is set
        if (!config.OPENTRIPMAP_API_KEY || config.OPENTRIPMAP_API_KEY === 'YOUR_OPENTRIPMAP_API_KEY') {
            console.error('OpenTripMap API key is not configured');
            return null;
        }

        console.log('Fetching location data...');
        const response = await fetch(
            `https://api.opentripmap.com/0.1/en/places/radius?radius=1000&lon=${lon}&lat=${lat}&apikey=${config.OPENTRIPMAP_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`OpenTripMap API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched location data');
        
        return data.features.map(place => ({
            name: place.properties.name,
            description: place.properties.kinds
        }));
    } catch (error) {
        console.error('Error fetching location data:', error);
        return null;
    }
} 