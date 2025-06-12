import React, { useState, useEffect } from 'react';
import {
    AppBar, Box, Toolbar, IconButton, Typography, Button,
    Drawer, List, ListItem, ListItemText, ListItemIcon, InputBase,
    Link as MuiLink, Fade, Chip, Avatar, useScrollTrigger, Slide,
    Paper, InputAdornment, Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Close as CloseIcon,
    Home as HomeIcon,
    Lightbulb as LightbulbIcon,
    RocketLaunch as RocketIcon,
    Campaign as CampaignIcon,
    NewReleases as NewReleasesIcon,
    KeyboardArrowDown as ArrowDownIcon
} from '@mui/icons-material';
import { useTheme, useMediaQuery, alpha } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';

const navLinks = [
    { label: 'Blog', href: '/', icon: <HomeIcon /> },
    { label: 'Find an Idea', href: '/find-an-idea', icon: <LightbulbIcon /> },
    { label: 'Starting Up', href: '/starting-up', icon: <RocketIcon /> },
    { label: 'Marketing', href: '/marketing', icon: <CampaignIcon /> },
    { label: 'Latest', href: '/latest', icon: <NewReleasesIcon />, badge: 'New' },
];

function HideOnScroll({ children }) {
    const trigger = useScrollTrigger({
        threshold: 100,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (open) => () => setDrawerOpen(open);

    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (!trimmed) return;

        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        setSearchTerm('');

        // Use setTimeout to ensure drawer closes after navigation
        if (isMobile) {
            setTimeout(() => {
                setDrawerOpen(false);
            }, 100); // small delay
        }
    };

    const isActiveLink = (href) => {
        return location.pathname === href;
    };

    const modernAppBarStyles = {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 1px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    return (
        <>
            <HideOnScroll>
                <AppBar position="sticky" elevation={0} sx={modernAppBarStyles}>
                    <Toolbar sx={{
                        justifyContent: 'space-between',
                        minHeight: { xs: 64, md: 72 },
                        px: { xs: 2, md: 4 }
                    }}>
                        {/* Logo Section */}
                        <Box
                            component={RouterLink}
                            to="/"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                transition: 'transform 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 40,
                                    height: 40,
                                    bgcolor: theme.palette.primary.main,
                                    mr: 1.5,
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                L
                            </Avatar>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-0.5px'
                                }}
                            >
                                YourLogo
                            </Typography>
                        </Box>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {navLinks.map(({ label, href, badge }) => (
                                    <Button
                                        key={label}
                                        component={RouterLink}
                                        to={href}
                                        sx={{
                                            position: 'relative',
                                            px: 2,
                                            py: 1,
                                            borderRadius: 2,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            color: isActiveLink(href) ? theme.palette.primary.main : theme.palette.text.primary,
                                            backgroundColor: isActiveLink(href) ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                transform: 'translateY(-1px)',
                                            },
                                        }}

                                    >
                                        {label}
                                    </Button>
                                ))}
                            </Box>
                        )}

                        {/* Search and Menu Section */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {/* Desktop Search */}
                            {!isMobile && (
                                <Paper
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: searchFocused ? 280 : 240,
                                        height: 40,
                                        border: `1px solid ${alpha(theme.palette.divider, searchFocused ? 0.3 : 0.1)}`,
                                        borderRadius: 3,
                                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            borderColor: alpha(theme.palette.primary.main, 0.3),
                                            backgroundColor: theme.palette.background.paper,
                                        }
                                    }}
                                >
                                    <InputBase
                                        placeholder="Search articles..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onFocus={() => setSearchFocused(true)}
                                        onBlur={() => setSearchFocused(false)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        sx={{
                                            flex: 1,
                                            px: 2,
                                            fontSize: '0.9rem',
                                        }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
                                            </InputAdornment>
                                        }
                                    />
                                    {searchTerm && (
                                        <IconButton
                                            size="small"
                                            onClick={() => setSearchTerm('')}
                                            sx={{ mr: 0.5 }}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    )}
                                </Paper>
                            )}

                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <IconButton
                                    onClick={toggleDrawer(true)}
                                    sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        '&:hover': {
                                            bgcolor: alpha(theme.palette.primary.main, 0.2),
                                            transform: 'scale(1.05)'
                                        },
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {/* Modern Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 380 },
                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                        backdropFilter: 'blur(20px)',
                    },
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Drawer Header */}
                    <Box sx={{
                        p: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                                sx={{
                                    width: 36,
                                    height: 36,
                                    bgcolor: theme.palette.primary.main,
                                    mr: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                L
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                                YourLogo
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{
                                bgcolor: alpha(theme.palette.common.black, 0.1),
                                '&:hover': {
                                    bgcolor: alpha(theme.palette.common.black, 0.2),
                                    transform: 'rotate(90deg)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Mobile Search */}
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: 48,
                                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                                borderRadius: 3,
                                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                            }}
                        >
                            <InputBase
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                sx={{ flex: 1, px: 2, fontSize: '0.95rem' }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: theme.palette.text.secondary }} />
                                    </InputAdornment>
                                }
                            />
                            {searchTerm && (
                                <IconButton
                                    size="small"
                                    onClick={() => setSearchTerm('')}
                                    sx={{ mr: 1 }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Paper>
                    </Box>

                    <Divider sx={{ mx: 3, opacity: 0.3 }} />

                    {/* Navigation Links */}
                    <List sx={{ flex: 1, px: 2, py: 1 }}>
                        {navLinks.map(({ label, href, icon, badge }) => (
                            <ListItem
                                key={label}
                                component={RouterLink}
                                to={href}
                                onClick={toggleDrawer(false)}
                                sx={{
                                    mb: 1,
                                    borderRadius: 2,
                                    backgroundColor: isActiveLink(href)
                                        ? alpha(theme.palette.primary.main, 0.15)
                                        : 'transparent',
                                    color: isActiveLink(href)
                                        ? theme.palette.primary.main
                                        : theme.palette.text.primary,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        transform: 'translateX(8px)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{
                                    color: 'inherit',
                                    minWidth: 40,
                                    transition: 'transform 0.2s ease',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                    primaryTypographyProps={{
                                        fontWeight: isActiveLink(href) ? 600 : 500,
                                        fontSize: '1rem'
                                    }}
                                />
                                {badge && (
                                    <Chip
                                        label={badge}
                                        size="small"
                                        color="error"
                                        sx={{
                                            height: 20,
                                            fontSize: '0.7rem',
                                            fontWeight: 600
                                        }}
                                    />
                                )}
                            </ListItem>
                        ))}
                    </List>

                    {/* Footer */}
                    <Box sx={{
                        p: 3,
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        textAlign: 'center'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            © 2024 YourLogo. All rights reserved.
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default Navbar;