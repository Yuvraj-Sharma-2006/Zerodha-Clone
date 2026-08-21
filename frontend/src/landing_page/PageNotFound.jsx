import {Link} from 'react-router-dom';
function PageNotFound() {
  return (
    <div className="container mt-3 p-5 mb-3">
      <div className="row mx-5">
        <div className="col-12 mx-5">
          <h1 className="fs-4">404</h1>
          <h2 className="fs-2 text-muted">Kiaan couldn’t find that page</h2>
          <p className="text-muted mt-4 fs-5">
            We couldn’t find the page you were looking for. <br/>
            Visit <Link to="/" className="link">Zerodha’s home page</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
