function Hero() {
  return (
    <div className="container-fluid support-header mb-5">
      <div className="row">
        <div className="support-header-content mt-5 mb-4">
          <div className="d-flex mb-4">
            <h1 className="fs-1">Support Portal</h1>
            <button className="ticket border border-0 text-white  border-none">
              My ticket
            </button>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">
              <i class="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              class="form-control p-3"
              placeholder="Eg : How do I open my account,How do i activate F&O..."
              aria-label="search"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
