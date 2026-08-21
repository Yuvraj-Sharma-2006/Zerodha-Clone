function Hero() {
   return (
     <div className="container-fluid mb-5"> 
      <div className="row m-5 border-bottom">
        <div className="text-center mt-5 mb-5">
         <h1 className="fs-3">Zerodha Products</h1>
         <p className="text-muted mt-3 fs-5" style={{fontWeight:"500"}}>Sleek, modern, and intuitive trading platforms</p>
         <p className="mt-4 mb-5" style={{fontSize:"16px",fontWeight:"400"}}>Check out our<a href="#" className="link link-hover mx-2">investment offerings<i class="fa-solid fa-arrow-right"></i></a></p>
        </div>
      </div>
    </div>
   );
}

export default Hero;