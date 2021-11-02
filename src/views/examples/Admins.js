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
const [users,setUsers] = useState([]);
const [count,setCount] = useState(0);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/admin")
    .then((response)=>{
      if(response.status===200){
        setUsers(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count]);



const [message,setMessage] = useState();
const [name,setName] = useState();
const [email,setEmail] = useState();
const [password,setPassword] = useState();
const [phone,setPhone] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);



const submitHandler = () => {
  const data = {
    name:name,
    email:email,
    phone:phone,
    password:password,
    role:'admin'
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/admin",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Admin Added successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}




const handleDelete = (admin_id) => {
  const data = {
    admin_id: admin_id,
  }

  axios.post("https://gettruckingbackend.herokuapp.com/admin/removeAdmin",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Admin Removed successfully');
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
const [editname,setEditName]= useState();
const [editemail,setEditmail] = useState();
const [editPassword,setEditpassword] = useState();
const [editPhone,setEditPhone] = useState();
const [adminId,setAdminID] = useState();



const [passwordModal,setPasswordModal] = useState(false);

function editData(item){
  setEditName(item.name);
  setEditmail(item.email);
  setEditPhone(item.phone);
  setAdminID(item.admin_id);
  Edittoggle();
}




const submitEditHandler = () => {
  const data = {
    name:editname,
    email:editemail,
    phone:editPhone,
    admin_id:adminId,
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/editAdmin",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Admin updated successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}

const [passwordMessage,setPasswordMessage] = useState();

function changePassword(item){
  setAdminID(item.admin_id);
  Passwordtoggle()
}

const submitPasswordHandler = () => {
  if(editPassword.length >= 6){
    const data = {
      password:editPassword,
      admin_id:adminId,
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/changeAdminPassword",data)
    .then((response)=>{
      if(response.status===200){
          Passwordtoggle();
          setCount(count+1);
          setMessage('Admin Password updated successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })

  }else{
    setPasswordMessage("Please enter password at least 6 digit")
  }
}

const toggle = () => setModal(!modal);
const Edittoggle = () => setEditModal(!editModal);
const Passwordtoggle = () => setPasswordModal(!passwordModal);

  return (
    <>
      <Header />
      <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Add New Admin</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Password"
                    type="password"
                    vehicle_name={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup> 
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Email"
                    type="text"
                    vehicle_name={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup> 
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
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
          <ModalHeader toggle={Edittoggle}>Edit Admin</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="Name"
                    type="text"
                    value={editname}
                    onChange={(e)=>{setEditName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Email"
                    type="text"
                    value={editemail}
                    onChange={(e)=>{setEditmail(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
             
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={editPhone}
                    onChange={(e)=>{setEditPhone(e.target.value)}}
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


        <Modal isOpen={passwordModal} toggle={Passwordtoggle} className="">
          <ModalHeader toggle={Passwordtoggle}>Change Admin Password</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Password"
                    type="text"
                    value={editPassword}
                    onChange={(e)=>{setEditpassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              
             
            </Form>
          
          {passwordMessage}
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitPasswordHandler();}}>Submit</Button>{' '}
            <Button color="secondary" onClick={Passwordtoggle}>Cancel</Button>
          </ModalFooter>
        </Modal>


      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
            <CardHeader className="border-0">
                <Row>
                  <Col><h3>Admin List</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add New Admin</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">role</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.slice(start, end).map((user)=>
                  <tr>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {user.name} 
                          </span>
                    </th>
                    <td>{user.email} </td>
                    <td>{user.phone} </td>
                    <td>
                      {user.role}
                    </td>
                    <td>
                      {(new Date(user.createdAt * 1000)).toGMTString()}  
                    </td>
                    
                    <td className="text-right">
                      <a href="#!"  style={{padding:4}} onClick={()=>{editData(user)}}>
                        <Button className="btn btn-warning">Edit</Button>
                      </a>
                      <a href="#!"  style={{padding:4}} onClick={()=>{changePassword(user)}}>
                        <Button className="btn btn-warning">Change Password</Button>
                      </a>
                    <a href="#!" style={{padding:4}}>
                      <Button className="btn btn-danger" onClick={()=>handleDelete(user.admin_id)}>Remove</Button>
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
