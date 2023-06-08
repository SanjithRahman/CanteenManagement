import React from 'react';


const Caurousel = () => {
    return <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel" >
  <div className="carousel-caption  d-flex flex-column justify-content-center h-100 ">
      <form className="d-flex" style={{zIndex:"10"}}>
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form>
      </div>
 
    <div className="carousel-item active">
    
    
      <img src="../img/img1" className="d-block w-100" alt="..."
      
      />
       
    
      
    
    </div>
    <div className="carousel-item">
        
        
      <img src="../img/img2" className="d-block w-100" alt="..."/>
     
    
    </div>
    <div className="carousel-item">
      <img src="../img/img3" className="d-block w-100" alt="..."/>
     
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>;
}

export default Caurousel;