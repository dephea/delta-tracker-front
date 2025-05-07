import React from 'react';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


export default function AccountMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    handleClose();
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  

  return (
    <>
      <Tooltip title={user ? 'Account' : 'Sign in'}>
        <IconButton onClick={user ? handleClick : handleLoginRedirect} size="small">
            <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: getRandomColor(),
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}
        >
          {user ? user.login.charAt(0).toUpperCase() : '?'}
        </Box>
        </IconButton>
      </Tooltip>

      {user && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {}}>My profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}
    </>
  );
}
