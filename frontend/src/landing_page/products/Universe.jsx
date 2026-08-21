function Universe() {
   return (
      <div className="universe text-center container-fluid mb-5"> 
      <div className="row">
        <div className="text-center mt-5 mb-5">
         <h1 className="fs-3 mt-4">The Zerodha Universe</h1>
         <p className="text-muted mt-4 fs-5" style={{fontWeight:"400"}}>Extend your trading and investment experience even further with our partner platforms</p>
        </div>

         <div className="col-md-4 mt-3 col-sm-6">
           <img src="media/images/zerodhaFundhouse.png" />
           <p class="text-muted" >
              Our asset management venture <br/>
              that is creating simple and transparent index <br/>
              funds to help you save for your goals.</p>
         </div>

         <div className="col-md-4 mt-3 col-sm-6">
           <img src="media/images/sensibullLogo.svg" />
           <p class="text-muted">
              Options trading platform that lets you <br/>
              create strategies, analyze positions, and examine <br/> 
              data points like open interest, FII/DII, and more.</p>
         </div>

         <div className="col-md-4 col-sm-6">
           <img src="media/images/tijori.svg" />
           <p class="text-muted">
              Investment research platform <br/>
              that offers detailed insights on stocks, <br/>
              sectors, supply chains, and more.</p>
         </div>
        
         <div className="col-md-4 mt-5 col-sm-6">
           <img src="media/images/streakLogo.png" />
           <p class="text-muted">
              Systematic trading platform <br/>
              that allows you to create and backtest <br/>
              strategies without coding.</p>
         </div>

         <div className="col-md-4 mt-5 col-sm-6">
           <img src="media/images/smallcaseLogo.png" />
           <p class="text-muted">
              Thematic investing platform <br/>
              that helps you invest in diversified <br/>
              baskets of stocks on ETFs.</p>
         </div>

         <div className="col-md-4 mt-5 col-sm-6">
           <img src="media/images/dittoLogo.png" />
           <p class="text-muted">
              Personalized advice on life <br/>
              and health insurance. No spam <br/>
              and no mis-selling.</p>
         </div>
        
         <div className="col text-center">
         <button className="button border border-0 m-5 text-white  text-center border-none">Sign up for free</button>
         </div>
      </div>
    </div>
   );
}

export default Universe;