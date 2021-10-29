import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Media,
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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const ManageAds = (props) => {
const [banner,setBanner] = useState([]);
const [image,setImage] = useState();
const [count,setCount] = useState(0);
const [message,setMessage] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);

  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/banner")
    .then((response)=>{
      if(response.status===200){
        setBanner(response.data.data);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[count]);



const handleFileChange = (e) => {

    let files = e.target.files;
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        allFiles.push(fileInfo);
        if(allFiles.length === files.length){
            console.log(allFiles)
          setImage(allFiles[0].base64)
        }
      }
    }
  }

const submitHandler = () => {
    const data = {
      image:image
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/banner",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
        setCount(count+1);
        setMessage('Banner added successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}



const handleDelete = (banner_id) => {

  const data = {
    banner_id:banner_id
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/deleteBanner",data)
  .then((response)=>{
    if(response.status===200){
      setMessage('Banner Removed successfully');
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
          <ModalHeader toggle={toggle}>Add New Banner</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      Image
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="File"
                    type="file"
                    onChange={(e)=>{handleFileChange(e)}}
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
                  <Col><h3>Ads Manager</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add Banner</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {banner.slice(start,end).map((bnr)=>
                    <tr>
                    <th>
                      <Media className="align-items-center">
                        <a

                          className="img-thumbnail mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={"https://gettruckingbackend.herokuapp.com/"+bnr.image}
                          />
                        </a>
                      </Media>
                    </th>
                    
                   
                    <td>
                    <Button className='btn btn-danger' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(bnr.banner_id) } } >Remove</Button>
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

export default ManageAds;
