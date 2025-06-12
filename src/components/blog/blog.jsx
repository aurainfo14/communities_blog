import React, { useState, useEffect } from 'react';
import {Box, Container, Typography, Chip, Skeleton, Grid, Button, Divider} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import img from "../../assets/images.jfif";
import { RocketLaunch as RocketIcon, } from "@mui/icons-material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';


function Blog() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            try {
                setLoading(true);
                setError('');
                const response = await axios.get('https://community-blog-410b.onrender.com/api/blogs');
                setArticles(response.data);
            } catch (err) {
                setError('Failed to fetch articles');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Function to extract preview text from HTML content
    const getPreviewText = (htmlContent, maxLength = 200) => {
        if (!htmlContent) return 'No content available';

        // Remove HTML tags
        const textContent = htmlContent.replace(/<[^>]*>/g, '');

        // Truncate to maxLength
        if (textContent.length <= maxLength) {
            return textContent;
        }

        return textContent.substring(0, maxLength).trim() + '...';
    };

    if (loading) return (
        <Box sx={{ minHeight: '100vh', background: '#00000' }}>
            {/* Hero Section Skeleton */}
            <Box
                sx={{
                    // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: '#1e3a8a',
                        backdropFilter: 'blur(10px)',
                    }
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Skeleton variant="text" width="60%" height={80} sx={{ mx: 'auto', mb: 2 }} />
                    <Skeleton variant="text" width="80%" height={40} sx={{ mx: 'auto' }} />
                </Container>
            </Box>

            {/* Content Skeletons */}
            <Container maxWidth="xl" sx={{ py: 5 }}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    // sx={{ minHeight: '100vh' }} // Optional: vertically center
                >
                    <Grid container spacing={4} justifyContent="center" maxWidth="xl">
                        {[...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Skeleton variant="rectangular" width={410} height={218} sx={{ borderRadius: 3 }} />
                                <Skeleton sx={{ borderRadius: 3 }} />
                                <Skeleton width="60%" sx={{ borderRadius: 3 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );

    if (error) return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Typography sx={{
                color: 'white',
                fontSize: '1.2rem',
                backgroundColor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                padding: '20px 40px',
                borderRadius: '15px',
                fontWeight: 500
            }}>
                {error}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{
            minHeight: '100vh',
            background: '#00000'
        }}>
            {/* Hero Section */}

            <Box
                sx={{
                    background: "#1e3a8a",


                    py: { xs: 8, md: 12 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        // background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        right: '-50%',
                        width: '200%',
                        height: '200%',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        animation: 'float 6s ease-in-out infinite',
                    },
                    '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                        '50%': { transform: 'translateY(-20px) rotate(180deg)' },
                    }
                }}
            >
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <RocketIcon sx={{ fontSize: 60, color: '#FFD700', filter: 'drop-shadow(0 4px 8px rgba(255,215,0,0.3))' }} />
                    </Box>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            mb: 3,
                            color: 'white',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            background: 'linear-gradient(45deg, #FFD700, #FFF)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            animation: 'glow 2s ease-in-out infinite alternate',
                            '@keyframes glow': {
                                from: { filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))' },
                                to: { filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.8))' },
                            }
                        }}
                    >
                        Blog
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            color: 'rgba(255,255,255,0.9)',
                            fontWeight: 400,
                            lineHeight: 1.6,
                            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                        }}
                    >
                        Discover insights, stories, and knowledge that inspire innovation
                    </Typography>
                </Container>
            </Box>


            {/* Articles Section */}
            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box py={8}>
                    {articles.length === 0 ? (
                        <Box sx={{
                            textAlign: 'center',
                            py: 12,

                        }}>
                            <Typography variant="h4" sx={{
                                color: '#2d1b69',
                                fontWeight: 600,
                                mb: 2
                            }}>
                                No articles found
                            </Typography>
                            <Typography sx={{ color: '#667eea', fontSize: '1.1rem' }}>
                                Check back soon for new content!
                            </Typography>
                        </Box>
                    ) : (
                        articles.map((article, index) => (
                            <React.Fragment key={article.id || index}>
                                <Box sx={{
                                    mb: 6,
                                }}>
                                    <Box sx={{ pt: { xs: 4, md: 5 } }}>
                                        <Typography
                                            variant="h3"
                                            component="h1"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: { xs: '1.8rem', md: '2.5rem' },
                                                mb: 3,
                                                color: '#1e3a8a',
                                                lineHeight: 1.3,
                                                textAlign: 'justify',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',

                                            }}
                                        >
                                            {article.title || 'Untitled'}
                                        </Typography>

                                        {article.createdAt && (
                                            <Typography sx={{
                                                color: '#1e3a8a',
                                                fontSize: '0.95rem',
                                                fontWeight: 500,
                                                mb: 3,
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                                                px: 2,
                                                py: 1,
                                                borderRadius: '20px',
                                                '&::before': {

                                                    mr: 1
                                                }
                                            }}>
                                                <CalendarMonthIcon /> Published: {formatDate(article.createdAt)}
                                            </Typography>
                                        )}


                                        <Box sx={{
                                            // position: 'relative',
                                            mb: 4,
                                            borderRadius: '20px',
                                            overflow: 'hidden',
                                            boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
                                        }}>
                                            <Box
                                                component="img"
                                                src={article.image || img}
                                                alt={article.title || 'Blog image'}
                                                sx={{
                                                    objectFit: 'cover',
                                                    height: { xs: "250px", sm: "450px", md: "650px" },
                                                    width: '100%',
                                                    transition: 'transform 0.6s ease',
                                                    '&:hover': {
                                                        transform: 'scale(1)'
                                                    }
                                                }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = img;
                                                }}
                                            />
                                        </Box>

                                        {/* Preview Text instead of full content */}
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: 400,
                                                fontSize: { xs: '1.05rem', md: '1.1rem' },
                                                lineHeight: 1.8,
                                                color: '#4a5568',
                                                textAlign: 'justify',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                mb: 4,
                                            }}
                                        >
                                            {getPreviewText(article.content)}
                                        </Typography>

                                        {/* Read More Button */}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                            <Button
                                                variant="contained"
                                                endIcon={<ArrowForwardIcon />}
                                                onClick={() => navigate(`/article-detail/${article._id}`)}
                                                sx={{
                                                    background: 'linear-gradient(45deg, #1e3a8a, #3b82f6)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                    px: 4,
                                                    py: 1.5,
                                                    borderRadius: '25px',
                                                    textTransform: 'none',
                                                    boxShadow: '0 8px 25px rgba(30, 58, 138, 0.3)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #1e40af, #2563eb)',
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: '0 12px 35px rgba(30, 58, 138, 0.4)',
                                                    }
                                                }}
                                            >
                                                Read More
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Divider between articles (not after the last one) */}
                                {index < articles.length - 1 && (
                                    <Divider
                                        sx={{
                                            // my: 6,
                                            borderColor: 'rgba(30, 58, 138, 0.1)',
                                            borderWidth: '1px',
                                            width: '100%',
                                            mx: 'auto'
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        ))
                    )}
                </Box>
            </Container>
        </Box>
    );
}

export default Blog;