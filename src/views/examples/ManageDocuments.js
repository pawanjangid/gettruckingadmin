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
                  {users.map((user)=>
                      <tr>
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {user.firstName + ' ' + user.lastName} 
                          </span>
                    </th>
                    <td>{user.email} </td>
                    <td>{user.phone} </td>
                    <td>
                      <Badge color="" className="badge-dot mr-4">
                        <i className={(user.document_status==='Pending')? "bg-warning" : "bg-success"} />
                        {user.document_status}
                      </Badge>
                    </td>
                   
                    <td>
                      <a href={"./Documents/"+user.driver_id}>
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

export default ManageDocuments;
