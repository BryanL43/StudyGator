/**************************************************************
* Author(s): Kenneth Wen, Bryan Lee, Nishi Suratia, & Min Ye Thway Khaing
* Last Updated: 9/19/2024
*
* File:: AboutPage.jsx
*
* Description:: This file handles the "About Us" page for our website.
*               Clicking on each profile will prompt a description 
*               of each member.
*
**************************************************************/

import React from 'react'
import { Link, useParams } from 'react-router-dom';

const usersData = [
    {
        name: "Bryan Lee",
        role: "Team Lead",
        imgUrl: "/pfp.png",
        linkUrl: "/Bryan",
        description: "Bryan is a junior at SFSU pursuing a major in Computer Science and minor in Mathematics. He enjoys traveling the world, learning new things, and enjoys sweet treats."
    },
    {
        name: "Nishi Suratia",
        role: "Lead Back-end Developer",
        imgUrl: "/phto.jpg",
        linkUrl: "/Nishi",
        description: "Nishi is a graduate student at SFSU majoring in Computer Science. She is a software developer that develops scalable cloud applications with the help of Artifical intelligence. When she is not coding ,She is either enjoying various cusines or travelling around."
    },
    {
        name: "Kenneth Wen",
        role: "Github Master",
        imgUrl: "/pfp.png",
        linkUrl: "/Kenneth",
        description: "Kenneth is a senior at SFSU majoring in Computer Science. Recently, he has been trying to learn simple cooking recipes. During his free time, he enjoys gambling for JPEGs in gacha games."
    },
    {
        name: "Min Ye Thway Khaing",
        role: "Front-end Developer",
        imgUrl: "/pfp.png",
        linkUrl: "/Kai",
        description: "Kai is a senior at SFSU majoring in Computer Science. He enjoys playing badminton in his free time."
    }
]

// Card template to display a team member
const TeamMember = ({ name, role, imgUrl, linkUrl }) => (
    <Link to={`/about${linkUrl}`} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div className="items-center bg-gray-50 xl:h-full rounded-lg shadow sm:flex">
            <div className='xl:h-full'>
                <img className="w-full xl:h-full min-w-[300px] rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgUrl} alt={`${name} Avatar`} />
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                    <p>{name}</p>
                </h3>
                <span className="text-gray-500">{role}</span>
            </div>
        </div>
    </Link>
);

// Render the About page
const Team = () => {
    return (
        <>
            <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">Our Team</h2>
                <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
                    This is Team#8's group project for 648/848 Software Engineering class. As a team, innovating and delivering
                    high-quality solutions for clients and users alike.
                </p>
            </div>
            <div className="grid gap-8 mb-6 lg:mb-16 lg:grid-cols-2">
                {usersData.map((user, index) => (
                    <TeamMember
                        key={index}
                        name={user.name}
                        role={user.role}
                        imgUrl={user.imgUrl}
                        linkUrl={user.linkUrl}
                    />
                ))}
            </div>
        </>
    )
}

// Page template for the sub about page containing specific individual team member's information
const RenderUser = ({ user }) => {
    const { name, role, imgUrl, description } = user;

    return (
        <section className="bg-white flex justify-center items-center min-h-[calc(100vh-136px)] lg:min-h-[calc(100vh-198px)]">
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <img className="w-full" src={imgUrl} alt={description} />
                <div className="mt-4 md:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">{name} - {role}</h2>
                    <p className="mb-6 font-light text-gray-500 md:text-lg">{description}</p>
                    <a href="/about" class="inline-flex items-center text-white bg-[#231161] hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Back
                        <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                        </svg>
                    </a>

                </div>
            </div>
        </section>
    )
}

// Render the sub about page
const About = () => {
    const { name } = useParams();
    const foundUser = usersData.find(user => user.linkUrl.replace("/", "") === name);

    return (
        <section className="bg-white" >
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                {foundUser ? (
                    <RenderUser user={foundUser} />
                ) : (
                    <Team />
                )}
            </div>
        </section>
    )
}

export default About;
