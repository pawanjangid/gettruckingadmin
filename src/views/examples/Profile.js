import React,{useEffect,useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";


import axios from "axios";


const Profile = (props) => {

  const [driver,setDriver] = useState();
  const [count,setCount] = useState(0);

  useEffect(() => {
    //console.log(props.match.params.user_id);
    var data = {
      driver_id : props.match.params.user_id
    }
    axios.post("https://gettruckingbackend.herokuapp.com/admin/driverById",data)
    .then((response)=>{
      if(response.status===200){
        console.log(response)
        setDriver(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count,props.match.params.user_id])

const handleStatusChange = () => {
  //console.log(props.match.params.user_id);
  var data = {
    driver_id : props.match.params.user_id
  }
  axios.post("https://gettruckingbackend.herokuapp.com/admin/driverStatus",data)
    .then((response)=>{
      console.log(response);
      if(response.status===200){
        setCount(count+1);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}




  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "300px",
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/driver.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="display-2 text-white">
                {driver ? driver.fullName : "Unavailable"}
              </h1>
              
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>

        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              
              <CardBody style={{marginTop:130}} className="pt-0 pt-md-4">
                
                <div className="text-center">
                  <h3>
                  {driver ? driver.fullName : "Unavailable"}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Identification : {driver ? driver.Identification : "Unavailable"}
                  </div>
                  <div className="mt-2 mb-2">
                    <a href={driver ? "tel:"+driver.phone : "9876543210"}>
                    <Button
                        color="success"
                      >
                        Call Driver Now
                      </Button>
                    </a>
                  </div>
                  <div>
                    <a href={driver ? "mailto:"+driver.email : null}>
                    <Button
                        color="default"
                      >
                        Mail Driver Now
                      </Button>
                    </a>
                  </div>


                  <div className="mt-6">
                    <a href={driver ? "tel:"+driver.emergency_contact_number : null}>
                    <Button
                        color="danger"
                      >
                        Emergency : {driver ? driver.emergency_contact_person : "Unavailable"}
                      </Button>
                    </a>
                    
                    
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Vehicle And Licence Detail</h3>
                  </Col>
                 
                </Row>
              </CardHeader>
              <CardBody>
                <Row style={{padding:5}}>
                  <Col xs="5">
                    Licence Expiry
                  </Col>
                  <Col xs="7">
                    {driver ? driver.driving_license_expiry:null}
                  </Col>
                </Row>
                <Row style={{padding:5}}>
                  <Col xs="5">
                   Vehicle Modal
                  </Col>
                  <Col xs="7">
                    {driver ? driver.vehicle_modal:null}
                  </Col>
                </Row>
                <Row style={{padding:5}}>
                  <Col xs="5">
                  License Plate Number
                  </Col>
                  <Col xs="7">
                    {driver ? driver.License_plate_number:null}
                  </Col>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.Driving_license :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.Vehicle_License :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.vehicle_body :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

              </CardBody>
            </Card>
            <Card className="bg-secondary shadow mt-4">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Other Documents</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
               

              <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.ID_card_front :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.ID_card_back :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={driver ? 'https://gettruckingbackend.herokuapp.com'+driver.insurance :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>


                <Row style={{padding:5}}>
                  
                  <Card xs="12" className="text-center"  style={{padding:10}}>
                  {driver && <div >
                    {driver.document_status==='0' &&
                    <Button
                      color="success"
                      onClick={() => { if (window.confirm('Are you to verify these detail of driver')); handleStatusChange() } }
                    >
                      Verify Documents
                    </Button>}
                    <p style={{backgroundColor:"lightgreen",padding:10}}>
                      {!(driver.document_status==='0') ? "This Profile is verified" : null}
                    </p>
                    
                    </div>}
                  </Card>
                </Row>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
