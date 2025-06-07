import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [profile, setProfile] = useState({
    avatar: '/path/to/avatar.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
    address: '123 Street, City, Country',
    position: 'Administrator',
    department: 'IT Department',
    role: 'Admin',
    lastLogin: '2024-03-20 10:30:00',
    joinDate: '2023-01-01',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleEdit = () => {
    setEditedProfile(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setSnackbar({
      open: true,
      message: 'Profile updated successfully',
      severity: 'success',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        Profile
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                {isEditing && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'background.paper',
                    }}
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="h5" gutterBottom>
                {isEditing ? (
                  <TextField
                    value={editedProfile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    fullWidth
                  />
                ) : (
                  profile.name
                )}
              </Typography>
              <Chip
                label={profile.role}
                color="primary"
                size="small"
                sx={{ mb: 2 }}
              />
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={isEditing ? (
                      <TextField
                        value={editedProfile.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      profile.email
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={isEditing ? (
                      <TextField
                        value={editedProfile.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      profile.phone
                    )}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={isEditing ? (
                      <TextField
                        value={editedProfile.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        fullWidth
                        size="small"
                      />
                    ) : (
                      profile.address
                    )}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Work Information */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title="Work Information"
              action={
                isEditing ? (
                  <Box>
                    <Button
                      startIcon={<SaveIcon />}
                      onClick={handleSave}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </Box>
                ) : (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                )
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Position"
                        secondary={isEditing ? (
                          <TextField
                            value={editedProfile.position}
                            onChange={(e) => handleChange('position', e.target.value)}
                            fullWidth
                            size="small"
                          />
                        ) : (
                          profile.position
                        )}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Department"
                        secondary={isEditing ? (
                          <TextField
                            value={editedProfile.department}
                            onChange={(e) => handleChange('department', e.target.value)}
                            fullWidth
                            size="small"
                          />
                        ) : (
                          profile.department
                        )}
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Last Login"
                        secondary={profile.lastLogin}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SecurityIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Join Date"
                        secondary={profile.joinDate}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Security Settings" />
            <Divider />
            <CardContent>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: 2 }}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="primary"
              >
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile; 