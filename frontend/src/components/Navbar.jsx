import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const Navbar = () => {
  const { user, signOut } = useAuth();
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {!!user && <button onClick={signOut} type="button" class="btn btn-primary">Выйти</button>}
      </div>
    </nav>
  );
}

export default Navbar;
