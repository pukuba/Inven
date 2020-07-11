import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div>
            <h1>Homepage!</h1>
            <Link to="/login"><p>Login</p></Link>
            <Link to="/signup"><p>signup</p></Link>
        </div>
    );
}

export default HomePage;