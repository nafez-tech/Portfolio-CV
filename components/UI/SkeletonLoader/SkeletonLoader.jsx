import React from 'react'

export function HomeLoader() {
  return (
    <div aria-hidden="true"  class="placeholder-glow row">
      <div className="col-12 col-lg-4 order-lg-2 text-center">
        <div className="placeholder rounded-circle hero-avatar" 
        style={{ height: '300px', width:'300px', placeContent:"center"}}>
          <h4 className="text-white"> Loading...</h4>
          </div>
          <div className="row mt-5">
          <p className="placeholder col-6 button "/>
          <p className="placeholder col-6 button button-white "/>
          </div>
        </div>

        <div className="col-12 col-lg-4 order-lg-1">
          <div className="row g-4 g-lg-5">
              <div className="col-12 col-md-4 col-lg-12">
                  <h6 className="sm-heading placeholder w-25"/>
                  <p className="placeholder col-12"/>
                  <p className="placeholder col-10"/>
                  <p className="placeholder col-8"/>
                  <p className="placeholder col-6"/>
                  <p className="placeholder col-4"/>
              </div>
              <div className="col-6 col-md-4 col-lg-12">
                  <h6 className="sm-heading placeholder w-25"/>
                  <ul className="list-inline-dot">
                      <li className="placeholder col-12"/>
                      <li className="placeholder col-8"/>
                      <li className="placeholder col-9"/>
                      <li className="placeholder col-7"/>
                      <li className="placeholder col-6"/>
                  </ul>
              </div>
              <div className="col-6 col-md-4 col-lg-12">
                  <h6 className="sm-heading placeholder w-25"/>
                  <ul className="list-inline row gap-2 mt-3">
                      <li class="placeholder button-circle button-circle-sm" />
                      <li class="placeholder button-circle button-circle-sm" />
                      <li class="placeholder button-circle button-circle-sm" />
                  </ul>
              </div>
          </div>
      </div>

      <div className="col-12 col-md-12 col-lg-4 order-lg-3">
        <div className="row g-4 g-lg-5">
            <div className="col-12 col-md-4 col-lg-12 d-flex flex-column align-items-end">
                <h6 className="sm-heading placeholder col-6 d-block "/>
                <h1 className="mb-0 placeholder col-3"/>
            </div>
            <div className="col-12 col-md-4 col-lg-12 d-flex flex-column align-items-end">
                <h6 className="sm-heading placeholder col-6 d-block "/>
                <h1 className="mb-0 placeholder col-3"/>
            </div>
            <div className="col-12 col-md-4 col-lg-12 d-flex flex-column align-items-end">
                <h6 className="sm-heading placeholder col-6 d-block "/>
                <h1 className="mb-0 placeholder col-3"/>
            </div>
        </div>
      </div>

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
                <p className="placeholder w-25"/>
            </div>
            <div className="service-title d-flex align-items-center gap-3">
                <p class=" button-circle button-circle-sm">
                    <i className="placeholder w-100 h-100"/>
                </p>
                <p className="placeholder w-50"/>
            </div>
            <div className="service-text row gap-2 mt-3  ">
                <span className="placeholder w-100"/>
                <span className="placeholder col-6"/>
            </div>
        </div>
    </div>
    </div>
  )
}


// ===================================

export  function PostLoader() {
  const boxLoopCount = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
];
  return (
    <div aria-hidden="true" className="placeholder-glow row gap-3 mt-5">
        <div className="flex-col">
          <h1 className="placeholder w-50"/>
        <div className="placeholder w-75"/>
        <div className="placeholder w-50"/>
        <div className="placeholder w-50"/>
        <div className="placeholder w-25"/>
        </div>

        <div className="row g-4 mt-5">
          {boxLoopCount?.map((box)=>(
          <div key={box.id} className="col-12 col-md-6 col-lg-3">
                <div className="fancy-box">
                    <h6 className="sm-heading mb-1 placeholder w-25"/>
                    <ul className="list-inline-dot">
                        <li className="placeholder w-75"/>
                        <li className="placeholder w-75"/>
                    </ul>
                </div>
            </div>
          ))}
        </div>

        <div className="row p-3 mt-5 section-sm bg-dark border-radius-1">
          <div className="flex-col">
            <h1 className="placeholder w-50"/>
            <div className="placeholder w-75"/>
            <div className="placeholder w-75"/>
            <div className="placeholder w-75"/>
            <div className="placeholder w-75"/>
            <div className="placeholder w-50"/>
            <div className="placeholder w-50"/>
            <div className="placeholder w-25"/>
          </div>
          <div className="mt-3 placeholder w-100 border-radius-1"
          style={{height:"300px"}}
          />
        </div>
    </div>
  )
}