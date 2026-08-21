function Awards(){
    return (
       <div className="container-fluid mb-5">
         <div className="row p-3">
            <div className="offset-xl-1 col-xl-5 col-lg-6 mt-5 text-center">
              <img src="media/images/largestBroker.svg" alt="largest broker" className="img-fluid" />
            </div>

            <div className="col-xl-5 col-lg-6 mt-5 p-3 fs-5">
               <h2>Largest stock broker in india</h2>
               <p>2+ million Broker clients contribute to over 15% of all retail order volumes
                  in india daily by trading and investing in.
               </p>
                
             <div className="row">
              <div className="col-sm-6 mt-4">
               <ul>
                  <li> <p>Futures and Options</p> </li>
                  <li> <p>Commodity derivatives</p> </li>
                  <li> <p>Currency derivatives</p> </li>
               </ul>
              </div>

              <div className="col-sm-6 mt-4">
               <ul>
                  <li> <p>Stocks & IPOs</p> </li>
                  <li> <p>Direct mutual funds</p> </li>
                  <li> <p>Bonds and Gold</p> </li>
               </ul>
              </div>
            </div>

            <img src="media/images/pressLogos.png" alt="largest broker" className="img-fluid mt-3 mb-5" style={{width:"90%"}}/>
          </div>
         </div>
       </div>      
    );
}

export default Awards;