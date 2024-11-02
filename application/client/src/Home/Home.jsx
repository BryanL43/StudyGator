/**************************************************************
* Author(s): Bryan Lee & Kenneth Wen
* Last Updated: 11/2/2024
*
* File:: Home.jsx
*
* Description:: The landing page for the application containing a image carousel
*               and a list of recent tutor listings.
*
**************************************************************/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import imageIcon from './ImageIcon.svg'; // Special image icon

import TutorListingCard from '../components/TutorListingCard';

// Timer logic for handling manual interruption to automatic image rotation
const useTimer = (callback, delay) => {
    const intervalRef = useRef(null);

    const startTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(callback, delay);
    }, [callback, delay]);

    const clearTimer = useCallback(() => {
        clearInterval(intervalRef.current);
    }, []);

    // Start the timer on mount and clear it on unmount
    useEffect(() => {
        startTimer();
        return clearTimer;
    }, [startTimer, clearTimer]);

    return { resetTimer: startTimer, stopTimer: clearTimer };
};

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [buttonHeight, setButtonHeight] = useState(0);
    const [overlayState, setOverlayState] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const imageRef = useRef(null);

    // Update button sizes based on image size for very small screen
    const updateButtonHeight = () => {
        const img = imageRef.current;
        if (img && img.clientHeight !== 0) {
            setButtonHeight(img.clientHeight);
        }
    };

    useEffect(() => {
        updateButtonHeight();

        window.addEventListener('resize', updateButtonHeight); // Update on resize
        return () => { // Clean up listener
            window.removeEventListener('resize', updateButtonHeight);
        };
    }, []);

    // Function to go to the next slide
    const nextSlide = () => {
        if (isLocked) return;
        setOverlayState(true);
        setIsLocked(true);

        setTimeout(() => {
            setCurrentSlide((prevSlide) => {
                if (prevSlide + 1 >= 3) {
                    return 0;
                }
                return prevSlide + 1;
            });
            setOverlayState(false);

            // Lock buttons for 1.5 seconds
            setTimeout(() => {
                setIsLocked(false);
                updateButtonHeight();
            }, 1500);
        }, 400);
        updateButtonHeight();
    };

    const { resetTimer } = useTimer(nextSlide, 6000);

    // Function to go to the previous slide
    const prevSlide = () => {
        if (isLocked) return;
        setOverlayState(true);
        setIsLocked(true);

        setTimeout(() => {
            setCurrentSlide((prevSlide) => {
                if (prevSlide - 1 < 0) {
                    return 2;
                }
                return prevSlide - 1;
            });
            setOverlayState(false);
            resetTimer();

            // Lock buttons for 1.5 seconds
            setTimeout(() => {
                setIsLocked(false);
            }, 1500);
        }, 400);
        updateButtonHeight();
    };

    // Direct slide jump
    const setSlide = (slideNum) => {
        if (isLocked) return;
        setOverlayState(true);
        setIsLocked(true);

        setTimeout(() => {
            setCurrentSlide(slideNum);
            setOverlayState(false);
            resetTimer();

            // Lock buttons for 1.5 seconds
            setTimeout(() => {
                setIsLocked(false);
            }, 1500);
        }, 400);
        updateButtonHeight();
    }

    return (
        <div>
            {/* Image carousel */}
            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                <div className="relative h-[70vh] overflow-hidden">
                    <div className={`duration-700 ease-in-out z-10 ${currentSlide === 0 ? 'block' : 'hidden'}`} data-carousel-item>
                        <img
                            src="/SFSU-img-1.jpg"
                            ref={imageRef}
                            className="absolute w-full h-full object-cover -translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 left-1/2"
                            alt="SFSU library"
                        />
                    </div>
                    <div className={`duration-700 ease-in-out z-10 ${currentSlide === 1 ? 'block' : 'hidden'}`} data-carousel-item>
                        <img
                            src="/SFSU-img-2.jpg"
                            className="absolute w-full h-full object-cover -translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 left-1/2"
                            alt="Night time SFSU library"
                        />
                    </div>
                    <div className={`duration-700 ease-in-out z-10 ${currentSlide === 2 ? 'block' : 'hidden'}`} data-carousel-item>
                        <img
                            src="/SFSU-img-3.jpg"
                            className="absolute w-full h-full object-cover -translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 left-1/2"
                            alt="SFSU entrance"
                        />
                    </div>
                </div>

                {/* Overlay header */}
                <div className="absolute z-40 w-[70%] left-[17.5%] sm:left-[25.5%] md:left-[22.5%] top-[45%] transform -translate-y-1/2">
                    <h1 className="text-[48px] text-white font-bold drop-shadow-lg">
                        Find Your SFSU Tutor at<br></br>StudyGator
                    </h1>
                </div>

                {/* Overlay for transition effect */}
                <div className={`absolute inset-0 transition-all duration-500 ${overlayState ? 'bg-white opacity-90' : 'bg-black opacity-20'}`} />

                {/* Default image carousel navigation */}
                <div className="absolute hidden sm:block left-[20%] top-1/2 transform -translate-y-1/2 z-40">
                    <ol className="border-s-[2px] border-white">
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(0)} >
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white hover:ring-[#231161] hover:bg-[#ffdc70] cursor-pointer">
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(1)}>
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white hover:ring-[#231161] hover:bg-[#ffdc70] cursor-pointer">
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(2)}>
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white hover:ring-[#231161] hover:bg-[#ffdc70] cursor-pointer">
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                    </ol>
                </div>

                {/* Small screen image carousel navigation */}
                <button type="button" onClick={prevSlide} className="absolute sm:hidden top-0 start-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" style={{ height: buttonHeight }} data-carousel-prev>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white  group-focus:outline-none">
                        <svg className="w-4 h-4 text-white  rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                        <span className="sr-only">Previous</span>
                    </span>
                </button>
                <button type="button" onClick={nextSlide} className="absolute sm:hidden top-0 end-0 z-30 flex items-center justify-center px-4 cursor-pointer group focus:outline-none" style={{ height: buttonHeight }} data-carousel-next>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50  group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                        <svg className="w-4 h-4 text-white  rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <span className="sr-only">Next</span>
                    </span>
                </button>
            </div>
            
            {/* Recent Listings */}
            <section className="bg-gray-50 py-8 antialiased md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-4 flex items-end justify-center space-y-4 sm:space-y-0 md:mb-8">
                        <h2 className="mt-3 text-[28px] font-bold text-gray-900">Recent Tutor Listings</h2>
                    </div>

                    {/* Grid layout with 4 columns for the listing cards*/}
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 justify-center">

                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                        />
                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                        />
                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                        />

                    </div>

                    <div className="w-full text-center">
                        <button type="button" className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100">Browse more</button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;