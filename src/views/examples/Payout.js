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
  Row,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Payout = () => {
const [users,setUsers] = useState([]);
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/PayoutList")
    .then((response)=>{
      if(response.status===200){
        setUsers(response.data.data);
        console.log(response.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);




  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">All Payouts requested By Driver</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Request At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.slice(start,end).map((user)=>
                      <tr>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {user.fullName} 
                          </span>
                    </th>
                    <th>{user.phone}</th>
                    <td>{user.amount} </td>
                    <td>{user.status} </td>
                    
                    <td>
                      {(new Date(user.time * 1000)).toGMTString()}  
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
                            href={"./Profile/"+user.user_id}
                          >
                            Approve
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Decline
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            style={{backgroundColor:"#ffe8e0"}}
                            onClick={(e) => e.preventDefault()}
                          >
                            Hold
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

export default Payout;
