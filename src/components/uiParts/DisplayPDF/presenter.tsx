import React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

interface DisplayPDFProps {
    pdfData: string; // Base64 encoded PDF data
}

const DisplayPDF = (props: DisplayPDFProps) => {
    return (
        <div>
            <Viewer fileUrl={props.pdfData} />
        </div>
    );
};

export default DisplayPDF;