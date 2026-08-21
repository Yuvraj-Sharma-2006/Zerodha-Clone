function LeftSection({imageUrl,heading,paragraph,tryDemoLink,LearnMoreLink,coinLink,playStoreLink,appStoreLink}) {
   return (
      <div className="container-fluid my-5">
        <div className="row mt-3 mb-5">
          <div className="col-md-7 col-12 text-center my-5">
            <img src={imageUrl}  className="section-img"/>
          </div>

          <div className="content-section col-12 offset-0 offset-xl-1 col-xl-3  offset-md-1 col-md-4 my-5">
            <h1 className="fs-3 mt-5 mb-4">{heading}</h1>  
            <p>{paragraph}</p>
             
            <div className="mb-3">
              {tryDemoLink != "" ? <a href={tryDemoLink} className="link link-hover mx-2">Try demo <i class="fa-solid fa-arrow-right"></i></a> : null}
              {LearnMoreLink != "" ? <a href={LearnMoreLink} className="link link-hover mx-2">Learn more <i class="fa-solid fa-arrow-right"></i></a> : null}
              {coinLink != "" ? <a href={coinLink} className="link link-hover mx-2"> Coin <i class="fa-solid fa-arrow-right"></i></a> : null}
            </div>

            <div className="mt-4 mb-5">
               <a href={playStoreLink} className="link link-hover mx-2"><img src="media/images/googlePlayBadge.svg" alt="playstore image" /></a>
               <a href={appStoreLink} className="link link-hover mx-2"><img src="media/images/appstoreBadge.svg" alt="appstore image" /></a>
            </div>
          </div> 
        </div>  
      </div>
   );
}

export default LeftSection;