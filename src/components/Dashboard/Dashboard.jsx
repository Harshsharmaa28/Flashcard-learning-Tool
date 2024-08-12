import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();
    const [flashcards, setFlashcards] = useState([]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editingFlashcard, setEditingFlashcard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Base API URL from environment variable
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    //flashcards from the backend
    useEffect(() => {
        axios.get(`${baseUrl}/flashcards`)
            .then(response => {
                setFlashcards(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the flashcards!", error);
                toast.error("Failed to load flashcards");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [baseUrl]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlashcard({ ...newFlashcard, [name]: value });
    };

    const addFlashcard = () => {
        if (newFlashcard.question && newFlashcard.answer) {
            axios.post(`${baseUrl}/flashcards`, newFlashcard)
                .then(response => {
                    setFlashcards([...flashcards, response.data]);
                    setNewFlashcard({ question: '', answer: '' });
                    toast.success("Flashcard Added Successfully");
                })
                .catch(error => {
                    console.error("There was an error adding the flashcard!", error);
                    toast.error("Failed to add flashcard");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            toast.warning("All fields are required!");
        }
    };

    const startEditing = (flashcard) => {
        setEditingFlashcard(flashcard);
    };

    const saveEdit = () => {
        axios.put(`${baseUrl}/flashcards/${editingFlashcard.id}`, editingFlashcard)
            .then(response => {
                const updatedFlashcards = flashcards?.map((fc) =>
                    fc.id === editingFlashcard.id ? response.data : fc
                );
                setFlashcards(updatedFlashcards);
                setEditingFlashcard(null);
                toast.success("Flashcard Updated Successfully");
            })
            .catch(error => {
                console.error("There was an error updating the flashcard!", error);
                toast.error("Failed to update flashcard");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const deleteFlashcard = (id) => {
        axios.delete(`${baseUrl}/flashcards/${id}`)
            .then(() => {
                const remainingFlashcards = flashcards.filter((fc) => fc.id !== id);
                setFlashcards(remainingFlashcards);
                toast.success("Flashcard Deleted Successfully");
            })
            .catch(error => {
                console.error("There was an error deleting the flashcard!", error);
                toast.error("Failed to delete flashcard");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className='flex justify-between'>
                <button
                    onClick={() => navigate('/')}
                    className="rounded-md border border-white px-3 h-10 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    Home
                </button>
                <h1 className="md:text-4xl text-2xl font-bold mb-8">Flashcard Dashboard</h1>
            </div>

            {/* Add Flashcard */}
            <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Add New Flashcard</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="question"
                        placeholder="Question"
                        value={newFlashcard.question}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 rounded-lg"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="answer"
                        placeholder="Answer"
                        value={newFlashcard.answer}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 rounded-lg"
                    />
                </div>
                <button
                    disabled={isLoading}
                    onClick={addFlashcard}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                    Add Flashcard
                </button>
            </div>

            {/* Edit Flashcard */}
            {editingFlashcard && (
                <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Edit Flashcard</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="question"
                            placeholder="Question"
                            value={editingFlashcard.question}
                            onChange={(e) =>
                                setEditingFlashcard({ ...editingFlashcard, question: e.target.value })
                            }
                            className="w-full p-2 bg-gray-700 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="answer"
                            placeholder="Answer"
                            value={editingFlashcard.answer}
                            onChange={(e) =>
                                setEditingFlashcard({ ...editingFlashcard, answer: e.target.value })
                            }
                            className="w-full p-2 bg-gray-700 rounded-lg"
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        onClick={saveEdit}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                    >
                        Save Changes
                    </button>
                </div>
            )}

            {/* Display Flashcards */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Your Flashcards</h2>
                <ul className="space-y-4">
                    {flashcards && flashcards?.map((flashcard) => (
                        <li
                            key={flashcard.id}
                            className="p-4 bg-gray-800 rounded-lg shadow-lg flex justify-between items-center"
                        >
                            <div>
                                <p className="text-lg font-bold">{flashcard.question}</p>
                                <p className="text-sm">{flashcard.answer}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    disabled={isLoading}
                                    onClick={() => startEditing(flashcard)}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
                                    disabled={isLoading}
                                    onClick={() => deleteFlashcard(flashcard.id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
