function RightSection({imageUrl,heading,paragraph,LearnMoreLink,kiteConnectLink}) {
  return (
     <div className="container-fluid my-5">
        <div className="row my-5">
          <div className="content-section col-12 offset-0 content-section-right offset-xl-1 col-xl-4 col-lg-4 col-md-4 my-5">
            <h1 className="fs-3 mt-5 mb-4">{heading}</h1>  
            <p>{paragraph}</p>
             
            <div className="mb-3 links">
              {kiteConnectLink != "" && <a href={kiteConnectLink} className="link link-hover mx-2">kite Connect <i class="fa-solid fa-arrow-right"></i></a>}
              {LearnMoreLink != "" && <a href={LearnMoreLink} className="link link-hover mx-2">Learn more <i class="fa-solid fa-arrow-right"></i></a>}
            </div>

          </div> 

          <div className="offset-lg-0  col-12 offset-0  col-lg-7 offset-md-1 col-md-6 text-center mt-5">
            <img src={imageUrl}  className="section-img mb-5"/>
          </div>
        </div>  
      </div>
  );
}

export default RightSection;