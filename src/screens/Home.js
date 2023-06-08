import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import Card from '../components/Card';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const options = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  autoplay: false,
  
  navText: ["Prev", "Next"],
  smartSpeed: 2000,
  responsive: {
      0: {
          items: 1,
          margin: 10,
      },
      400: {
          items: 1,
          margin: 30,
      },
      600: {
          items: 2,
          margin: 30,
      },
      700: {
          items: 3,
          margin: 30,
      },
      1000: {
          items: 4,
          margin: 30,
      }
  },
};

const Home = () => {
    const [search,setSearch]=useState('')
    const  [foodCat,setFoodCat]=useState([])
    const  [foodItem,setFoodItem]=useState([])
    const loadData=async()=>{
        let response=await fetch("http://localhost:5000/api/foodData",{
            method:"POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json;charset=UTF-8",
            },
        });
        response=await response.json()
        // console.log(response[0],response[1])
        setFoodItem(response[0])
        setFoodCat(response[1])


    }

    useEffect(()=>{
        loadData()


    },[])








    return (
    <>
    <div>
        <Navbar />
    </div>
    <div >
    <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
  <div className="carousel-inner" id="carousel" >
  <div className="carousel-caption  d-flex flex-column justify-content-center h-100 ">
      <div className="d-flex" style={{zIndex:"10"}}>
    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}
    onChange={(e)=>{
        setSearch(e.target.value)
    }}
    />
    {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
  </div>
      </div>
 
    <div className="carousel-item active">
    
    
      <img src="https://source.unsplash.com/random/100×100/?burger" className="d-block w-100" alt="..."
      
      />
       
    
      
    
    </div>
    <div className="carousel-item">
        
        
      <img src="https://source.unsplash.com/random/100×100/?pizza" className="d-block w-100" alt="..."/>
     
    
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/100×100/?sandwitch" className="d-block w-100" alt="..."/>
     
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
    </div>
  
    
    <div className="container bg-dark">
  {foodCat !== [] ? (
    foodCat.map((data) => {
      const filteredItems = foodItem.filter(
        (item) =>
          item.CategoryName === data.CategoryName &&
          item.name.toLowerCase().includes(search.toLowerCase())
      );

      return (
        <div key={data._id}>
          <div className="fs-3 m-3">
            <h3 className="text-white text-center">
              {data.CategoryName.toUpperCase()}
            </h3>
          </div>
          <hr />
          {filteredItems.length > 0 ? (
            <OwlCarousel className="owl-theme" loop margin={10} nav {...options}>
              {filteredItems.map((filterItems) => (
                <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                  <Card foodItem={filterItems} options={filterItems.options[0]} />
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <p className="text-white">No such data</p>
          )}
        </div>
      );
    })
  ) : (
    <div>No data</div>
  )}
</div>
   
    <div>
    <Footer />

    </div>
    </>
    )
}




export default Home;