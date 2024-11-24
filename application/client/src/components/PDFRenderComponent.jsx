import React, { memo } from 'react'

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