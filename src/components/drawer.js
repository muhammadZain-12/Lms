import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(prop) {

  // const navigate = useNavigate()
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex',height:"10vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {prop.status}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <Divider />
        {prop.status=="Admin Panel"?
        <Box sx={{display:"flex",alignItems:"center",flexDirection:"column"}} >
        <Link to="/Cadmin" > <Button sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Home</Button></Link>
          <Link  style={{color:"black",textDecoration:"none"}} to="userData" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >User Data</Button></Link>
          <Link  style={{color:"black",textDecoration:"none"}} to="StudentData" ><Button sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Student Data</Button></Link>
          <Link  style={{color:"black",textDecoration:"none"}} to="createQuiz" ><Button sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >CreateQuiz</Button></Link>
          <Link  style={{color:"black",textDecoration:"none"}} to="quizData" ><Button sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Quiz Data</Button></Link> 
          </Box>:<Box sx={{display:"flex",alignItems:"center",flexDirection:"column"}} >
        <Link style={{textDecoration:"none",marginTop:5}} to={prop.path} > <Button   sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Home</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="RegistrationForm" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Registration Form</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="PersonalInformation" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Personal Data</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="playQuiz" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Play Quiz</Button></Link>
          </Box>}
        
        <Box/>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
