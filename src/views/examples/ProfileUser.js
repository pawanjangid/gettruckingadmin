import React,{useEffect,useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";


import axios from "axios";


const Profile = (props) => {

  const [user,setUser] = useState();

  useEffect(() => {
    //console.log(props.match.params.user_id);
    var data = {
      user_id : props.match.params.user_id
    }
    axios.post("https://gettruckingbackend.herokuapp.com/admin/userById",data)
    .then((response)=>{
      if(response.status===200){
        console.log(response)
        setUser(response.data.data[0]);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[props.match.params.user_id])



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
                {user ? user.fullName : "Unavailable"}
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
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              
              <CardBody style={{marginTop:130}} className="pt-0 pt-md-4">
                
                <div className="text-center">
                  <h3>
                  {user ? user.firstName + ' ' + user.lastName : 'unavailbale'} 
                    <span className="font-weight-light"></span>
                  </h3>
                 
                  <div className="mt-2 mb-2">
                    <a href={user ? "tel:"+user.phone : "9876543210"}>
                    <Button
                        color="success"
                      >
                        Call User Now
                      </Button>
                    </a>
                  </div>
                  <div>
                    <a href={user ? "mailto:"+user.email : null}>
                    <Button
                        color="default"
                      >
                        Mail User Now
                      </Button>
                    </a>
                  </div>

                  <div className="mt-4 mb-2">
                    <h2>
                    Wallet Balance : {user ? user.wallet_balance : null}
                    </h2>
                    
                  </div>


              
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col className="order-xl-1" xl="8">
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
                    {user ? user.driving_license_expiry:null}
                  </Col>
                </Row>
                <Row style={{padding:5}}>
                  <Col xs="5">
                   Vehicle Modal
                  </Col>
                  <Col xs="7">
                    {user ? user.vehicle_modal:null}
                  </Col>
                </Row>
                <Row style={{padding:5}}>
                  <Col xs="5">
                  License Plate Number
                  </Col>
                  <Col xs="7">
                    {user ? user.License_plate_number:null}
                  </Col>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.Driving_license :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.Vehicle_License :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.vehicle_body :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
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
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.ID_card_front :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.ID_card_back :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>

                <Row style={{padding:5}}>
                  
                  <Card xs="12">
                  <img
                        alt="..."
                        className="rounded-circle"
                        src={user ? 'https://gettruckingbackend.herokuapp.com'+user.insurance :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIdOWn7eZASWXAYDIRpb9DnYkjzIQsdc02_KUi5zIzQ6AhoFNYj5iFnUuKbJ9BhJdWEuw&usqp=CAU'}
                      />
                  </Card>
                </Row>


                <Row style={{padding:5}}>
                  
                  <Card xs="12" className="text-center"  style={{padding:10}}>
                  {user && <div >
                    {user.document_status==='0' &&
                    <Button
                      color="success"
                      onClick={() => { if (window.confirm('Are you to verify these detail of user')); handleStatusChange() } }
                    >
                      Verify Documents
                    </Button>}
                    <p style={{backgroundColor:"lightgreen",padding:10}}>
                      {!(user.document_status==='0') ? "This Profile is verified" : null}
                    </p>
                    
                    </div>}
                  </Card>
                </Row>

              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
