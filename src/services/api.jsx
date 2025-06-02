import { config } from '../../config';

// Function to fetch random travel images from Unsplash
export async function fetchTravelImages() {
    try {
        // Check if API key is set
        if (!config.UNSPLASH_API_KEY || config.UNSPLASH_API_KEY === 'YOUR_UNSPLASH_API_KEY') {
            console.error('Unsplash API key is not configured');
            return null;
        }

        
        const url = `https://api.unsplash.com/photos/random?count=6&query=travel,landscape&client_id=${config.UNSPLASH_API_KEY}`;
        console.log('Request URL:', url);

        const response = await fetch(url);
        console.log('Response status:', response.status);
        console.log('Response status text:', response.statusText);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Successfully fetched images from Unsplash');
        console.log('Number of images received:', data.length);
        
        const formattedData = data.map(image => ({
            image: image.urls.regular,
            text: image.location?.title || image.alt_description || 'Beautiful Travel Spot',
            name: image.alt_description || 'Travel Image'
        }));
        
        return formattedData;
    } catch (error) {
        console.error('Error fetching images:', error);
        console.error('Error stack:', error.stack);
        return null;
    }
}