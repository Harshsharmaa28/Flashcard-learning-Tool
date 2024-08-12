import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FlashcardPage = () => {
    const navigate = useNavigate();
    const [flashcards, setFlashcards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [savedFlashcards, setSavedFlashcards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdmin,setisAdmin] = useState(true);

    // Base API URL from environment variable
    const baseUrl = process.env.REACT_APP_API_BASE_URL;

    // Fetch flashcards from the backend
    useEffect(() => {
        axios.get(`${baseUrl}/flashcards`)
            .then(response => {
                setFlashcards(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the flashcards!", error);
            });
    }, [baseUrl]);

    // Load saved flashcards from local storage on mount
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedFlashcards')) || [];
        setSavedFlashcards(saved);
    }, []);

    const handleNext = () => {
        setIsFlipped(false); // Reset flip state when moving to next flashcard
        setCurrentIndex((currentIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false); // Reset flip state when moving to previous flashcard
        setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    };

    const saveFlashcard = () => {
        const flashcardToSave = flashcards[currentIndex];
        if(savedFlashcards.includes(flashcardToSave)){
            toast.info("Already Saved");
            return;
        }
        const updatedSavedFlashcards = [...savedFlashcards, flashcardToSave];
        setSavedFlashcards(updatedSavedFlashcards);
        localStorage.setItem('savedFlashcards', JSON.stringify(updatedSavedFlashcards));
        toast.success("Saved Successfully")
    };

    const removeSavedFlashcard = (indexToRemove) => {
        const updatedSavedFlashcards = savedFlashcards.filter((_, index) => index !== indexToRemove);
        setSavedFlashcards(updatedSavedFlashcards);
        localStorage.setItem('savedFlashcards', JSON.stringify(updatedSavedFlashcards));
        toast.success("Removed Successfully")
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleDashboardclick = () =>{
        if(isAdmin){
            alert("This Route is for admin but it is Accessible for Now only Click Ok to Continue...");
            navigate('/dashboard')
        }
    }
    const isPreviousDisabled = flashcards.length === 0 || currentIndex === 0;
    const isNextDisabled = flashcards.length === 0 || currentIndex === flashcards.length - 1;

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Flashcards</h1>

            {/* Saved Flashcards Button */}
            <button
                onClick={toggleModal}
                className="absolute top-4 right-4 px-4 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                View Saved Flashcards
            </button>

            <div className="mb-8">
                {flashcards.length > 0 && (
                    <Flashcard
                        flashcard={flashcards[currentIndex]}
                        isFlipped={isFlipped}
                        setIsFlipped={setIsFlipped}
                    />
                )}
            </div>
            <div className="flex items-center gap-10 space-x-4 mb-8">
                <button
                    onClick={handlePrevious}
                    aria-label="Previous flashcard"
                    disabled={isPreviousDisabled}
                    className={`px-6 py-2 text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isPreviousDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span className="text-lg">
                    {currentIndex + 1} / {flashcards.length}
                </span>
                <button
                    onClick={handleNext}
                    aria-label="Next flashcard"
                    disabled={isNextDisabled}
                    className={`px-6 py-2 text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={saveFlashcard}
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Save Flashcard
                </button>
                <button
                    onClick={handleDashboardclick}
                    className="px-6 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Go to Dashboard
                </button>
            </div>

            {/* Saved Flashcards Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white text-black p-8 rounded-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">Saved Flashcards</h2>
                        <ul className="space-y-4">
                            {savedFlashcards.length > 0 ? (
                                savedFlashcards.map((card, index) => (
                                    <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold">Q: {card.question}</p>
                                            <p>A: {card.answer}</p>
                                        </div>
                                        <button
                                            onClick={() => removeSavedFlashcard(index)}
                                            className="px-2 py-1 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 ml-4"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p>No flashcards saved.</p>
                            )}
                        </ul>
                        <button
                            onClick={toggleModal}
                            className="mt-6 px-4 py-2 text-white bg-red-500 rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
