import { Container, Grid, Typography, Box, Pagination, Card, CardContent, CardMedia, Chip, Fade, Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Campaign as CampaignIcon, TrendingUp as TrendingUpIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';

function Marketing() {
    const itemsPerPage = 19;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        const fetchArticles = async () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            try {
                setLoading(true);
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

    const ideaArticles = articles.filter(article => article.type === 'Marketing');
    const totalPages = Math.ceil(ideaArticles.length / itemsPerPage);
    const paginatedArticles = ideaArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleChange = (_, value) => setPage(value);

    if (loading) {
        return (
            <Box>
                {/* Hero Section Skeleton */}
                <Box
                    sx={{
                        background: '#1e3a8a',
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
                                    <Skeleton animation="wave" variant="rectangular" width={410} height={218} sx={{ borderRadius: 3 }} />
                                    <Skeleton animation="wave" sx={{ borderRadius: 3 }} />
                                    <Skeleton animation="wave" width="60%" sx={{ borderRadius: 3 }} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
                    {error}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Please try again later
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {/* Enhanced Hero Section */}
            <Box
                sx={{
                    background: '#1e3a8a',
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
                        <CampaignIcon sx={{ fontSize: 60, color: '#FFD700', filter: 'drop-shadow(0 4px 8px rgba(255,215,0,0.3))' }} />
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
                        Marketing
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
                        Learn how to build a multi-channel marketing strategy to reach and grow your audience.
                    </Typography>
                </Container>
            </Box>

            {/* Enhanced Content Section */}
            <Container maxWidth="xl" sx={{ py: 6 }}>
                <Fade in timeout={800}>
                    <Box>
                        <Grid container spacing={4}>
                            {paginatedArticles.map((article, index) => {
                                const isFeatured = index < 3;
                                return (
                                    <Grid
                                        item
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: isFeatured ? 4 : 3
                                        }}
                                        key={article.id || index}
                                    >
                                        <Fade in timeout={600 + index * 100}>
                                            <Card
                                                sx={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    borderRadius: 3,
                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    '&:hover': {
                                                        transform: 'translateY(-8px)',
                                                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                                                        '& .card-image': {
                                                            transform: 'scale(1.05)',
                                                        },
                                                        '& .card-title': {
                                                            color: '#1e3a8a',
                                                        }
                                                    },
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: '3px',
                                                        background: '#1e3a8a',
                                                        opacity: 0,
                                                        transition: 'opacity 0.3s ease',
                                                    },
                                                    '&:hover::before': {
                                                        opacity: 1,
                                                    }
                                                }}
                                                onClick={() => navigate(`/article-detail/${article._id}`)}
                                            >
                                                {isFeatured && article.image && (
                                                    <CardMedia
                                                        component="img"
                                                        height="240"
                                                        image={article.image}
                                                        alt={article.title}
                                                        className="card-image"
                                                        sx={{

                                                            objectFit: 'cover',
                                                            display: { xs: 'none', md: 'block' },
                                                            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        }}
                                                    />
                                                )}
                                                <CardContent sx={{
                                                    flexGrow: 1,
                                                    p: 3,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 1.5
                                                }}>
                                                    <Chip
                                                        label="MARKETING"
                                                        size="small"
                                                        sx={{
                                                            alignSelf: 'flex-start',
                                                            backgroundColor: '#EFF2FD',
                                                            color: '#1e3a8a',
                                                            fontWeight: 700,
                                                            fontSize: '0.75rem',
                                                            letterSpacing: '0.5px'
                                                        }}
                                                    />

                                                    <Typography
                                                        variant="h6"
                                                        className="card-title"
                                                        sx={{
                                                            fontWeight: 700,
                                                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                                                            lineHeight: 1.3,
                                                            color: '#2c3e50',
                                                            transition: 'color 0.3s ease',
                                                            display: '-webkit-box',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            // textAlign: 'justify',
                                                            wordBreak: 'break-word',
                                                            overflowWrap: 'break-word',
                                                            overflow: 'hidden',
                                                            flexGrow: 1
                                                        }}
                                                    >
                                                        {article.title}
                                                    </Typography>

                                                    <Box sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        mt: 'auto'
                                                    }}>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: '#7f8c8d',
                                                                fontWeight: 500,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                                                            {formatDate(article.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Fade>
                                    </Grid>
                                );
                            })}
                        </Grid>

                        {totalPages > 1 && (
                            <Fade in timeout={1000}>
                                <Box sx={{
                                    mt: 6,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    p: 3,
                                    backgroundColor: '#fafafa',
                                    borderRadius: 3,
                                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                                }}>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handleChange}
                                        color="primary"
                                        shape="rounded"
                                        size="large"
                                        sx={{
                                            '& .MuiPaginationItem-root': {
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                '&:hover': {
                                                    backgroundColor: '#e1f5fe',
                                                    transform: 'scale(1.1)',
                                                },
                                                '&.Mui-selected': {
                                                    background: 'linear-gradient(45deg, #00d2ff, #3a7bd5)',
                                                    color: 'white',
                                                    '&:hover': {
                                                        background: 'linear-gradient(45deg, #00b4d8, #2a5f98)',
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </Box>
                            </Fade>
                        )}
                    </Box>
                </Fade>
            </Container>
        </>
    );
}

export default Marketing;