export type Emplacement = {
    id_emplacement: string;
    id_user: string;
    localisation: string;
    caracteristique: string;
    equipement: string[];
    tarif: number;
    disponible: boolean;
    moyenneAvis: number;
    photos: string[];
    coordonnees: {
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    };
  };