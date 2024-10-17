import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Emplacement } from '../models/emplacement_model';

interface EmplacementState {
  emplacements: Emplacement[];
  loading: boolean;
  error: string | null;
}

const initialState: EmplacementState = {
  emplacements: [],
  loading: false,
  error: null,
};

const emplacementSlice = createSlice({
  name: 'emplacement',
  initialState,
  reducers: {
    fetchEmplacementsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEmplacementsSuccess(state, action: PayloadAction<Emplacement[]>) {
      state.emplacements = action.payload;
      state.loading = false;
    },
    fetchEmplacementsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addEmplacement(state, action: PayloadAction<Emplacement>) {
      state.emplacements.push(action.payload);
    },
    updateEmplacement(state, action: PayloadAction<{ id: string; updatedEmplacement: Partial<Emplacement> }>) {
      const { id, updatedEmplacement } = action.payload;
      const index = state.emplacements.findIndex(emplacement => emplacement.id_emplacement === id);
      if (index !== -1) {
        state.emplacements[index] = { ...state.emplacements[index], ...updatedEmplacement };
      }
    },
    deleteEmplacement(state, action: PayloadAction<string>) {
      state.emplacements = state.emplacements.filter(emplacement => emplacement.id_emplacement !== action.payload);
    },
    resetEmplacement(state) {
      state.emplacements = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchEmplacementsStart,
  fetchEmplacementsSuccess,
  fetchEmplacementsFailure,
  addEmplacement,
  updateEmplacement,
  deleteEmplacement,
  resetEmplacement,
} = emplacementSlice.actions;

export default emplacementSlice.reducer;