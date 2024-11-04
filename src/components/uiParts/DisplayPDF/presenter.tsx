import React from 'react';
import { ScrollMode, SpecialZoomLevel, Viewer, ViewMode } from '@react-pdf-viewer/core';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface DisplayPDFProps {
    pdfData: string; // Base64 encoded PDF data
}

const DisplayPDF = (props: DisplayPDFProps) => {
    return(
        <div style={{ 
            height: '400px', 
            border: '1px solid rgba(0, 0, 0, 0.3)', 
            overflow: 'auto',  }}>
            <Viewer
            fileUrl={props.pdfData}
            defaultScale={SpecialZoomLevel.PageFit}
            scrollMode={ScrollMode.Vertical}
        />
        </div>
    )
}

export default DisplayPDF;