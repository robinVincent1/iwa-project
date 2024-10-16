import { useState, useEffect } from 'react';
import { User } from '../models/user.model';
import { Emplacement } from '../models/emplacement_model';

export function useUserViewModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Charger les utilisateurs (y compris leurs emplacements)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulation de données d'exemple
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
                equipement: ['WiFi', 'TV'],
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
            reservations: [],
            emplacementsFavoris: [],
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

  // Gérer les utilisateurs
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
    console.log('User deleted:', id_user);
  };

  const getUserById = (id_user: string) => {
    return users.find(user => user.id_user === id_user) || null;
  };

  // Gérer les emplacements
  const addEmplacement = (id_user: string, newEmplacement: Emplacement) => {
    setUsers(users.map(user => 
      user.id_user === id_user
        ? { ...user, emplacements: [...user.emplacements, newEmplacement] }
        : user
    ));
  };

  const updateEmplacement = (id_user: string, id_emplacement: string, updatedEmplacement: Partial<Emplacement>) => {
    setUsers(users.map(user => 
      user.id_user === id_user
        ? {
          ...user,
          emplacements: user.emplacements.map(emplacement =>
            emplacement.id_emplacement === id_emplacement
              ? { ...emplacement, ...updatedEmplacement }
              : emplacement
          ),
        }
        : user
    ));
  };

  const deleteEmplacement = (id_user: string, id_emplacement: string) => {
    setUsers(users.map(user => 
      user.id_user === id_user
        ? { ...user, emplacements: user.emplacements.filter(e => e.id_emplacement !== id_emplacement) }
        : user
    ));
  };

  const getEmplacementsByUser = (id_user: string) => {
    const user = getUserById(id_user);
    return user?.emplacements || [];
  };

  // Gérer les emplacements favoris
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
    addEmplacement,
    updateEmplacement,
    deleteEmplacement,
    getEmplacementsByUser,
    addFavoriteEmplacement,
    removeFavoriteEmplacement,
  };
}
