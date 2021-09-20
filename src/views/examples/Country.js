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
  Col,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Country = (props) => {
const [vehicle,setVehicle] = useState([]);


  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/country")
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
  },[]);



const handleDelete = () => {
  console.log("Deleted");
}


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
                <Row>
                  <Col><h3>Countries</h3></Col>
                </Row>
                
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Nick Name</th>
                    <th scope="col">Phone Code</th>
                    <th scope="col">ISO</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {vehicle.map((vhl)=>
                    <tr>
                    
                    
                    <th scope="row">
                    
                          <span className="mb-0 text-sm">
                            {vhl.name} 
                          </span>
                    </th>
                    <td>{vhl.nicename} </td>
                    <td>{vhl.phonecode} </td>
                    <td>{vhl.iso3}</td>
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

export default Country;
