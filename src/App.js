import { useState } from 'react'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'
import UserManagement from './components/user-management'
import AccessVerification from './components/access-verification'
import QRReader from './components/qr-reader';

function App() {
    
const modules = [
  { id: 'users', name: 'Gestión de Usuarios', icon: '👥' },
  { id: 'access', name: 'Verificar Acceso', icon: '🔐' },
  { id: 'qr', name: 'Leer Código QR', icon: '📱' }
]
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState('users')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const drawerWidth = 240

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {modules.map((module) => (
          <ListItem
            button
            key={module.id}
            selected={selectedModule === module.id}
            onClick={() => {
              setSelectedModule(module.id)
              if (isMobile) {
                setMobileOpen(false)
              }
            }}
          >
            <ListItemIcon>{module.icon}</ListItemIcon>
            <ListItemText primary={module.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <div>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                bgcolor: 'primary.main'
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { sm: 'none' } }}
                >
                  ☰
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                  Sistema de Gestión Hotelera
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="modules"
            >
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                mt: ['56px', '64px'],
                bgcolor: 'background.default'
              }}
            >
              {selectedModule === 'users' && <UserManagement />}
              {selectedModule === 'access' && <AccessVerification />}
              {selectedModule === 'qr' && <QRReader />}
            </Box>
          </Box>
    </div>
  );
}

export default App;
