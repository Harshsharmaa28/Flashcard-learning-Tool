import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const FlashcardPage = () => {
    const navigate = useNavigate();
    const sampleFlashcards = [
        { id: 1, question: 'What does HTML stand for?', answer: 'HyperText Markup Language' },
        { id: 2, question: 'What is the time complexity of binary search?', answer: 'O(log n)' },
        { id: 3, question: 'Name a popular JavaScript framework.', answer: 'React.js' },
    ];

    const [flashcards] = useState(sampleFlashcards);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleNext = () => {
        setIsFlipped(false); // Reset flip state when moving to next flashcard
        setCurrentIndex((currentIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false); // Reset flip state when moving to previous flashcard
        setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
    };

    const isPreviousDisabled = flashcards.length === 0 || currentIndex === 0;
    const isNextDisabled = flashcards.length === 0 || currentIndex === flashcards.length - 1;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Flashcard Viewer</h1>
            <div className="mb-8">
                {flashcards.length > 0 && (
                    <Flashcard
                        flashcard={flashcards[currentIndex]}
                        isFlipped={isFlipped}
                        setIsFlipped={setIsFlipped}
                    />
                )}
            </div>
            <div className="flex items-center space-x-4 mb-8">
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
            <div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2 text-white bg-green-500 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};

