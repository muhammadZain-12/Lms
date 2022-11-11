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
import '../App.css';

const drawerWidth = 300;

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

const navigate = useNavigate()

  const {signOut} = prop
  // const navigate = useNavigate()
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };



  let menuLinks = [
    {
      displayName:"Home",
      routeName:"/Cadmin"
    },
    {
      displayName:"Student Data",
      routeName:"StudentData"
    },
    {
      displayName:"Create Quiz",
      routeName:"createQuiz"
    },
    {
      displayName:"Quiz Data",
      routeName:"quizData"
    },
    {
      displayName:"Course Form",
      routeName:"courseForm"
    },
    {
      displayName:"Course Form Data",
      routeName:"courseFormData"
    },
    {
      displayName:"Result Screen",
      routeName:"resultScreen"
    },
    {
      displayName:"Countries",
      routeName:"countries"
    },
    {
      displayName:"Cities",
      routeName:"city"
    },
    {
      displayName:"Form Control",
      routeName:"formControl"
    },
    {
      displayName:"Form Control Data",
      routeName:"formControlData"
    },
    
  ]


const routePage = (path) => {
  setOpen(false)
  navigate(path)
}

  return (
    <Box sx={{ display: 'flex',height:"10vh" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}} >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            {prop.status}
          </Typography>
          <Button onClick={signOut} id="signOut" variant="contained" sx={{display:{sm:"flex",md:"flex",xs:"none"},color:"blue",backgroundColor:"white",width:{md:"15%",sm:"20%"},fontSize:16,fontWeight:600}} >Sign Out </Button>
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
       
        {prop.status=="Admin Panel"?
        <List>
          {menuLinks.map((text, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={()=>{routePage(text.routeName)}} >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.displayName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>:
        
        
       <Box>

          <Box sx={{display:"flex",alignItems:"center",flexDirection:"column"}} >
        <Link style={{textDecoration:"none",marginTop:5}} to={prop.path} > <Button   sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Home</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="RegistrationForm" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Registration Form</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="PersonalInformation" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Personal Data</Button></Link>
          <Link  style={{color:"black",textDecoration:"none",marginTop:5}} to="playQuiz" ><Button  sx={{color:"black",fontSize:20,fontFamily:"monospace"}} >Play Quiz</Button></Link>
          </Box>
        
        
        </Box>}

          <List>
            <ListItem sx={{display:"flex",justifyContent:"center"}} >

              <Link sx={{textDecoration:"none"}}  to="/" > <Button sx={{display:{xs:"flex",md:"none",sm:"none"},border:"1px solid blue",width:"100%"}}  >Sign Out</Button></Link>
              
            </ListItem>
          </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        
      </Main>
    </Box>
  );
}
