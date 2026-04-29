import React from 'react'

export function TextLoader() {
  return (
    <p  class="placeholder-glow">
        <span className="placeholder w-100"></span>
        <span className="placeholder col-6"></span>
    </p>
  )
}


// ===================================
export function IconeLoder() {
  return (
    <div aria-hidden="true" className="d-flex gap-2 placeholder-glow" >
    <p class=" button-circle button-circle-sm">
        <i className="placeholder w-100 h-100"></i>
    </p>
    <p class=" button-circle button-circle-sm">
        <i className="placeholder w-100 h-100"></i>
    </p>
    <p  class=" button-circle button-circle-sm">
        <i className="placeholder w-100 h-100"></i>
    </p>
    </div>
  )
}
// ===================================

export  function ImageLoader() {
  return (
    <div aria-hidden="true" className="placeholder-glow">
        <div className="placeholder rounded-circle" 
        style={{ height: '300px', width:'300px' }}></div>
    </div>
  )
}
// ===================================

export  function NumpLoader() {
  return (
    <div aria-hidden="true" className="placeholder-glow">
        <p className="placeholder w-25"></p>
    </div>
  )
}
// ===================================

export  function TitleLoader() {
  return (
    <div aria-hidden="true" className="placeholder-glow">
        <p className="placeholder w-75"></p>
    </div>
  )
}
// ===================================

export  function ServicesLoader() {
  return (
    <div aria-hidden="true" className="placeholder-glow d-flex flex-column gap-4">
        <div className="col-12">
        <div className="service-box">
            <div className="service-order">
                <p className="placeholder w-25"></p>
            </div>
            <div className="service-title d-flex align-items-center gap-3">
                <p class=" button-circle button-circle-sm">
                    <i className="placeholder w-100 h-100"></i>
                </p>
                <p className="placeholder w-50"></p>
            </div>
            <div className="service-text row gap-2 mt-3  ">
                <span className="placeholder w-100"></span>
                <span className="placeholder col-6"></span>
            </div>
        </div>
    </div>
    </div>
  )
}
