
import { useState, useEffect } from 'react';
import { Article } from '../models/article.model';

const useArticleViewModel = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // const response = await fetch('/api/articles');
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data: Article[] = await response.json();

                // Données d'exemple
                const data: Article[] = [
                    {
                        id_article: '1',
                        titre: 'Article 1',
                        extrait_description: 'Ceci est un extrait de l\'article 1.',
                        description: 'Voici la description complète de l\'article 1. Il parle de divers sujets intéressants.',
                        date: '28/09/2024',
                        image: 'https://via.placeholder.com/150',
                    },
                    {
                        id_article: '2',
                        titre: 'Article 2',
                        extrait_description: 'Ceci est un extrait de l\'article 2.',
                        description: 'La description complète de l\'article 2 contient des informations détaillées.',
                        date: '29/09/2024',
                        image: 'https://via.placeholder.com/150',
                    },
                ];

                setArticles(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const addArticle = (newArticle: Article) => {
        setArticles([...articles, newArticle]);
    };

    const updateArticle = (id_article: string, updatedArticle: Partial<Article>) => {
        setArticles(articles.map(article => 
            article.id_article === id_article ? { ...article, ...updatedArticle } : article
        ));
    };

    const deleteArticle = (id_article: string) => {
        setArticles(articles.filter(article => article.id_article !== id_article));
    };

    const getArticleById = (id_article: string) => {
        return articles.find(article => article.id_article === id_article) || null;
    };

    return {
        articles,
        loading,
        error,
        addArticle,
        updateArticle,
        deleteArticle,
        getArticleById
    };
};

export default useArticleViewModel;