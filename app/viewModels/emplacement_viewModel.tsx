import { useState, useEffect } from 'react';
import { Emplacement } from '../models/emplacement_model';

const useEmplacementViewModel = () => {
    const [emplacements, setEmplacements] = useState<Emplacement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [favoris, setFavoris] = useState<string[]>([]);

    useEffect(() => {
        const fetchEmplacements = async () => {
            try {
                // const response = await fetch('/api/emplacements');
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data: Emplacement[] = await response.json();

                // Données d'exemple
                const data: Emplacement[] = [
                    {
                        id_emplacement: '1',
                        id_user: 'user1',
                        localisation: 'Paris',
                        caracteristique: 'Spacieux et lumineux',
                        equipement: ['WiFi', 'Climatisation'],
                        tarif: 100,
                        disponible: true,
                        moyenneAvis: 4.5,
                        photos: ['https://example.com/photo1.jpg'],
                        coordonnees: {
                            latitude: 48.8566,
                            longitude: 2.3522,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                    },
                    {
                        id_emplacement: '2',
                        id_user: 'user2',
                        localisation: 'Lyon',
                        caracteristique: 'Confortable et bien situé',
                        equipement: ['Parking', 'Piscine'],
                        tarif: 80,
                        disponible: false,
                        moyenneAvis: 4.0,
                        photos: ['https://example.com/photo2.jpg'],
                        coordonnees: {
                            latitude: 45.7640,
                            longitude: 4.8357,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                    },
                    {
                        id_emplacement: '3',
                        id_user: 'user3',
                        localisation: 'Montpellier',
                        caracteristique: 'Charmant et moderne',
                        equipement: ['WiFi', 'Balcon', 'Cuisine équipée'],
                        tarif: 90,
                        disponible: true,
                        moyenneAvis: 4.8,
                        photos: ['https://example.com/photo3.jpg'],
                        coordonnees: {
                            latitude: 43.6112,
                            longitude: 3.8767,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        },
                    },
                ];
                

                setEmplacements(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmplacements();
    }, []);

    const getEmplacementById = (id_emplacement: string) => {
        return emplacements.find(emplacement => emplacement.id_emplacement === id_emplacement) || null;
    };

    const getEmplacementsByUserId = (id_user: string) => {
        return emplacements.filter(emplacement => emplacement.id_user === id_user);
    };

    const deleteEmplacement = (id_emplacement: string) => {
        setEmplacements(emplacements.filter(emplacement => emplacement.id_emplacement !== id_emplacement));
    };

    const updateEmplacement = (id_emplacement: string, updatedEmplacement: Partial<Emplacement>) => {
        setEmplacements(emplacements.map(emplacement => 
            emplacement.id_emplacement === id_emplacement ? { ...emplacement, ...updatedEmplacement } : emplacement
        ));
    };

    const getFavorisByUserId = (id_user: string) => {
        return emplacements.filter(emplacement => favoris.includes(emplacement.id_emplacement));
    };

    return {
        emplacements,
        loading,
        error,
        getEmplacementById,
        getEmplacementsByUserId,
        deleteEmplacement,
        updateEmplacement
    };
};

export default useEmplacementViewModel;