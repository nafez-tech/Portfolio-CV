import React from 'react'
import { footerData } from './FooterData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="py-4 py-lg-5 text-center">
            <p>&copy; {currentYear} {footerData.name}, {footerData.copyWriteText}</p>
        </div>
    )
}

export default Footer