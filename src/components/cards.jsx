import cards from '../cards.json';
import { Box, Typography, IconButton, Modal, CircularProgress } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { fetchTravelImages } from '../services/api';
import { useQuery } from '@tanstack/react-query';

// Import all images
import image1 from '../assets/images/pexels-kassandre-pedro-8639743 1-1.png';
import image2 from '../assets/images/pexels-kassandre-pedro-8639743 1-2.png';
import image3 from '../assets/images/pexels-kassandre-pedro-8639743 1-3.png';
import image4 from '../assets/images/pexels-kassandre-pedro-8639743 1-4.png';
import image5 from '../assets/images/pexels-kassandre-pedro-8639743 1-5.png';
import image6 from '../assets/images/pexels-kassandre-pedro-8639743 1-6.png';

// Map image paths to imported images
const imageMap = {
  'assets/images/pexels-kassandre-pedro-8639743 1-1.png': image1,
  'assets/images/pexels-kassandre-pedro-8639743 1-2.png': image2,
  'assets/images/pexels-kassandre-pedro-8639743 1-3.png': image3,
  'assets/images/pexels-kassandre-pedro-8639743 1-4.png': image4,
  'assets/images/pexels-kassandre-pedro-8639743 1-5.png': image5,
  'assets/images/pexels-kassandre-pedro-8639743 1-6.png': image6,
};

const Cards = forwardRef((props, ref) => {
  const [likedCards, setLikedCards] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]); // State for user posts

  // Use React Query to fetch images
  const { data: apiCards, isLoading, error } = useQuery({
    queryKey: ['travelImages'],
    queryFn: fetchTravelImages,
    staleTime: 5 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      console.log('Query succeeded:', data);
    },
    onError: (error) => {
      console.error('Query failed:', error);
    }
  });

  console.log('Query state:', { apiCards, isLoading, error });

  const handleLike = (index) => {
    setLikedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleNewPost = (newPost) => {
    setUserPosts(prev => [{
      image: newPost.image,
      text: newPost.text,
      isUserPost: true
    }, ...prev]);
  };

  useImperativeHandle(ref, () => ({
    handleNewPost
  }));

  const handleImageClick = (card, index) => {
    setSelectedImage({ ...card, index });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Combine user posts with API cards or fallback to local cards
  const displayCards = [
    ...userPosts,
    ...(apiCards || cards) // Use cards directly as fallback
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress sx={{backgroundColor: 'background.default'}} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', p: 3, color: 'error.main' }}>
        <Typography>Failed to load images from API</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Showing fallback images instead.
        </Typography>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3,
        p: '1rem 2.5rem',
        backgroundColor: 'background.default'
      }}
    >
      {displayCards.map((card, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 1,
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 3,
              transform: 'scale(1.02)',
              transition: 'all 0.3s ease-in-out'
            }
          }}
          onClick={() => handleImageClick(card, index)}
        >
          <img
            src={card.image.startsWith('data:') ? card.image : (imageMap[card.image] || card.image)}
            alt={card.text}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
          <Box
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'background.default'
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                fontWeight: 500,
                maxWidth: '80%'
              }}
            >
              {card.text}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleLike(index);
              }}
              sx={{
                color: likedCards[index] ? 'error.main' : 'text.secondary',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s ease-in-out'
                }
              }}
            >
              {likedCards[index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
        </Box>
      ))}

      {/* Image Preview Modal */}
      <Modal
        open={Boolean(selectedImage)}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            overflow: 'hidden'
          }}
        >
          {selectedImage && (
            <>
              <img
                src={selectedImage.image.startsWith('data:') ? selectedImage.image : (imageMap[selectedImage.image] || selectedImage.image)}
                alt={selectedImage.text}
                style={{
                  width: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain'
                }}
              />
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'background.paper'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500
                  }}
                >
                  {selectedImage.text}
                </Typography>
                <IconButton
                  onClick={() => handleLike(selectedImage.index)}
                  sx={{
                    color: likedCards[selectedImage.index] ? 'error.main' : 'text.secondary',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                >
                  {likedCards[selectedImage.index] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
});

function Horizontaline(){
    return (
        <hr className='line w-[95%] h-[1px] bg-gray-200  m-[auto]' ></hr>
    )
}

export { Cards, Horizontaline };