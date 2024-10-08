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
  Button,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Form,
  Input,
  InputGroup,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const DiscountAndCoupon = (props) => {
const [coupons,setCoupons] = useState([]);
const [count,setCount] = useState(0);
const [message,setMessage] = useState();
const [coupon,setCoupon] = useState();
const [bonus,setBonus] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);


  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/coupon")
    .then((response)=>{
      if(response.status===200){
        setCoupons(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count]);


const submitHandler = () => {
    const data = {
      coupon:coupon,
      bonus_amount:bonus
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/coupon",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
        setCount(count+1);
        setMessage('Coupon added successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}

const handleDelete = (coupon_id) => {

  const data = {
    coupon_id:coupon_id
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/deleteCoupon",data)
  .then((response)=>{
    if(response.status===200){
      setMessage('Coupon Removed successfully');
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

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>

      <Header />
      {/* Page content */}

        <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Add New Coupon</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Coupon"
                    type="text"
                    value={coupon}
                    onChange={(e)=>{setCoupon(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Bonus Amount"
                    type="text"
                    value={bonus}
                    onChange={(e)=>{setBonus(e.target.value)}}
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
                  <Col><h3>Coupon Manager</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add Coupon</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Coupon</th>
                    <th scope="col">Bonus Amount</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {coupons.slice(start,end).map((cpn)=>
                    <tr>
                    <th>
                      {cpn.coupon}
                    </th>
                    <td>{cpn.bonus_amount}</td>
                   
                    <td>
                    <Button className='btn btn-danger' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(cpn.coupon_id) } } >Remove</Button>
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

export default DiscountAndCoupon;
