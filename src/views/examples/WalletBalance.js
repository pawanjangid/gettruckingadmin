import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  ModalFooter,
  Button,
  Row
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const WalletBalance = () => {
const [users,setUsers] = useState([]);
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);
const [editModal,setEditModal] = useState(false);
const [count,setCount] = useState(0)
const Edittoggle = () => setEditModal(!editModal);
const [userId,setUserId] = useState();
const [amount,setAmount] = useState();
const [message,setMessage]  = useState();
  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/users")
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


  function editData(item){
    setAmount(item.wallet_balance);
    setUserId(item.user_id);
    Edittoggle();
  }
  

  const submitEditHandler = () => {
    const data = {
      amount:amount,
      user_id:userId,
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/editAmount",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
        setCount(count+1);
        setMessage('Amount updated successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  return (
    <>
      <Header />
      <Modal isOpen={editModal} toggle={Edittoggle} className="">
          <ModalHeader toggle={Edittoggle}>Update Amount</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  
                  <Input
                    placeholder="New Amount"
                    type="text"
                    value={amount}
                    onChange={(e)=>{setAmount(e.target.value)}}
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
                <h3 className="mb-0">Riders List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                {message}
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Wallet Balance</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.slice(start,end).map((user)=>
                      <tr>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {user.firstName + ' ' + user.lastName} 
                          </span>
                    </th>
                    <td>{user.email} </td>
                    <td>{user.phone} </td>
                    <td>
                      {user.wallet_balance}
                    </td>
                    <td>
                      {(new Date(user.createdAt * 1000)).toGMTString()}  
                    </td>
                    
                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href={"./ProfileUser/"+user.user_id}
                          >
                            Profile
                          </DropdownItem>
                          <DropdownItem
                            onClick={(e) => {e.preventDefault();editData(user)}}
                          >
                            Add Balance
                          </DropdownItem>
                          
                        </DropdownMenu>
                      </UncontrolledDropdown>
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

export default WalletBalance;
