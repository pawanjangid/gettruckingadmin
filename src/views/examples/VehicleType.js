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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Label
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const VehicleType = (props) => {
const [vehicle,setVehicle] = useState([]);
const [image,setImage] = useState();
const [vehicle_name,setVehicleName] = useState();
const [description,setDescription] = useState();
const [dimension,setDimension] = useState();
const [baseprice,setBaseprice] = useState();
const [parKmcost,setParKmCost] = useState();
const [count,setCount] = useState(0);
const [message,setMessage] = useState();


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



const handleFileChange = (e) => {

    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        allFiles.push(fileInfo);
        if(allFiles.length === files.length){
            console.log(allFiles)
          setImage(allFiles[0].base64)
        }
      }
    }
  }

const submitHandler = () => {
    const data = {
      vehicle_name:vehicle_name,
      description:description,
      dimension:dimension,
      baseprice:baseprice,
      parKmcost:parKmcost,
      image:image
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/vehicles",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
        setCount(count+1);
        setMessage('Vehicle added successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}


const handleDelete = (vehicle_id) => {
  const data = {
    vehicle_id: vehicle_id,
  }

  axios.post("https://gettruckingbackend.herokuapp.com/admin/removeVehicle",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Vehicle Removed successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}


const [vehicleId,setVehicleId] = useState();
const [editModal,setEditModal] = useState(false);
function editData(item){
  console.log(item);
  setVehicleName(item.vehicle_name);
  setDescription(item.description);
  setDimension(item.dimension);
  setImage(item.image);
  setVehicleId(item.vehicle_id);
  Edittoggle();
}



const submitEditHandler = () => {
  const data = {
    vehicle_name: vehicle_name,
    description: description,
    dimension: dimension,
    image: image,
    vehicle_id:vehicleId,
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/updateVehicle",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Vehicle Updated successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}

const Edittoggle = () => setEditModal(!editModal);


  const [modal, setModal] = useState(false);
  const [start,setStart] = useState(0);
  const [end,setEnd] = useState(10);

  const toggle = () => setModal(!modal);

  return (
    <>

      <Header />
      {/* Page content */}

        <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Add New Vehicle Type</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Vehicle Name"
                    type="text"
                    value={vehicle_name}
                    onChange={(e)=>{setVehicleName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Description"
                    type="text"
                    vehicle_name={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Dimension"
                    type="text"
                    value={dimension}
                    onChange={(e)=>{setDimension(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Base Price"
                    type="text"
                    value={baseprice}
                    onChange={(e)=>{setBaseprice(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Par Km Cost"
                    type="text"
                    value={parKmcost}
                    onChange={(e)=>{setParKmCost(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      Image
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Dimension"
                    type="file"
                    onChange={(e)=>{handleFileChange(e)}}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          
          
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitHandler();toggle()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={editModal} toggle={Edittoggle} className="">
          <ModalHeader toggle={Edittoggle}>Edit Fare</ModalHeader>
          <ModalBody>
            
          <Form role="form">
             
              <FormGroup>
                  <Label for="vehicle_name">
                    Vehicle Name
                  </Label>
                <InputGroup className="input-group-alternative">
                
                  <Input
                    placeholder="Vehicle Name"
                    id="vehicle_name"
                    type="text"
                    value={vehicle_name}
                    onChange={(e)=>{setVehicleName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                  <Label for="description">
                    Description
                  </Label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Description"
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e)=>{setDescription(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                  <Label for="description">
                    Dimension
                  </Label>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Dimension"
                    id="dimension"
                    type="text"
                    value={dimension}
                    onChange={(e)=>{setDimension(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      Image
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Dimension"
                    type="file"
                    onChange={(e)=>{handleFileChange(e)}}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          
          
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitEditHandler();Edittoggle()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={Edittoggle}>Cancel</Button>
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
                    <th scope="col">Description</th>
                    <th scope="col">Dimension</th>
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
                    <td>{vhl.description} </td>
                    <td>{vhl.dimension} </td>
                    <td>{vhl.baseprice} </td>
                    <td>{vhl.parKmcost}</td>
                    <td>
                    <Button className='btn btn-warning' onClick={() => { editData(vhl) } } >Edit</Button>
                    
                    <Button className='btn btn-danger' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(vhl.vehicle_id) } } >Remove</Button>
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
                    <PaginationItem className={`${(start===0 )&&(end===10)? "active" : ""}`}>
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

export default VehicleType;
