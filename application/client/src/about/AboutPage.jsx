import React from 'react'

const TeamMember = ({ name, role, imgUrl, linkUrl }) => (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg" src={imgUrl} alt={`${name} Avatar`} />
        </a>
        <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">{name}</a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">{role}</span>
            {/* Social media icons can go here */}
        </div>
        </div>
    </a>
  );
  
  const Team = () => (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Team</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          As Team #8, we're proud of our ability to tackle challenges head-on, innovate, and deliver high-quality solutions for clients and users alike.
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <TeamMember
            name="Bryan Lee"
            role="Team Lead"
            imgUrl="https://www.mutkut.com/wp-content/uploads/2015/12/Loving-You-White-Dog-Display-Picture-300x300.jpg"
            linkUrl="/AboutBryan"
          />
          <TeamMember
            name="Nishi Suratia"
            role="Lead Back-end Developer"
            imgUrl="https://www.mutkut.com/wp-content/uploads/2015/12/Loving-You-White-Dog-Display-Picture-300x300.jpg"
            linkUrl="/AboutNishi"
          />
          <TeamMember
            name="Kenneth Wen"
            role="Github Master"
            imgUrl="https://www.mutkut.com/wp-content/uploads/2015/12/Loving-You-White-Dog-Display-Picture-300x300.jpg"
            linkUrl ="/AboutKenneth"
          />
          <TeamMember
            name="Min Ye Thway Khaing"
            role="Front-end Developer"
            imgUrl="https://www.mutkut.com/wp-content/uploads/2015/12/Loving-You-White-Dog-Display-Picture-300x300.jpg"
            linkUrl="/AboutKai"
          />
        </div>
      </div>
    </section>
  );
  
  export default Team;