/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 9/19/2024
*
* File:: VideoComponent.jsx
*
* Description:: This file seperates the video component to capitalize on 
*               React's memo. This helps reduce multiply rerendering and save
*               resources.
*
**************************************************************/

import React, { memo } from 'react'

const VideoComponent = memo(({ videoSrc }) => {
    return (
        <div className="flex justify-center w-full max-w-screen-md mb-8">
            {/* Aspect Ratio Wrapper */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                <video
                    controls
                    className="absolute top-0 left-0 w-full h-full rounded-md shadow-2xl object-cover"
                    loading="lazy"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
});

export default VideoComponent