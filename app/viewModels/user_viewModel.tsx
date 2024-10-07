import { useState, useEffect } from 'react';
import { User } from '../models/user.model';
import { Emplacement } from '../models/emplacement_model';

const useUserViewModel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch('/api/users');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data: User[] = await response.json();

        // Example data
        const data: User[] = [
          {
            id_user: '1',
            prenom: 'John',
            nom: 'Doe',
            email: 'john.doe@example.com',
            telephone: '1234567890',
            mot_de_passe: 'password123',
            role: 'admin',
            photo: 'https://via.placeholder.com/150',
            emplacements: [
              {
                id_emplacement: '1',
                id_user: '1',
                localisation: 'Paris',
                caracteristique: 'Spacieux',
                equipement: ['WiFi, TV'],
                tarif: 100,
                disponible: true,
                photos: ['https://via.placeholder.com/150'],
                moyenneAvis: 4.5,
                coordonnees: {
                    latitude: 48.8566,
                    longitude: 2.3522,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    },
              },
            ],
            reservations: [
              {
                id_reservation: '1',
                id_user: '1',
                date_debut: '2023-10-01',
                date_fin: '2023-10-10',
                statut: 'Confirmée',
                message_voyageur: 'Hâte de séjourner chez vous!',
                emplacement: {
                    id_emplacement: '2',
                    id_user: '2',
                    localisation: 'Lyon',
                    caracteristique: 'Confortable',
                    equipement: ['WiFi, TV'],
                    tarif: 80,
                    disponible: false,
                    moyenneAvis: 4.0,
                    photos: ['https://via.placeholder.com/150'],
                    coordonnees: {
                      latitude: 45.7640,
                      longitude: 4.8357,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                  },
              },
            }
            ],
            emplacementsFavoris: [
              {
                id_emplacement: '3',
                id_user: '1',
                localisation: 'Marseille',
                caracteristique: 'Luxueux',
                equipement: ['WiFi, TV, Piscine'],
                tarif: 150,
                disponible: true,
                moyenneAvis: 4.8,
                photos: ['https://via.placeholder.com/150'],
                coordonnees: {
                    latitude: 43.2965,
                    longitude: 5.3698,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    },
              },
            ],
          },
          
          {
            id_user: '2',
            prenom: 'Jane',
            nom: 'Smith',
            email: 'jane.smith@example.com',
            telephone: '0987654321',
            mot_de_passe: 'password456',
            role: 'user',
            photo: 'https://via.placeholder.com/150',
            emplacements: [],
            reservations: [],
            emplacementsFavoris: [],
          },
        ];

        setUsers(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const updateUser = (id_user: string, updatedUser: Partial<User>) => {
    setUsers(users.map(user => 
      user.id_user === id_user ? { ...user, ...updatedUser } : user
    ));
  };

  const deleteUser = (id_user: string) => {
    setUsers(users.filter(user => user.id_user !== id_user));
  };

  const getUserById = (id_user: string) => {
    return users.find(user => user.id_user === id_user) || null;
  };

  const addFavoriteEmplacement = (id_user: string, newEmplacement: Emplacement) => {
    setUsers(users.map(user => 
      user.id_user === id_user 
        ? { ...user, emplacementsFavoris: [...(user.emplacementsFavoris || []), newEmplacement] }
        : user
    ));
  };

  const removeFavoriteEmplacement = (id_user: string, id_emplacement: string) => {
    setUsers(users.map(user => 
      user.id_user === id_user 
        ? { ...user, emplacementsFavoris: user.emplacementsFavoris?.filter(e => e.id_emplacement !== id_emplacement) }
        : user
    ));
  };

  return {
    users,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    addFavoriteEmplacement,
    removeFavoriteEmplacement,
  };
};

export default useUserViewModel;