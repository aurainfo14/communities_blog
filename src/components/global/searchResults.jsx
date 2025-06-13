import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Fade,
    Grid,
    Skeleton
} from '@mui/material';
import { Search, AccessTime } from '@mui/icons-material';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const query = useQuery().get('q')?.toLowerCase() || '';
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchBlogs = async () => {
            try {
                const response = await fetch('https://community-blog-410b.onrender.com/api/blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const filteredResults = blogs.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );

    if (loading) {
        return (
            <Box>
                {/* Header Section Skeleton */}
                <Box
                    sx={{
                        background: '#f8f9fa',
                        py: { xs: 6, md: 8 },
                        borderBottom: '1px solid #e9ecef'
                    }}
                >
                    <Container maxWidth="lg">
                        <Skeleton variant="text" width="40%" height={60} sx={{ mx: 'auto', mb: 2 }} />
                        <Skeleton variant="text" width="60%" height={30} sx={{ mx: 'auto' }} />
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
    }

    return (
        <>
            {/* Clean Header Section */}
            <Box
                sx={{
                    background: '#dde1e3',
                    py: { xs: 7, md: 12 },
                    borderBottom: '1px solid #e9ecef'
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            variant="h3"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: '#212529',
                                mb: 2,
                                fontSize: { xs: '2rem', md: '2.5rem' }
                            }}
                        >
                            Search Results
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#6c757d',
                                fontWeight: 400,
                                mb: 3
                            }}
                        >
                            Results for "{query}"
                        </Typography>
                        {filteredResults.length > 0 && (
                            <Chip
                                label={`${filteredResults.length} result${filteredResults.length !== 1 ? 's' : ''} found`}
                                sx={{
                                    backgroundColor: '#e9ecef',
                                    color: '#495057',
                                    fontWeight: 500
                                }}
                            />
                        )}
                    </Box>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ py: 5 }}>
                {filteredResults.length > 0 ? (
                    <Grid container spacing={4}>
                        {filteredResults.map((article, index) => (
                            <Grid item size={{xs :12, sm : 6, md : 4}} key={article._id || index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                        transition: 'all 0.2s ease-in-out',
                                        cursor: 'pointer',
                                        border: '1px solid #e9ecef',
                                        '&:hover': {
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                            transform: 'translateY(-2px)',
                                        }
                                    }}
                                    onClick={() => navigate(`/article-detail/${article._id}`)}
                                >
                                    {article.image && (
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={article.image}
                                            alt={article.title}
                                            sx={{

                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                    <CardContent sx={{
                                        flexGrow: 1,
                                        p: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2
                                    }}>
                                        <Chip
                                            label={article.type.toUpperCase()}
                                            size="small"
                                            sx={{
                                                alignSelf: 'flex-start',
                                                backgroundColor: '#EFF2FD',
                                                color: '#1e3a8a',
                                                fontWeight: 600,
                                                fontSize: '0.75rem'
                                            }}
                                        />

                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: '1.2rem',
                                                lineHeight: 1.4,
                                                color: '#212529',
                                                display: '-webkit-box',
                                                // textAlign: 'justify',
                                                wordBreak: 'break-word',
                                                overflowWrap: 'break-word',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                mb: 1
                                            }}
                                        >
                                            {article.title}
                                        </Typography>

                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            mt: 'auto',
                                            pt: 2,
                                            borderTop: '1px solid #e9ecef'
                                        }}>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: '#6c757d',
                                                    fontWeight: 500,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                <AccessTime sx={{ fontSize: 14 }} />
                                                {formatDate(article.createdAt)}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: '#1e3a8a',
                                                    fontWeight: 500,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                Read more →
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{
                            textAlign: 'center',
                            py: 8,
                            backgroundColor: '#ffffff',
                            borderRadius: 2,
                            border: '1px solid #e9ecef'
                        }}
                    >
                        <Search sx={{ fontSize: 48, color: '#adb5bd', mb: 3 }} />
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#212529' }}>
                            No Results Found
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#6c757d', mb: 1 }}>
                            We couldn't find any content matching your search for "{query}".
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d' }}>
                            Try different keywords or check your spelling.
                        </Typography>
                    </Box>
                )}
            </Container>
        </>
    );
}