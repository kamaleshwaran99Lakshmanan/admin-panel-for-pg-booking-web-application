import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Header() {
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (menuRef.current) {
      if (show) {
        menuRef.current.style.height = `${menuRef.current.scrollHeight}px`;
      } else {
        menuRef.current.style.height = '0';
      }
    }
  }, [show]);

  return (
    <>
      <div className="header p-3 d-flex">
        <h1><b>Administration</b></h1>
        <div className="ms-auto me-2 rounded-2">
          <Dropdown 
            onMouseEnter={() => setShow(true)} 
            show={show}
            className='drop rounded-2'
          >
            <Dropdown.Toggle 
              id="dropdown-basic" 
              className='drop'
            >
              Demo user
            </Dropdown.Toggle>

            <Dropdown.Menu 
              ref={menuRef} 
              className={`menu ${show ? 'open' : ''} `}
              onMouseLeave={() => setShow(false)} 
            >
              <div className="left"><h5 className='p-2 d-flex flex-row '><span className='d-flex'>Admin User <div className='circle ms-2 rounded-5 mt-2'></div></span></h5><hr /></div>
              <Dropdown.Item >
                Profile
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="btn bg-transparent mt-1"><Link to="/Login" className='text-secondary'>Logout</Link></div>
      </div>
    </>
  );
}
