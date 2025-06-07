import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import HealingIcon from '@mui/icons-material/Healing';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RestoreIcon from '@mui/icons-material/Restore';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <AssessmentIcon fontSize="large" />, path: '/' },
  { text: 'Late Insurance', icon: <HealingIcon fontSize="large" />, path: '/late-insurance' },
  { text: 'Completed Insurance', icon: <HealingIcon fontSize="large" />, path: '/completed-insurance' },
  { text: 'Unpaid Students', icon: <MonetizationOnIcon fontSize="large" />, path: '/unpaid-students' },
  { text: 'Olympic Students', icon: <SchoolIcon fontSize="large" />, path: '/olympic-students' },
  { text: 'Phục hồi lịch thi (BHYT)', icon: <RestoreIcon fontSize="large" />, path: '/recovery-exam-students' },
];

const Sidebar = ({ currentPage, onPageChange }) => (
  <Drawer
    variant="permanent"
    anchor="left"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
        color: '#fff',
        border: 'none',
        paddingTop: 2,
      },
    }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
        Student System
      </Typography>
    </Toolbar>
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => onPageChange(item.path)}
          selected={currentPage === item.path}
          sx={{
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            '&:hover': {
              background: 'rgba(255,255,255,0.12)',
            },
            '&.Mui-selected': {
              background: 'rgba(255,255,255,0.2)',
              '&:hover': {
                background: 'rgba(255,255,255,0.25)',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: '#fff', minWidth: 40 }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={<Typography sx={{ fontWeight: 600, fontSize: 18 }}>{item.text}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default Sidebar; 