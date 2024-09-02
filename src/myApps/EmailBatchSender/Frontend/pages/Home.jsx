import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Email Batch Sender</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">All</h5>
                            <Link to="/batch/All" className="btn btn-primary">All</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Developers</h5>
                            <Link to="/batch/Developers" className="btn btn-primary">Developers</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <h5 className="card-title">Testers</h5>
                            <Link to="/batch/Testers" className="btn btn-primary">Testers</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;



