import React, { useState, useEffect } from 'react';
import PropertyService from "../../services/PropertyService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign  } from '@fortawesome/free-solid-svg-icons';
import "./Home.css";

export default function Home() {
  const [properties, initProperties] = useState([]);

  const fetchData = async () => {
    return await PropertyService.list();
  }

  useEffect(() => {
    fetchData()
      .then((res) => {
        if(res) {
          initProperties(res.data)
        }
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  return (
    <div className="container">
      <div className="row">
        <h1 className="mb-3 mt-4">Properties List</h1>
        {properties.map((item, idx) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={idx}>
              <div className="card">
                <img className="card-img-top" height={125} src={item.img} alt="Card image cap"/>
                <div className='card-body'>
                  <h5>{item.name}</h5>
                  <p className='text-muted'>{item.description}</p>
                  <p>Price: <span className='h3'>{item.price} €</span></p>
                </div>

                <div className='card-footer'>
                  <button className='btn btn-primary w-100 align-bottom'><FontAwesomeIcon icon={faDollarSign} /> Book</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}