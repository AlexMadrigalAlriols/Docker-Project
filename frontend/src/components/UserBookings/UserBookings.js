import $ from 'jquery';
import Swal from 'sweetalert2';
import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import BookingService from "../../services/BookingService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan  } from '@fortawesome/free-solid-svg-icons';

export default function UserBookings() {
  // Variables setup
  const [bookings, initBookings] = useState([]);
  const [show, setShow] = useState(false);
  const [booking_id, setBookingToEdit] = useState(null);
  const [booked_users, setBookedUsers] = useState(1);
  const [description, setDescription] = useState('');
  const swal = withReactContent(Swal)

  // Get Booking List
  const fetchData = async () => {
    $("#home").removeClass('active');
    $("#bookings").addClass('active');
    return await BookingService.list();
  }

  // Function to delete a book
  async function deleteBook(booking_id) {
    if(await BookingService.deleteOne(booking_id)) {
      swal.fire(
        'Successfully Canceled',
        'Booking Successfully Canceled',
        'success'
      );
      await getBookings();
    }

    return false;
  }

  // Function to close modal
  const handleClose = () => setShow(false);
  // Function to open edit modal with data
  async function configForm(booking_id, booked_users = 1, description = "") {
    $('#error').addClass('d-none');

    setBookedUsers(booked_users);
    setDescription(description);
    setBookingToEdit(booking_id);
    setShow(true);
  }

  // Function that sends form to backend
  const sendForm = async (booking_id, body) => {
    return await BookingService.edit(booking_id, body);
  }

  // Function to submit form
  const handleSubmit = async (e) => {
      //Prevent page reload
      e.preventDefault();

      let booked_users = $("#booked_users").val();
      let description = $("#description").val();
      
      await sendForm(
        booking_id,
        {
          booked_users: booked_users,
          description: description
        }).then(async (res) => {
          if(res) {
              swal.fire(
                'Successfully Updated',
                'Sucessfully Updated Booking',
                'success'
              );
              
              getBookings();
              handleClose();
          } else {
              $('#error').removeClass('d-none');
          }
      });
  };

  // Function to referesh bookings list
  async function getBookings() {
    await fetchData()
      .then((res) => {
        if(res) {
          initBookings(res.data)
        }
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  // Init Function
  useEffect(() => {
    getBookings()
  }, [])

  // render
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
                  <h6>Booked Users: {item.booked_users}</h6>
                  <span className='label' style={{ backgroundColor: item.status.color }}>{item.status.name}</span>
                  <p className='text-muted'>{item.description}</p>
                </div>

                <div className='card-footer'>
                  <button className='btn btn-primary w-25 d-inline-block me-2' onClick={() => configForm(item.id, item.booked_users, item.description)}><FontAwesomeIcon icon={faPen} /></button>
                  <button className='btn btn-danger w-25 d-inline-block' onClick={() => deleteBook(item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-4'>
              <label><b>Edit Book</b></label>
              <input type="number" id="booked_users" name="booked_users" className='form-control' defaultValue={booked_users}/>
            </div>

            <div className='form-group mb-4'>
              <label><b>Description</b></label>
              <textarea type="text" id="description" name="description" className='form-control' placeholder='Please with shower' defaultValue={description}/>
            </div>

            <div className="alert alert-danger alert-dismissible fade show d-none" id="error" role="alert">
                Error: An error ocurred
            </div>

            <Button variant="primary w-100" type="submit">
              Update Booking
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger w-100" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}