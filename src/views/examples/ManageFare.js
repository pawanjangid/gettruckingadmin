import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Media,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col,
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  Label,
  InputGroup,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const ManageFare = (props) => {
const [vehicle,setVehicle] = useState([]);
const [baseprice,setBaseprice] = useState();
const [parKmcost,setParKmCost] = useState();
const [count,setCount] = useState(0);
const [message,setMessage] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);
const [vehicleId,setVehicleId] = useState();


  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/vehicles")
    .then((response)=>{
      if(response.status===200){
        setVehicle(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count]);



  const submitEditHandler = () => {
    const data = {
      baseprice:baseprice,
      parKmcost:parKmcost,
      vehicle_id:vehicleId,
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/editFare",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
        setCount(count+1);
        setMessage('Fare Updated updated successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function editData(item){
    console.log(item);
    setBaseprice(item.baseprice);
    setParKmCost(item.parKmcost);
    setVehicleId(item.vehicle_id);
    toggle();
  }


  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>

      <Header />
      {/* Page content */}

      <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Edit Fare</ModalHeader>
          <ModalBody>
            
          <Form role="form">
             
              <FormGroup>
                  <Label for="basePrice">
                    Base Price
                  </Label>
                <InputGroup className="input-group-alternative">
                
                  <Input
                    placeholder="Base Price"
                    id="basePrice"
                    type="text"
                    value={baseprice}
                    onChange={(e)=>{setBaseprice(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                  <Label for="parKmcost">
                    Par Km Cost
                  </Label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Par Km Cost"
                    id="parKmcost"
                    type="text"
                    value={parKmcost}
                    onChange={(e)=>{setParKmCost(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          
          
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitEditHandler();toggle()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      


      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col><h3>Vehicle Type Detail</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add Vehicle Type</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Vehicle Name</th>
                    <th scope="col">Base Price</th>
                    <th scope="col">Cost/KM</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {vehicle.slice(start,end).map((vhl)=>
                    <tr>
                    <th>
                      <Media className="align-items-center">
                        <a

                          className="img-thumbnail mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            style={{height:100}}
                            alt="..."
                            src={"https://gettruckingbackend.herokuapp.com/"+vhl.image}
                          />
                        </a>
                      </Media>
                    </th>
                    
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {vhl.vehicle_name} 
                          </span>
                    </th>
                    <td>{vhl.baseprice} </td>
                    <td>{vhl.parKmcost}</td>
                    <td>
                      <Button className='btn btn-danger' onClick={() => { editData(vhl) } } >Update Fare</Button>
                    </td>
                    
                    
                  </tr>
                    )}
                  
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        onClick={(e) => {setStart(0);setEnd(10);}}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${(start===0)&&(end===10)? "active" : ""}`}>
                      <PaginationLink
                      onClick={(e) => {setStart(0);setEnd(10);}}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${(start===10 )&&(end===20)? "active" : ""}`}>
                      <PaginationLink
                        onClick={(e) => {setStart(10);setEnd(20);}}
                      >
                        2 
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={`${(start===20 )&&(end===30)? "active" : ""}`}>
                      <PaginationLink
                        onClick={(e) => {setStart(20);setEnd(30);}}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink

                        onClick={(e) => {setStart(start+10);setEnd(end+10);}}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default ManageFare;
