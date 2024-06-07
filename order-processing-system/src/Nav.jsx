import React from 'react'
import { Navbar, Container,} from 'react-bootstrap';
// import logo from './logo.jpg'
export default function Nav() {
  return (
    <div>
       <Navbar className="bg-dark">
                <div className="d-flex justify-content-center mx-auto" >
                    <h2 style={{ color: 'white' }}>Admin Mangement System</h2>
                </div>
            </Navbar>

    </div>
  )
}
