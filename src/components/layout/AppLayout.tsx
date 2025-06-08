'use client';

import { ReactNode, useState } from 'react';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    Factory as FactoryIcon,
    LocalShipping as ShippingIcon,
    Warehouse as WarehouseIcon,
    LocationOn as LocationOnIcon,
    Build as BuildIcon,
    History as HistoryIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: '대시보드', icon: <DashboardIcon />, path: '/' },
        { text: '제품 관리', icon: <InventoryIcon />, path: '/products' },
        { text: '창고 관리', icon: <WarehouseIcon />, path: '/warehouses' },
        { text: '위치 관리', icon: <LocationOnIcon />, path: '/locations' },
        { text: '재고 관리', icon: <InventoryIcon />, path: '/inventory' },
        { text: 'BOM 관리', icon: <BuildIcon />, path: '/boms' },
        { text: '생산 관리', icon: <FactoryIcon />, path: '/production' },
        { text: '거래 이력', icon: <HistoryIcon />, path: '/transactions' },
    ];

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {menuItems.map(item => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => router.push(item.path)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
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
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        SCM 시스템
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
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
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
