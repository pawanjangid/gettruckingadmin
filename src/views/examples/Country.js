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
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);
const [count,setCount] = useState(0)
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
  },[count]);



const handleStatusChange = (id,status) => {
  let status1 = status;
  if(status === 'active'){
    status1 = 'inactive';
  }else{
    status1 = 'active';
  }


  const data = {
    id:id,
    status:status1,
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/countryStatus",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
    }else{
      console.log(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })


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
                  {vehicle.slice(start,end).map((vhl)=>
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
                    <Button className={vhl.status==='inactive' ? 'btn btn-danger' : 'btn btn-success'} onClick={() => { if (window.confirm('Are you sure you wish to change status of this country?')); handleStatusChange(vhl.id,vhl.status) } } >{vhl.status}</Button>
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

export default Country;
