import React,{useState,useEffect} from "react";

// reactstrap components
import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header";
import axios from 'axios'
const Settings = () => {
  const [nightMode,setNightMode] = useState("#454daf");
  const [dayMode,setDayMode] = useState("#f8a346")
  const [dayBackground,setDayBackground] = useState();
  const [nightBackground,setNightBackground] = useState();
  const [message,setMessage] = useState();


  useEffect(() => {
    axios.get("https://gettruckingbackend.herokuapp.com/admin/settings")
    .then((response)=>{
      if(response.status===200){
        setDayMode(response.data.data.dayColor);
        setNightMode(response.data.data.nightColor);
        setDayBackground(response.data.data.dayBackground);
        setNightBackground(response.data.data.nightBackground);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);



  const submitHandler = ()=>{
    let data = {
      dayColor:dayMode,
      nightColor:nightMode,
      dayBackground:dayBackground,
      nightBackground:nightBackground
      
    }
    axios.post("https://gettruckingbackend.herokuapp.com/admin/settings",data)
    .then((response)=>{
      if(response.status===200){
        alert("Data saved successfully!");
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const handleFileChange = (e,type) => {

    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    for (var i = 0; i < files.length; i++) {

      let file = files[i];

      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = async () => {

        // Make a fileInfo Object
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };

        // Push it to the state
        allFiles.push(fileInfo);

        // If all files have been proceed
        if(allFiles.length === files.length){
            console.log(allFiles)
            axios.post('https://gettruckingbackend.herokuapp.com/driver/upload', {
                image: allFiles[0].base64
            })
            .then((response)=>{
              if(response.status===200){
                console.log(response.data.data.image);
                if(type==='dayBackground'){
                  console.log(response.data.data.image);
                  setDayBackground(response.data.data.image)
                }

                if(type==='nightBackground'){
                  setNightBackground(response.data.data.image)
                }
              }else{
                setMessage(response.data.message);
              }
            })
            .catch((error)=>{
              console.log(error);
            })
        }

      } // reader.onload

    } // for

  }

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Application settings
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Day Mode Color
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="color"
                            style={{height:'100px',width:'100px'}}
                            value={dayMode}
                            onChange={e => {setDayMode(e.target.value)}}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Night Mode Color
                          </label>
                          <Input
                            style={{height:'100px',width:'100px'}}
                            className="form-control-alternative"
                            type="color"
                            value={nightMode}
                            onChange={e => {setNightMode(e.target.value)}}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                   
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Day Mode Background
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="file"
                            onChange={(e)=>{handleFileChange(e,'dayBackground')}}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                           Night Mode Background
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="file"
                            onChange={(e)=>{handleFileChange(e,'nightBackground')}}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12" className="text-center"  style={{padding:30}}>
                        <p>
                          {message}
                        </p>
                        <Button className="btn btn-success" onClick={()=>{submitHandler()}}>Save</Button>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <img src={'https://gettruckingbackend.herokuapp.com'+dayBackground} alt="data not available" />
                      </Col>
                      <Col lg="6">
                      <img src={'https://gettruckingbackend.herokuapp.com'+nightBackground} alt="data not available" />
                      </Col>
                    </Row>
                    
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
