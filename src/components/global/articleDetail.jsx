import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Divider, Chip, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import fallbackImg from '../../assets/images.jfif'; // fallback image
import ReactMarkdown from 'react-markdown'; // ✅ markdown renderer
import rehypeRaw from 'rehype-raw'; // ✅ allow raw HTML
import rehypeSanitize from 'rehype-sanitize'; // ✅ sanitize HTML
import { CalendarToday, AccessTime, ArrowBack } from '@mui/icons-material';

function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const fetchArticle = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch the specific article by ID
                const response = await axios.get(`https://community-blog-410b.onrender.com/api/blogs/${id}`);
                setArticle(response.data);

            } catch (err) {
                console.error('Error fetching article:', err);

                // If direct fetch fails, try fetching all articles and find the one with matching ID
                try {
                    const allArticlesResponse = await axios.get('https://community-blog-410b.onrender.com/api/blogs');
                    const foundArticle = allArticlesResponse.data.find((a) => a._id === id);

                    if (foundArticle) {
                        setArticle(foundArticle);
                    } else {
                        setError('Article not found');
                    }
                } catch (secondErr) {
                    console.error('Error fetching all articles:', secondErr);
                    setError('Failed to fetch article. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        } else {
            setError('No article ID provided');
            setLoading(false);
        }
    }, [id]);

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    if (loading) {
        return (
            <Container maxWidth="md">
                <Box
                    py={8}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    <CircularProgress size={50} thickness={4} />
                    <Typography variant="h6" color="text.secondary">
                        Loading article...
                    </Typography>
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md">
                <Box py={8} textAlign="center">
                    <Typography
                        variant="h5"
                        color="error"
                        gutterBottom
                        sx={{ fontWeight: 600 }}
                    >
                        Oops! Something went wrong
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        onClick={handleGoBack}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        );
    }

    if (!article) {
        return (
            <Container maxWidth="md">
                <Box py={8} textAlign="center">
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: "bold",
                            color: 'text.primary',
                            mb: 2
                        }}
                    >
                        Article Not Found
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                        The article you're looking for doesn't exist or has been removed.
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        onClick={handleGoBack}
                        sx={{ mt: 2 }}
                    >
                        Go Back
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box py={4}>
                {/* Back Button */}
                <Button
                    startIcon={<ArrowBack />}
                    onClick={handleGoBack}
                    sx={{ mb: 3, color: 'text.secondary' }}
                >
                    Back to Articles
                </Button>

                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography

                        component="h1"
                        gutterBottom
                        sx={{
                            fontSize:{md:45,sm:43,xs:41},
                            fontWeight: 'bold',
                            lineHeight: 1.2,
                            textAlign: 'justify',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            color: 'text.primary',
                            mb: 3
                        }}
                    >
                        {article.title}
                    </Typography>

                </Box>

                {/* Featured Image */}
                {article.image && (
                    <Box
                        sx={{
                            mb: 4,
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                            }
                        }}
                    >
                        <Box
                            component="img"
                            src={article.image}
                            alt={article.title}
                            sx={{
                                objectFit: 'cover',
                                height: { xs: "250px", sm: "450px", md: "650px" },
                                width: '100%',
                                display: 'block'
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = fallbackImg;
                            }}
                        />
                    </Box>
                )}

                {/* Article Content */}
                {article.content && (
                    <Box
                        sx={{
                            mt: 4,
                            textAlign: 'justify',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            '& .markdown-content': {
                                '& h1, & h2, & h3, & h4, & h5, & h6': {
                                    fontWeight: 'bold',
                                    margin: '24px 0 16px 0',
                                    color: 'text.primary'
                                },
                                '& h1': { fontSize: '2rem' },
                                '& h2': { fontSize: '1.75rem' },
                                '& h3': { fontSize: '1.5rem' },
                                '& p': {
                                    fontSize: '1.1rem',
                                    lineHeight: 1.8,
                                    margin: '16px 0',
                                    color: 'text.primary'
                                },
                                '& img': {
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    margin: '16px 0',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                },
                                '& blockquote': {
                                    borderLeft: '4px solid #1976d2',
                                    paddingLeft: '16px',
                                    margin: '24px 0',
                                    fontStyle: 'italic',
                                    backgroundColor: 'rgba(25, 118, 210, 0.04)',
                                    padding: '16px',
                                    borderRadius: '0 8px 8px 0'
                                },
                                '& ul, & ol': {
                                    paddingLeft: '24px',
                                    margin: '16px 0'
                                },
                                '& li': {
                                    margin: '8px 0',
                                    lineHeight: 1.6
                                },
                                '& code': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '0.9em',
                                    fontFamily: 'monospace'
                                },
                                '& pre': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    overflow: 'auto',
                                    margin: '16px 0'
                                },
                                '& a': {
                                    color: '#1976d2',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline'
                                    }
                                },
                                '& table': {
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    margin: '24px 0',
                                    fontSize: '0.95rem'
                                },
                                '& th, & td': {
                                    padding: '12px',
                                    textAlign: 'left',
                                    borderBottom: '1px solid #ddd'
                                },
                                '& th': {
                                    backgroundColor: 'rgba(0,0,0,0.05)',
                                    fontWeight: 'bold'
                                }
                            }
                        }}
                    >
                        <div className="markdown-content">
                            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                                {article.content}
                            </ReactMarkdown>
                        </div>
                    </Box>
                )}

                {/* Footer spacing */}

            </Box>
        </Container>
    );
}

export default ArticleDetail;