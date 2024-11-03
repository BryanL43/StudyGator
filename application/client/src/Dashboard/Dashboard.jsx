import React, { useState } from 'react';

import TutorListingCard from '../components/TutorListingCard';
import Message from '../components/Message';
import emailIcon from '../components/EmailIcon.svg';
import clipboardIcon from './ClipboardIcon.svg';
import starIcon from './StarIcon.svg';
import trashCanIcon from './TrashCanIcon.svg';

const Dashboard = () => {
    const [deleteWarning, setDeleteWarning] = useState(false);

    const toggleDeleteWarning = () => {
        setDeleteWarning(!deleteWarning);
    }

    return (
        <div className="bg-gray-50">

            <div>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                    <div className="container px-6 py-8 mx-auto">
                        <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

                        <div className="mt-4">
                            <div className="flex flex-wrap -mx-6">
                                <div className="w-full px-6 sm:w-1/2 xl:w-1/3 cursor-pointer">
                                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                        <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                                            <img src={emailIcon} className="w-10 h-10 filter invert brightness-200" alt="" />
                                        </div>

                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700">My Messages</h4>
                                            <div className="text-gray-500">3 new messages</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0 cursor-pointer">
                                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                        <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                                            <img src={clipboardIcon} className="w-10 h-10 filter invert brightness-200" alt="" />
                                        </div>

                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700">My Listings</h4>
                                            <div className="text-gray-500">Manage your tutor listings here</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0 cursor-pointer">
                                    <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                                        <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                                            <img src={starIcon} className="w-10 h-10 filter invert brightness-200" alt="" />
                                        </div>

                                        <div className="mx-5">
                                            <h4 className="text-2xl font-semibold text-gray-700">My Ratings</h4>
                                            <div className="text-gray-500">View your ratings</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <section className="bg-gray-50 py-8 antialiased md:py-12 hidden">
                            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                                <div className="mb-4 flex items-end justify-center space-y-4 sm:space-y-0 md:mb-8">
                                    <h2 className="mt-3 text-[28px] font-bold text-gray-900">Manage Tutor Listings</h2>
                                </div>

                                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 justify-center">

                                    <TutorListingCard
                                        name="Bryan Lee"
                                        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                                        price="1,699"
                                        imgSrc="/sillydogpfp.webp"
                                        isDashboard="true"
                                    />
                                    <TutorListingCard
                                        name="Bryan Lee"
                                        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                                        price="1,699"
                                        imgSrc="/sillydogpfp.webp"
                                        isDashboard="true"
                                    />
                                    <TutorListingCard
                                        name="Bryan Lee"
                                        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec."
                                        price="1,699"
                                        imgSrc="/sillydogpfp.webp"
                                        isDashboard="true"
                                    />

                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col mt-8">
                            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                                <div className="min-h-[406px] inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Sender</th>
                                                <th
                                                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Subject</th>
                                                <th
                                                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Content</th>
                                                <th
                                                    className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                                    Date Sent</th>
                                                <th
                                                    className="border-b border-gray-200 bg-gray-50">
                                                    <img src={trashCanIcon} onClick={toggleDeleteWarning} className="w-[20px] h-[20px] cursor-pointer" alt="delete message" />
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white">
                                            <Message
                                                name="Bryan Lee"
                                                email="blee@sfsu.edu"
                                                subject="Seeking computer science tutor"
                                                content="I need help with CSC648..."
                                                date="November 2, 2024, 13:46:55"
                                            />
                                            <Message
                                                name="Bryan Lee"
                                                email="blee@sfsu.edu"
                                                subject="Seeking computer science tutor"
                                                content="I need help with CSC648..."
                                                date="November 2, 2024, 13:46:55"
                                            />
                                            <Message
                                                name="Bryan Lee"
                                                email="blee@sfsu.edu"
                                                subject="Seeking computer science tutor"
                                                content="I need help with CSC648..."
                                                date="November 2, 2024, 13:46:55"
                                            />
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div >

            <div id="popup-modal" tabindex="-1" class={`${deleteWarning ? "" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center`}>
                <div className="absolute inset-0 transition-all duration-500 bg-black opacity-30" />
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" onClick={toggleDeleteWarning} class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete the following messages?</h3>
                            <button onClick={toggleDeleteWarning} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button onClick={toggleDeleteWarning} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default Dashboard