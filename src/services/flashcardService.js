import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

//APIs
export const getFlashcards = async () => {
    const response = await axios.get(`${baseUrl}/flashcards`);
    return response.data;
};

export const addFlashcard = async (flashcard) => {
    const response = await axios.post(`${baseUrl}/`, flashcard);
    return response.data;
};

export const updateFlashcard = async (id, flashcard) => {
    const response = await axios.put(`${baseUrl}/${id}`, flashcard);
    return response.data;
};

export const deleteFlashcard = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
};
