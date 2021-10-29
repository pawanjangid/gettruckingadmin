import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  ModalFooter,
  Col,
  Button,

} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Riders = () => {
const [reasons,setReasons] = useState([]);
const [count,setCount] = useState(0);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/reason")
    .then((response)=>{
      if(response.status===200){
        setReasons(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count]);



const [message,setMessage] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);



const submitHandler = () => {
  const data = {
    reason:reason
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/reason",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Reason Added successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}




const handleDelete = (reason_id) => {
  const data = {
    reason_id: reason_id,
  }

  axios.post("https://gettruckingbackend.herokuapp.com/admin/removeAdmin",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Removed successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}



const [modal, setModal] = useState(false);
const [editModal,setEditModal] = useState(false);
const [reason,setReason]= useState();
const [reasonId,setReasonId]= useState();

function editData(item){
  setReason(item.reason);
  setReasonId(item.reason_id);
  Edittoggle();
}



const submitEditHandler = () => {
  const data = {
    reason:reason,
    reason_id:reasonId,
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/editReason",data)
  .then((response)=>{
    if(response.status===200){
      setCount(count+1);
      setMessage('Reason updated successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}

const toggle = () => setModal(!modal);
const Edittoggle = () => setEditModal(!editModal);

  return (
    <>
      <Header />
      <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Add New Reason</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Name"
                    type="text"
                    value={reason}
                    onChange={(e)=>{setReason(e.target.value)}}
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
          <ModalHeader toggle={Edittoggle}>Edit Reason</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Name"
                    type="text"
                    value={reason}
                    onChange={(e)=>{setReason(e.target.value)}}
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
                  <Col><h3>Reasons List</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add New Reason</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Reason</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {reasons.slice(start, end).map((rsn)=>
                  <tr>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {rsn.reason} 
                          </span>
                    </th>
                    <td>
                      {(new Date(rsn.createAt * 1000)).toGMTString()}  
                    </td>
                    
                    <td className="text-right">
                      <a href="#!"  style={{padding:4}} onClick={()=>{editData(rsn)}}>
                        <Button className="btn btn-warning">Edit</Button>
                      </a>
                      <a href="#!" style={{padding:4}}>
                        <Button className="btn btn-danger" onClick={()=>handleDelete(rsn.reason_id)}>Remove</Button>
                      </a>
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

export default Riders;
