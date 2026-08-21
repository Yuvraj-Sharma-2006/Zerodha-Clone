function Pricing({imgUrl,heading,text}){
  return (
  <div className="pricing">
    <img src={imgUrl} />
    <h1 className="fs-3 mt-4 mb-4">{heading}</h1>
    <p className="text-muted">{text}</p>
  </div>)
}

export default Pricing;