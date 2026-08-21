import Pricing from './Pricing';
function Hero() {
  return (
    <div className="container-fluid mt-5 mb-5 text-center">
      <div className="row p-5 text-center">
         <h1 className="fs-3">Charges</h1>
         <p className="fs-5 mt-2 text-muted pricing-hero-text">List of all charges and taxes</p>
      </div>

      <div className="row pricing-section">
        <div className="col-md-4">
          <Pricing imgUrl="media/images/pricing0.svg" 
                   heading="Free equity delivery"
                   text="All equity delivery investments (NSE, BSE), are absolutely 
                         free — ₹ 0 brokerage."
          />
        </div>

         <div className="col-md-4">
          <Pricing imgUrl="media/images/intradayTrades.svg" 
                   heading="Intraday and F&O trades"
                   text="Flat ₹ 20 or 0.03% (whichever is lower) per executed order 
                         on intraday trades across equity, currency, and commodity 
                         trades. Flat ₹20 on all option trades."
          />
        </div>

         <div className="col-md-4">
          <Pricing imgUrl="media/images/pricing0.svg" 
                   heading="Free direct MF"
                   text="All direct mutual fund investments are absolutely free — 
                         ₹ 0 commissions & DP charges."
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;