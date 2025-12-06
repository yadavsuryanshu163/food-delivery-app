import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate=useNavigate();
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>order your favourite food here</h2>
            <p>"Craving something delicious? Get your favorite meals delivered fresh and fast right to your doorstep. Discover a wide range of restaurants, explore curated cuisines, and enjoy seamless ordering with real-time tracking. With just a few taps, great food is always within reach—anytime, anywhere."</p>
            <button onClick={() => navigate('/menu')}>View Menu</button>
        </div>

    </div>
  )
}

export default Header