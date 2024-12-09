/**************************************************************
* Author(s): Bryan Lee
* Last Updated: 12/3/2024
*
* File:: PDFRenderComponent.jsx
*
* Description:: The memorization component of pdf pop-up to lazy load
*               for optimization.
*
**************************************************************/

import React, { memo } from 'react'

/**
 * Pdf-pop up component
 * 
 * @param {url} pdfSrc The reconstructed url object of the buffered pdf file.
 * @returns The memorized pdf pop-up model.
 */
const PDFRenderComponent = memo(({ pdfSrc }) => {
    return (
        <div className="overflow-auto" style={{ maxHeight: '90vh' }}>
            <iframe
                src={pdfSrc}
                width="100%"
                height="700px"
                className="rounded-md"
                title="Resume PDF"
                style={{ border: "none" }}
                loading="lazy"
            ></iframe>
        </div>
    )
});

export default PDFRenderComponent