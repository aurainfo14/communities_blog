import React from 'react';
import { Box, Container, Grid, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Footer() {
    const socialLinks = [
        { icon: <FacebookIcon />, name: 'Facebook', url: 'https://facebook.com', color: '#1877F2' },
        { icon: <TwitterIcon />, name: 'Twitter', url: 'https://twitter.com', color: '#1DA1F2' },
        { icon: <InstagramIcon />, name: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
        { icon: <LinkedInIcon />, name: 'LinkedIn', url: 'https://linkedin.com', color: '#0A66C2' },
        { icon: <YouTubeIcon />, name: 'YouTube', url: 'https://youtube.com', color: '#FF0000' },
        { icon: <EmailIcon />, name: 'Newsletter', url: '#newsletter', color: '#34D399' }
    ];

    const blogCategories = [
        { name: 'Blog', path: '/' },
        { name: 'Find an Idea', path: '/find-an-idea' },
        { name: 'Starting Up', path: '/starting-up' },
        { name: 'Marketing', path: '/marketing' },
        { name: 'Latest', path: '/latest' }
    ];

    const quickLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Sitemap', path: '/sitemap' }
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{ backgroundColor: '#1e3a8a', overflow: 'hidden' }}>


            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ py: 6 }}>
                    <Grid container spacing={4}>
                        {/* Brand Section */}
                        <Grid item size={{xs:12 ,md:4}}>
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: '#FFF',
                                        fontWeight: 800,
                                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                                        mb: 2,
                                        background: 'linear-gradient(45deg, #FFF 30%, #93C5FD 90%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    Blog Hub
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.8)',
                                        lineHeight: 1.7,
                                        fontSize: '16px',
                                        mb: 3
                                    }}
                                >
                                    Discover inspiring stories, practical tips, and innovative ideas to fuel your entrepreneurial journey. From startup insights to marketing strategies, we're here to help you succeed.
                                </Typography>
                            </Box>
                        </Grid>

                        {/* Blog Categories */}
                        <Grid item size={{xs:12, sm:6, md:2.5}}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FFF',
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '18px',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: 0,
                                        width: '30px',
                                        height: '3px',
                                        background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
                                Categories
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {blogCategories.map((category, index) => (
                                    <Link
                                        key={index}
                                        to={category.path}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                padding: '8px 0',
                                                position: 'relative',
                                                '&:hover': {
                                                    color: '#60A5FA',
                                                    transform: 'translateX(8px)',
                                                    '&::before': {
                                                        width: '20px'
                                                    }
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: '-30px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '0',
                                                    height: '2px',
                                                    background: '#60A5FA',
                                                    transition: 'width 0.3s ease'
                                                }
                                            }}
                                        >
                                            {category.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        </Grid>

                        {/* Quick Links */}
                        <Grid item size={{xs:12, sm:6, md:2.5}}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FFF',
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '18px',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: 0,
                                        width: '30px',
                                        height: '3px',
                                        background: 'linear-gradient(45deg, #10B981, #059669)',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
                                Quick Links
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                padding: '8px 0',
                                                position: 'relative',
                                                '&:hover': {
                                                    color: '#10B981',
                                                    transform: 'translateX(8px)',
                                                    '&::before': {
                                                        width: '20px'
                                                    }
                                                },
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: '-30px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '0',
                                                    height: '2px',
                                                    background: '#10B981',
                                                    transition: 'width 0.3s ease'
                                                }
                                            }}
                                        >
                                            {link.name}
                                        </Typography>
                                    </Link>
                                ))}
                            </Box>
                        </Grid>

                        {/* Social Media & RSS */}
                        <Grid item size={{xs:12, md:3}}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FFF',
                                    fontWeight: 700,
                                    mb: 3,
                                    fontSize: '18px',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: '-8px',
                                        left: 0,
                                        width: '30px',
                                        height: '3px',
                                        background: 'linear-gradient(45deg, #F59E0B, #D97706)',
                                        borderRadius: '2px'
                                    }
                                }}
                            >
                                Connect With Us
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.7)',
                                        mb: 2,
                                        lineHeight: 1.6
                                    }}
                                >
                                    Follow us on social media for daily inspiration and updates
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 1.5,
                                        mb: 3
                                    }}
                                >
                                    {socialLinks.map((social, index) => (
                                        <IconButton
                                            key={index}
                                            component="a"
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                width: 45,
                                                height: 45,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                color: '#FFF',
                                                transition: 'all 0.3s ease',
                                                backdropFilter: 'blur(10px)',
                                                '&:hover': {
                                                    background: social.color,
                                                    transform: 'translateY(-3px) scale(1.05)',
                                                    boxShadow: `0 8px 25px ${social.color}40`,
                                                    borderColor: social.color
                                                }
                                            }}
                                            aria-label={`Follow us on ${social.name}`}
                                        >
                                            {social.icon}
                                        </IconButton>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

            {/* Bottom Section */}
            <Box
                sx={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            py: 3,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '14px',
                                textAlign: { xs: 'center', md: 'left' }
                            }}
                        >
                            © 2025 Blog Hub. All rights reserved. Made with ❤️ for entrepreneurs and dreamers.
                        </Typography>

                        {/* Back to Top Button */}
                        <IconButton
                            onClick={scrollToTop}
                            sx={{
                                background: 'linear-gradient(45deg, #3B82F6, #1D4ED8)',
                                color: '#FFF',
                                width: 45,
                                height: 45,
                                borderRadius: '12px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
                                }
                            }}
                            aria-label="Back to top"
                        >
                            <KeyboardArrowUpIcon />
                        </IconButton>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default Footer;