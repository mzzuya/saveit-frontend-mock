import { create } from 'zustand';
// import axios from 'axios';
// import weeklyRecords from '../data/WeeklyRecords';
import { getExpense } from '../api/expense';
import { getSave } from '../api/save';
import useTokenStore from './useTokenStore';
import axios from 'axios';

const useWeeklyStore = create((set) => ({
    weeklyRecords: [],
    expenseData: [],
    saveData: [],
    isLoadingExpense: false,
    isLoadingSave: false,
    isLoading: false,
    error: null,

    fetchExpense: async (offset = 0) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getExpense(offset); // API 호출
            set({ expenseData: data, isLoadingExpense: false, isLoading: false });
        } catch (error) {
            set({ error: error.message || "오류 발생", isLoadingExpense: false });
        }
    },

    fetchSave: async (offset = 0) => {
        set({ isLoading: true, error: null });
        try {
            const data = await getSave(offset); // API 호출
            set({ saveData: data, isLoadingSave: false, isLoading: false });
        } catch (error) {
            set({ error: error.message || "오류 발생", isLoadingSave: false });
        }
    },

    patchExpense: async (id, day, kind, category, amount, offset = 0) => {
        const token = useTokenStore.getState().token;
        set({ isLoading: true, error: null });
        try {
            await axios.patch(`http://localhost:8080/api/expense/${id}`, {
                expenseDate: day,
                kind,
                category,
                amount,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            await getExpense(offset).then((data) => {
                set({ expenseData: data, isLoadingExpense: false, isLoading: false });
            });
        } catch (error) {
            set({ error: error.message || '수정 오류', isLoadingExpense: false, isLoading: false });
            throw error;
        }
    },

    patchSave: async (id, day, kind, category, amount, offset = 0) => {
        const token = useTokenStore.getState().token;
        set({ isLoading: true, error: null });
        try {
            await axios.patch(`http://localhost:8080/api/save/${id}`, {
                saveDate: day,
                kind,
                category,
                amount,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            await getSave(offset).then((data) => {
                set({ saveData: data, isLoadingSave: false, isLoading: false });
            });
        } catch (error) {
            set({ error: error.message || '수정 오류', isLoadingSave: false, isLoading: false });
            throw error;
        }
    },

    // ✅ PATCH: expense 수정
    updateExpense: async (id, payload, offset = 0) => {
        const token = useTokenStore.getState().token;
        set({ isLoading: true, error: null });
        try {
            await axios.patch(`http://localhost:8080/api/expense/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await getExpense(offset);
            set({ expenseData: data, isLoadingExpense: false, isLoading: false });
        } catch (error) {
            set({ error: error.message || '수정 오류', isLoadingExpense: false, isLoading: false });
            throw error;
        }
    },

    // ✅ PATCH: save 수정
    updateSave: async (id, payload, offset = 0) => {
        const token = useTokenStore.getState().token;
        set({ isLoading: true, error: null });
        try {
            await axios.patch(`http://localhost:8080/api/save/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const data = await getSave(offset);
            set({ saveData: data, isLoadingSave: false, isLoading: false });
        } catch (error) {
            set({ error: error.message || '수정 오류', isLoadingSave: false, isLoading: false });
            throw error;
        }
    },

    deleteExpense: async (id) => {
        await axios.delete(`/api/expense/${id}`);
        set((state) => ({
            weeklyRecords: state.weeklyRecords.filter(item => item.id !== id)
        }));
    },
    deleteSave: async (id) => {
        await axios.delete(`/api/save/${id}`);
        set((state) => ({
            weeklyRecords: state.weeklyRecords.filter(item => item.id !== id)
        }));
    }
}));

export default useWeeklyStore;