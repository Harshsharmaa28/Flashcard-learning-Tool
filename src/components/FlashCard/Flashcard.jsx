import React, { useState } from 'react';
import './Flashcard.css';
import { ArrowRight } from 'lucide-react'

const Flashcard = ({ flashcard, isFlipped, setIsFlipped }) => {
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: flashcard.question,
                    text: `Check out this flashcard: ${flashcard.question} - ${flashcard.answer}`,
                    url: window.location.href,
                });
                console.log('Flashcard shared successfully!');
            } catch (error) {
                console.error('Error sharing flashcard:', error);
            }
        } else {
            alert('Sharing is not supported on this browser.');
        }
    };

    return (
        <div className=' overflow-hidden'>
            <div
                className="flashcard-container w-screen md:w-[27rem] h-[15rem]"
                onClick={handleFlip}
            >
                <div className={`flashcard-inner ${isFlipped ? 'is-flipped' : ''}`}>
                    {/* Front of the card */}
                    <div className="flashcard-front">
                        <p className="text-xl text-center font-bold text-white">{flashcard.question}</p>
                    </div>

                    {/* Back of the card */}
                    <div className="flashcard-back">
                        <p className="text-xl text-center flex flex-wrap font-semibold text-white">{flashcard.answer}</p>
                    </div>
                </div>

                {/* Share Button */}
            </div>
            <div className=' flex justify-center items-center'>
                <button
                    className=" border-1 p-2  mt-10 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-100"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent flip when clicking the share button
                        handleShare();
                    }}
                >
                    Share
                    <ArrowRight className="ml-2 h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default Flashcard;
