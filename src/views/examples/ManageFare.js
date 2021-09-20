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
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const ManageFare = (props) => {
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

const handleDelete = () => {
  console.log("Deleted");
}

  const [modal, setModal] = useState(false);

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
                  {vehicle.map((vhl)=>
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
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
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
