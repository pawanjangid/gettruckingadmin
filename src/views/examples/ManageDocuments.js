import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button 
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const ManageDocuments = (props) => {
const [users,setUsers] = useState([]);
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/drivers")
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
                <h3 className="mb-0">Riders List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
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
                    <td>{user.email} </td>
                    <td>{user.phone} </td>
                    <td>
                      <Badge className="badge-dot mr-4">
                        <i style={{fontSize:24}} className={(user.document_status==='1')? "bg-success" :"bg-warning"} />
                        {user.document_status==='1' ? 'Verified':'Not Verified'}
                      </Badge>
                    </td>
                   
                    <td>
                      <a href={"./Profile/"+user.driver_id}>
                        <Button color="primary">View Documents and Verify</Button>
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

export default ManageDocuments;
