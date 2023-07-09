import React, { useState, useEffect } from 'react';
import BookingService from "../../services/BookingService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan  } from '@fortawesome/free-solid-svg-icons';

export default function UserBookings() {
  const [bookings, initBookings] = useState([]);

  const fetchData = async () => {
    return await BookingService.list();
  }

  async function deleteBook(booking_id) {
    if(await BookingService.deleteOne(booking_id)) {
      return true;
    }

    await getBookings()
  }

  useEffect(() => {
    getBookings()
  }, [])

  async function getBookings() {
    await fetchData()
      .then((res) => {
        console.log(res);
        if(res) {
          initBookings(res.data)
        }
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="mb-3 mt-4">Self Bookings List</h1>
        {bookings.map((item, idx) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-3" key={idx}>
              <div className="card">
                <img className="card-img-top" height={125} src={item.property.img} alt="Card image cap"/>
                <div className='card-body'>
                  <h5>{item.property.name}</h5>
                  <span className='label' style={{ backgroundColor: item.status.color }}>{item.status.name}</span>
                  <p className='text-muted'>{item.description}</p>
                </div>

                <div className='card-footer'>
                  <button className='btn btn-primary w-25 d-inline-block me-2'><FontAwesomeIcon icon={faPen} /></button>
                  <button className='btn btn-danger w-25 d-inline-block' onClick={() => deleteBook(item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}