import profileImage from "../assets/images/avatar2.jpeg";
import newPostIcon from "../assets/images/newposticon.svg";
import { Avatar, Typography, Button, Paper, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useButton } from '@react-aria/button';
import { useState } from 'react';

function Profile({ onNewPost }) {
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPostData, setNewPostData] = useState({
    image: null,
    caption: ''
  });
  const [profileData, setProfileData] = useState({
    name: "Mariam Alli",
    bio: "A passionate front-end developer and UI/UX enthusiast. Love travelling and exploring.",
    image: profileImage
  });
  const [errors, setErrors] = useState({
    name: '',
    bio: '',
    image: ''
  });
  const [previewImage, setPreviewImage] = useState(null);

  const handleOpenEditProfile = () => setOpenEditProfile(true);
  const handleCloseEditProfile = () => {
    setOpenEditProfile(false);
    setErrors({ name: '', bio: '', image: '' });
    setPreviewImage(null);
  };

  const handleNewPostOpen = () => setNewPostOpen(true);
  const handleNewPostClose = () => {
    setNewPostOpen(false);
    setNewPostData({ image: null, caption: '' });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        setErrors({ ...errors, image: '' });
      } else {
        setErrors({ ...errors, image: 'Please upload an image file' });
      }
    }
  };

  const handleNewPostImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewPostData(prev => ({
            ...prev,
            image: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleNewPostCaptionChange = (event) => {
    setNewPostData(prev => ({
      ...prev,
      caption: event.target.value
    }));
  };

  const handlePostSubmit = () => {
    if (newPostData.image && newPostData.caption && typeof onNewPost === 'function') {
      onNewPost({
        image: newPostData.image,
        text: newPostData.caption
      });
      handleNewPostClose();
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      bio: '',
      image: ''
    };

    // Name validation
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (profileData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
      isValid = false;
    }

    // Bio validation
    if (!profileData.bio.trim()) {
      newErrors.bio = 'Bio is required';
      isValid = false;
    } else if (profileData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveProfile = () => {
    if (validateForm()) {
      // Update profileData with the new image
      const updatedProfileData = {
        ...profileData,
        image: previewImage || profileData.image
      };
      setProfileData(updatedProfileData);
      
      // Here you would typically save the changes to your backend
      console.log('Saving profile changes:', updatedProfileData);
      handleCloseEditProfile();
    }
  };

  const handleChange = (field) => (event) => {
    setProfileData({
      ...profileData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const editButtonProps = useButton({
    onPress: handleOpenEditProfile
  }).buttonProps;

  const newPostButtonProps = useButton({
    onPress: handleNewPostOpen
  }).buttonProps;

  return (
    <>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          bgcolor: '#d196f3ff',
          padding: { md: '1.5rem 3rem' }
        }}
      >
        <Box 
          className="profile wrapper gradient" 
          aria-labelledby="profile"
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            gap: {
              xs: 2,
              md: 4
            }
          }}
        >
          {/* Avatar Image Section */}
          <Box 
            className="profile__avatar avatar-image" 
            sx={{ 
              mb: { xs: 2, md: 0 },
              display: 'flex',
              justifyContent: {
                xs: 'center',
                md: 'flex-start'
              },
              width: { xs: '100%', md: 'auto' }
            }}
          >
            <figure 
              className="profile__avatar avatar-image" 
              sx={{ 
                margin: '0 auto',
                display: 'flex',
                justifyContent: {
                  xs: 'center',
                  md: 'flex-start'
                },
                width: '100%',
                height: { xs: 'auto', md: '43vh' }
              }}
            >
              <Box sx={{ width: '100%', height: '100%' }}>
                <img
                  className="profile__avatar-image"
                  src={profileData.image}
                  alt="Avatar Image"
                  style={{
                    width: '100%',
                    height: '30vh',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </Box>
            </figure>
          </Box>

          {/* Hero Text Section */}
          <Box className="profile__info">
            <Box className="profile__text" sx={{ mb: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                className="profile__name"
                sx={{ 
                  mb: 1, 
                  fontSize: { xs: '1.3rem', md: '2rem' }, 
                  fontWeight: '500', 
                  textAlign: { xs: 'center', md: 'left' },
                  width: { xs: '100%', md: '30ch' },
                  lineHeight: { xs: 1, md: 1.1 },
                }}
              >
                {profileData.name}
              </Typography>
              <Typography 
                variant="body1" 
                className="profile__bio"
                color="text.secondary"
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '1.1rem', md: '1rem' },
                  fontWeight: '500',
                  lineHeight: 1.2,
                  width: { xs: '100%', md: '30ch' },
                }}
              >
                {profileData.bio}
              </Typography>
            </Box>

            {/* Hero Actions Section */}
            <Box
              className="profile__actions"
              role="toolbar"
              aria-label="profile actions"
              sx={{ 
                display: 'flex', 
                gap: {
                  xs: 2,
                  md: 4
                },
                flexDirection: {
                  xs: 'column',
                  md: 'row'
                },
                alignItems: {
                  xs: 'center'
                },
                justifyContent: {
                  xs: 'center',
                  md: 'space-between'
                }
              }}
            >
              {/* Edit Profile Button */}
              <Button
                variant="text"
                startIcon={<EditIcon />}
                {...editButtonProps}
                className="profile__edit-btn"
                sx={{ 
                  color: '#212121',
                  textTransform: 'none',
                  fontWeight: '600',
                  fontFamily: 'var(--font-family)',
                  opacity: 0.7,
                  '&:hover': {
                    backgroundColor: '#212121',
                    color: '#fcf5e5',
                    opacity: 1
                  }
                }}
              >
                Edit Profile
              </Button>

              {/* New Post Button */}
              <Button
                variant="contained"
                startIcon={<img src={newPostIcon} alt="New Post Icon" />}
                {...newPostButtonProps}
                className="profile__newpost-btn"
                sx={{
                  backgroundColor: '#212121',
                  color: '#fcf5e5',
                  padding: '.78rem 2rem',
                  textTransform: 'none',
                  marginRight: {xs: '' , md:'-30rem'},
                  fontWeight: '600',
                  '&:hover': {
                    backgroundColor: '#212121',
                    color: '#fcf5e5',
                    opacity: 1
                  }
                }}
              >
                New Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* New Post Dialog */}
      <Dialog 
        open={newPostOpen} 
        onClose={handleNewPostClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{backgroundColor: '#212121', color: '#fcf5e5'}}>Create New Post</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {newPostData.image && (
              <Box sx={{ width: '100%', height: '200px', mb: 2 }}>
                <img
                  src={newPostData.image}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }}
                />
              </Box>
            )}
            <Button
              variant="outlined"
              component="label"
              sx={{ textTransform: 'none', backgroundColor: '#212121', color: '#fcf5e5' }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleNewPostImageChange}
              />
            </Button>
            <TextField
              label="Caption"
              multiline
              rows={4}
              fullWidth
              value={newPostData.caption}
              onChange={handleNewPostCaptionChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewPostClose} sx={{color: '#212121'}}>Cancel</Button>
          <Button 
            onClick={handlePostSubmit} 
            variant="contained"
            disabled={!newPostData.image || !newPostData.caption}
            sx={{backgroundColor: '#212121', color: '#fcf5e5'}}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Profile Dialog */}
      <Dialog 
        open={openEditProfile} 
        onClose={handleCloseEditProfile}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{backgroundColor: '#212121', color: '#fcf5e5'}}>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Profile Image Upload */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={previewImage || profileData.image}
                sx={{ width: 100, height: 100, mb: 1 }}
              />
              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: 'none', backgroundColor: '#212121', color: '#fcf5e5' }}
              >
                Change Profile Picture
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              {errors.image && (
                <Typography color="error" variant="caption">
                  {errors.image}
                </Typography>
              )}
            </Box>

            {/* Name Field */}
            <TextField
              label="Name"
              value={profileData.name}
              onChange={handleChange('name')}
              error={Boolean(errors.name)}
              helperText={errors.name}
              fullWidth
            />

            {/* Bio Field */}
            <TextField
              label="Bio"
              value={profileData.bio}
              onChange={handleChange('bio')}
              error={Boolean(errors.bio)}
              helperText={errors.bio}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditProfile} sx={{color: '#212121'}}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained" sx={{backgroundColor: '#212121', color: '#fcf5e5'}}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export { Profile };
