import "./Home.css";
import $ from 'jquery';
import Swal from 'sweetalert2'
import { Modal, Button } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import withReactContent from 'sweetalert2-react-content';
import BookingService from "../../services/BookingService.js";
import PropertyService from "../../services/PropertyService.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faHouse } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  // Variables setup
  const swal = withReactContent(Swal)
  const [properties, initProperties] = useState([]);
  const [show, setShow] = useState(false);
  const [property_id, setPropertyToEdit] = useState(null);

  // Get the List of Properties
  const fetchData = async () => {
    $("#bookings").removeClass('active');
    $("#home").addClass('active');
    return await PropertyService.list();
  }

  // Function to send form to back
  const sendForm = async (body) => {
    return await BookingService.create(body);
  }

  // Function to close modal
  const handleClose = () => setShow(false);
  // Function to open modal and set up the id to save
  async function openDetails(property_id) {
    $('#error').addClass('d-none');
    setPropertyToEdit(property_id)
    setShow(true)
  }    

  // Function for the form
  const handleSubmit = async (e) => {
      //Prevent page reload
      e.preventDefault();

      let booked_users = $("#booked_users").val();
      let description = $("#description").val();
      
      await sendForm(
        {
          booked_users: booked_users, 
          description: description, 
          user_id: localStorage.getItem("user_id"),
          property_id: property_id,
          status_id: 1
        }).then(async (res) => {
          if(res) {
              swal.fire(
                'Successfully Created',
                'Sucessfully Booked Property',
                'success'
              )

              handleClose();
          } else {
              $('#error').removeClass('d-none');
          }
      });
  };

  // Init Function
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

  // Render
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
                  <button className='btn btn-primary w-100 align-bottom' onClick={() => openDetails(item.id)}><FontAwesomeIcon icon={faDollarSign} /> Book</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><FontAwesomeIcon icon={faHouse} /> Book Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group mb-4'>
              <label><b>Booked Users</b></label>
              <input type="number" id="booked_users" name="booked_users" className='form-control' defaultValue={1} min={1}/>
            </div>

            <div className='form-group mb-4'>
              <label><b>Description</b></label>
              <textarea type="text" id="description" name="description" className='form-control' placeholder='Please with shower'/>
            </div>

            <div className="alert alert-danger alert-dismissible fade show d-none" id="error" role="alert">
                Error: An error ocurred
            </div>

            <Button variant="primary w-100" type="submit">
              <FontAwesomeIcon icon={faDollarSign} /> Book Property
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