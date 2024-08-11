import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([
        { id: 1, question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
        { id: 2, question: 'What is the time complexity of binary search?', answer: 'O(log n)' },
        { id: 3, question: 'Name a popular JavaScript framework.', answer: 'React.js' },
    ]);
    const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });
    const [editingFlashcard, setEditingFlashcard] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFlashcard({ ...newFlashcard, [name]: value });
    };

    const addFlashcard = () => {
        if (newFlashcard.question && newFlashcard.answer) {
            setFlashcards([...flashcards, { ...newFlashcard, id: flashcards.length + 1 }]);
            setNewFlashcard({ question: '', answer: '' });
            toast.success("Flashcard Added Successfully")
        }
        else toast.warning("All field are Required !")
    };

    const startEditing = (flashcard) => {
        setEditingFlashcard(flashcard);
    };

    const saveEdit = () => {
        setFlashcards(flashcards.map((fc) => (fc.id === editingFlashcard.id ? editingFlashcard : fc)));
        setEditingFlashcard(null);
        toast.success("Flashcard Updated Successfully")
    };

    const deleteFlashcard = (id) => {
        setFlashcards(flashcards.filter((fc) => fc.id !== id));
        toast.success("Flashcard deleted Successfully")
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Flashcard Dashboard</h1>

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
                    {flashcards.map((flashcard) => (
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
                                    onClick={() => startEditing(flashcard)}
                                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg"
                                >
                                    Edit
                                </button>
                                <button
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

