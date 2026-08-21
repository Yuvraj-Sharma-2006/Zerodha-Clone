function Team() {
   return (
      <div className="container-fluid">
       <div className="row mt-2 mb-3 text-center">
         <h1 className="fs-4">People</h1>
       </div>

       <div className="row mt-4 aboutContent">
        <div className="offset-xl-2 col-xl-4 offset-lg-1 col-lg-5 col-md-6 col-12 mt-5 mb-5 text-center">
          <img src="media/images/nithinKamath.jpg" alt="nithin Kamath photo" class="image"/>
          <h5 className="mt-4 name">Nithin Kamath</h5>
          <p className="mt-3 text-muted post">Founder, CEO</p>
        </div>

        <div className="col-xl-4 col-lg-5 col-md-6 col-12 mt-5 mb-5">
         <p>
           Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during
           his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian
           broking industry.
         </p>

         <p>
           He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market 
           Data Advisory Committee (MDAC).
         </p>

         <p>
           Playing basketball is his zen.
         </p>

         <p>
           Connect on <a className ="link" href="#">Homepage /</a> <a className ="link" href="#">TradingQnA /</a> <a className ="link" href="#">Twitter</a>
         </p>
        </div>
       </div>
     </div>
   );
}

export default Team;