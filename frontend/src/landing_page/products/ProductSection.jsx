import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import "./ProductSection.css";
function ProductSection() {
  return (
    <>
      <Hero />
      <LeftSection
        imageUrl="media/images/kite.png"
        heading="Kite"
        paragraph="Our ultra-fast flagship trading platform with streaming market data, 
                   advanced charts, an elegant UI, and more. Enjoy the Kite experience 
                   seamlessly on your Android and iOS devices."
        tryDemoLink="#"
        LearnMoreLink="#"
        coinLink=""
        playStoreLink=""
        appStoreLink=""
      />

      <RightSection
        imageUrl="media/images/console.png"
        heading="Console"
        paragraph="The central dashboard for your Zerodha account. Gain insights into 
                   your trades and investments with in-depth reports and visualisations."
        LearnMoreLink="#"
        kiteConnectLink=""
      />

      <LeftSection
        imageUrl="media/images/coin.png"
        heading="Coin"
        paragraph="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy 
                   the investment experience on your Android and iOS devices."
        tryDemoLink=""
        LearnMoreLink=""
        coinLink="#"
        playStoreLink=""
        appStoreLink=""
      /> 

      <RightSection
        imageUrl="media/images/kiteconnect.png"
        heading="Kite Connect API"
        paragraph="Build powerful trading platforms and experiences with our super 
                   simple HTTP/JSON APIs. If you are a startup, build your investment 
                   app and showcase it to our clientbase."
        LearnMoreLink=""
        kiteConnectLink="#"
      />

      <LeftSection
        className="small"
        imageUrl="media/images/varsity.png"
        heading="Varsity mobile"
        paragraph="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. 
                   Content is broken down into bite-size cards to help you learn on the go."
        tryDemoLink=""
        LearnMoreLink=""
        coinLink=""
        playStoreLink=""
        appStoreLink=""
      />

      <p className="fs-5 text-center">
        Want to know more about our technology stack? Check out the <a href="#" className="link link-hover fs-5 mx-2">Zerodha.tech</a> blog.
      </p>
      <Universe />
    </>
  );
}

export default ProductSection;
