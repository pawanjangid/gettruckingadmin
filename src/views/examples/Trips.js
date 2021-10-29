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
  Row
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Trips = (props) => {
const [orders,setOrders] = useState([]);
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/orders")
    .then((response)=>{
      if(response.status===200){
        setOrders(response.data.data);
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
                <h3 className="mb-0">Trips List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>

                    <th scope="col">PickUp Location</th>
                    <th scope="col">Drop Location</th>
                    <th scope="col">Distance</th>
                    <th scope="col">Avg Duration</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Order Status/Driver</th>
                    <th scope="col">Order Amount</th>
                    <th scope="col">Created At</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(start,end).map((order)=>
                      <tr>
                    
                    <td>{JSON.parse(order.locations)[0].formatted_address} </td>
                    <td>{JSON.parse(order.locations)[1].formatted_address} </td>
                    <td>{order.distance} </td>
                    <td>{order.duration} </td>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {order.firstName + ' ' + order.lastName} 
                          </span>
                    </th>
                    <td>{order.driver_id ? "Assigned" : "Waiting"} </td>
                    <td>s${order.amount} </td>
                    <td>
                      {(new Date(order.time * 1000)).toGMTString()}  
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
                            href="#!"
                            onClick={(e) => e.preventDefault()}
                          >
                            Detail
                          </DropdownItem>
                          <DropdownItem
                            href="#!"
                            onClick={(e) => e.preventDefault()}
                          >
                            Assign Ride to Driver
                          </DropdownItem>
                         
                          <DropdownItem
                            href="#!"
                            style={{backgroundColor:"#ff6363"}}
                            onClick={(e) => e.preventDefault()}
                          >
                            Remove
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

export default Trips;
