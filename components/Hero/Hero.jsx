import React from 'react'
import { heroData } from './HeroData'

const Hero = () => {
    return (
        <div id="about" className="hero-section">
            <div className="container text-center">
                <div className="row">
                    <div className="col-12">
                        <h1 className="hero-heading display-1 fw-bold mb-0 stroke-text">{heroData.mainData.name}</h1>
                    </div>
                </div> {/* end row */}
            </div> {/* end container */}
        </div>
    )
}

export default Hero