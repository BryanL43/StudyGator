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
import imageIcon from './ImageIcon.svg';
import loadingIcon from './LoadingIcon.svg';

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
    const [overlayState, setOverlayState] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const imageRef = useRef(null);

    // Function to switch to the next slide
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
            }, 1500);
        }, 400);
    };

    const { resetTimer } = useTimer(nextSlide, 6000);

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
                        Find Your SFSU Tutor at<br></br>StudyGator!
                    </h1>
                </div>

                {/* Overlay for transition effect */}
                <div className={`absolute inset-0 transition-all duration-500 ${overlayState ? 'bg-white opacity-90' : 'bg-black opacity-20'}`} />

                {/* Image carousel navigation */}
                <div className="absolute hidden sm:block left-[20%] top-1/2 transform -translate-y-1/2 z-40">
                    <ol className="border-s-[2px] border-white">
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(0)} >
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${(currentSlide === 0) ? 'ring-[#231161] bg-[#ffdc70]' : 'ring-white bg-gray-100 hover:ring-gray-50 hover:bg-gray-300'} rounded-full -start-4 ring-4 ring-white cursor-pointer`}>
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(1)}>
                            <span className={`absolute flex items-center justify-center w-8 h-8 ${(currentSlide === 1) ? 'ring-[#231161] bg-[#ffdc70]' : 'ring-white bg-gray-100 hover:ring-gray-50 hover:bg-gray-300'} rounded-full -start-4 ring-4 ring-white cursor-pointer`}>
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                        <li className="mb-10 ms-6 h-16 flex items-center" onClick={() => setSlide(2)}>
                        <span className={`absolute flex items-center justify-center w-8 h-8 ${(currentSlide === 2) ? 'ring-[#231161] bg-[#ffdc70]' : 'ring-white bg-gray-100 hover:ring-gray-50 hover:bg-gray-300'} rounded-full -start-4 ring-4 ring-white cursor-pointer`}>
                                <img src={imageIcon} className="w-3.5 h-3.5" alt="" />
                            </span>
                        </li>
                    </ol>
                </div>

            </div>
            
            {/* Recent Listings */}
            <section className="bg-gray-50 py-8 antialiased md:py-12">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mb-12 flex items-end justify-center space-y-4 sm:space-y-0 md:mb-16">
                        <h2 className="mt-3 text-[28px] font-bold text-gray-900">Recent Tutor Listings</h2>
                    </div>

                    {/* Loading icon */}
                    <div className="hidden flex items-center justify-center">
                        <img src={loadingIcon} className="w-20 h-20" alt="Loading..." />
                    </div>

                    {/* Grid layout with 4 columns for the listing cards*/}
                    <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 justify-center justify-items-center">

                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                            isDashboard="false"
                        />
                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                            isDashboard="false"
                        />
                        <TutorListingCard
                            name="Bryan Lee"
                            description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                            price="1,699"
                            imgSrc="/sillydogpfp.webp"
                            isDashboard="false"
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