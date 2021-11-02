import React,{ useState,useEffect} from "react";
import axios from "axios";
import {
  Badge,
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
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  ModalFooter,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Drivers = (props) => {
const [users,setUsers] = useState([]);
const [count,setCount] = useState(0);
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
  },[count]);

const [modal, setModal] = useState(false);
const [message,setMessage] = useState();
const [fullName,setFullName] = useState();
const [Identification,setIdentification] = useState();
const [emergencyPerson,setEmergencyPerson] = useState();
const [emergencyNumber,setEmergencyNumber] = useState();
const [drivingLicenseExpiry,setDrivingLicenseExpiry] = useState();
const [vehicleType,setVehicleType] = useState();
const [vehicleModal,setVehicleModal] = useState();
const [LicencePlate,setLicencePlate] = useState();
const [IDCardFront,setIDCardFront] = useState();
const [IDCardBack,setIDCardBack] = useState();
const [photo,setPhoto] = useState();
const [ProofResidency,setProofResidency] = useState();
const [drivingLicence,setDrivingLicence] = useState();
const [vehicleLicense,setVehicleLicense] = useState();
const [vehicleBody,setVehicleBody] = useState();
const [insurance,setInsurance] = useState();
const [email,setEmail] = useState();
const [password,setPassword] = useState();
const [phone,setPhone] = useState();
const [start,setStart] = useState(0);
const [end,setEnd] = useState(10);



const submitHandler = () => {
  const data = {
    fullName:fullName,
    Identification:Identification,
    emergency_contact_person:emergencyPerson,
    emergency_contact_number:emergencyNumber,
    driving_license_expiry:drivingLicenseExpiry,
    vehicle_type:vehicleType,
    vehicle_modal:vehicleModal,
    License_plate_number:LicencePlate,
    ID_card_front:IDCardFront,
    ID_card_back:IDCardBack,
    photo:photo,
    Proof_of_Residency:ProofResidency,
    Driving_license:drivingLicence,
    Vehicle_License:vehicleLicense,
    vehicle_body:vehicleBody,
    insurance:insurance,
    email:email,
    phone:phone,
    password:password
  }
  console.log(data)
  axios.post("https://gettruckingbackend.herokuapp.com/admin/driver",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Driver Added successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}



const handleDelete = (driver_id) => {
  const data = {
    driver_id: driver_id,
  }

  axios.post("https://gettruckingbackend.herokuapp.com/admin/removeDriver",data)
  .then((response)=>{
    if(response.status===200){
        console.log(response)
      setCount(count+1);
      setMessage('Driver Removed successfully');
    }else{
      setMessage(response.data.message);
    }
  })
  .catch((error)=>{
    console.log(error);
  })
}



const handleActiveStatusChange = (active,driver_id) => {
  var data = {
    active: active,
    driver_id : driver_id
  }
  console.log(data);
  axios.post("https://gettruckingbackend.herokuapp.com/admin/driveractiveStatus",data)
    .then((response)=>{
      console.log(response);
      if(response.status===200){
        setCount(count+1);
      }else{
        console.log(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
}






  const toggle = () => setModal(!modal);

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
                  
                if(type==='photo'){
                  console.log(response.data.data.image);
                  setPhoto(response.data.data.image)
                }

                if(type==='IDCardFront'){
                  setIDCardFront(response.data.data.image)
                }

                if(type==='IDCardBack'){
                  setIDCardBack(response.data.data.image)
                }

                if(type==='ProofResidency'){
                  setProofResidency(response.data.data.image)
                }

                if(type==='drivingLicence'){
                  setDrivingLicence(response.data.data.image)
                }

                if(type==='vehicleLicence'){
                  setVehicleLicense(response.data.data.image)
                }

                if(type==='vehicleBody'){
                  setVehicleBody(response.data.data.image)
                }

                if(type==='Insurance'){
                  setInsurance(response.data.data.image)
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

  const [editModal,setEditModal] = useState(false);
  const [driverId,setDriverId] = useState();
  const Edittoggle = () => setEditModal(!editModal);


  const submitEditHandler = () => {
    const data = {
      fullName:fullName,
      Identification:Identification,
      emergency_contact_person:emergencyPerson,
      emergency_contact_number:emergencyNumber,
      driving_license_expiry:drivingLicenseExpiry,
      vehicle_type:vehicleType,
      vehicle_modal:vehicleModal,
      License_plate_number:LicencePlate,
      ID_card_front:IDCardFront,
      ID_card_back:IDCardBack,
      photo:photo,
      Proof_of_Residency:ProofResidency,
      Driving_license:drivingLicence,
      Vehicle_License:vehicleLicense,
      vehicle_body:vehicleBody,
      insurance:insurance,
      email:email,
      phone:phone,
      password:password,
      driver_id:driverId
    }
    console.log(data)
    axios.post("https://gettruckingbackend.herokuapp.com/admin/updateDriver",data)
    .then((response)=>{
      if(response.status===200){
          console.log(response)
          setCount(count+1);
          setMessage('Driver Updated successfully');
      }else{
        setMessage(response.data.message);
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }


  function editData(item){
    console.log(item);
    setFullName(item.fullName);
    setEmail(item.email);
    setPhone(item.phone);
    setIdentification(item.Identification);
    setEmergencyPerson(item.emergency_contact_person);
    setEmergencyNumber(item.emergency_contact_number);
    setDrivingLicenseExpiry(item.driving_license_expiry);
    setVehicleType(item.vehicle_type);
    setVehicleModal(item.vehicle_modal);
    setLicencePlate(item.License_plate_number);
    setPhoto(item.photo);
    setIDCardFront(item.ID_card_front);
 
    setIDCardBack(item.ID_card_back);
  
    setProofResidency(item.Proof_of_Residency);
  
    setDrivingLicence(item.Driving_license);
  
    setVehicleLicense(item.Vehicle_License);
  
    setVehicleBody(item.vehicle_body);
  
    setInsurance(item.insurance);
  
    setDriverId(item.driver_id);
    Edittoggle();
  }

  return (
    <>
      <Header />
      <Modal isOpen={modal} toggle={toggle} className="">
          <ModalHeader toggle={toggle}>Add New Driver</ModalHeader>
          <ModalBody>
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Name"
                    type="text"
                    value={fullName}
                    onChange={(e)=>{setFullName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Email"
                    type="text"
                    vehicle_name={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Password"
                    type="text"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Identification"
                    type="text"
                    value={Identification}
                    onChange={(e)=>{setIdentification(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>


              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Emergency Contact Person"
                    type="text"
                    value={emergencyPerson}
                    onChange={(e)=>{setEmergencyPerson(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="emergency Contact Number"
                    type="text"
                    value={emergencyNumber}
                    onChange={(e)=>{setEmergencyNumber(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Driving License Expiry"
                    type="text"
                    value={drivingLicenseExpiry}
                    onChange={(e)=>{setDrivingLicenseExpiry(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Type"
                    type="text"
                    value={vehicleType}
                    onChange={(e)=>{setVehicleType(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Modal"
                    type="text"
                    value={vehicleModal}
                    onChange={(e)=>{setVehicleModal(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Licence Plate"
                    type="text"
                    value={vehicleType}
                    onChange={(e)=>{setLicencePlate(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
            
         

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Photo"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'photo')}}
                  />
                  <label for="file">Choose a vehicle Body</label>
                </InputGroup>
                
              </FormGroup>
              
                  {photo && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+photo} alt="data not available" />
                  </div>}
                
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Id Card Front"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'IDCardFront')}}
                  />
                  <label for="file">Choose Id Card Front</label>
                </InputGroup>
              </FormGroup>
                    
              {IDCardFront && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+IDCardFront} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Id Card Back"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'IDCardBack')}}
                  />
                  <label for="file">Choose Id Card Back</label>
                </InputGroup>
              </FormGroup>


              {IDCardBack && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+IDCardBack} alt="data not available"  />
                  </div>}


              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Proof of Residency"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'ProofResidency')}}
                  />
                  <label for="file">Choose Proof of Residency</label>
                </InputGroup>
              </FormGroup>

              {ProofResidency && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+ProofResidency} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Driving Licence"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'drivingLicence')}}
                  />
                  <label for="file">Choose Driving Licence</label>
                </InputGroup>
              </FormGroup>

              {drivingLicence && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+drivingLicence} alt="data not available" />
                  </div>}
         
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle License"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'vehicleLicence')}}
                  />
                  <label for="file">Choose Vehicle License</label>
                </InputGroup>
              </FormGroup>
                
              {vehicleLicense && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+vehicleLicense} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="vehicle Body"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'vehicleBody')}}
                  />
                  <label for="file">Choose a Vehicle Body</label>
                </InputGroup>
              </FormGroup>

              {vehicleBody && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+vehicleBody} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Insurance"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'Insurance')}}
                  />
                  <label for="file">Choose a Insurance</label>
                </InputGroup>
              </FormGroup>
         
              {insurance && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+insurance} alt="data not available" />
                  </div>}

            </Form>
          
            
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitHandler();toggle()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={editModal} toggle={Edittoggle} className="">
          <ModalHeader toggle={editModal}>Edit Driver</ModalHeader>
          <ModalBody>
            
          <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Name"
                    type="text"
                    value={fullName}
                    onChange={(e)=>{setFullName(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              {/* <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Password"
                    type="text"
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup> */}
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Phone Number"
                    type="text"
                    value={phone}
                    onChange={(e)=>{setPhone(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Identification"
                    type="text"
                    value={Identification}
                    onChange={(e)=>{setIdentification(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>


              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Emergency Contact Person"
                    type="text"
                    value={emergencyPerson}
                    onChange={(e)=>{setEmergencyPerson(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="emergency Contact Number"
                    type="text"
                    value={emergencyNumber}
                    onChange={(e)=>{setEmergencyNumber(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Driving License Expiry"
                    type="text"
                    value={drivingLicenseExpiry}
                    onChange={(e)=>{setDrivingLicenseExpiry(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Type"
                    type="text"
                    value={vehicleType}
                    onChange={(e)=>{setVehicleType(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle Modal"
                    type="text"
                    value={vehicleModal}
                    onChange={(e)=>{setVehicleModal(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Licence Plate"
                    type="text"
                    value={LicencePlate}
                    onChange={(e)=>{setLicencePlate(e.target.value)}}
                  />
                </InputGroup>
              </FormGroup>
            
             
         

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Photo"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'photo')}}
                  />
                  <label for="file">Choose a vehicle Body</label>
                </InputGroup>
                
              </FormGroup>
              
                  {photo && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+photo} alt="data not available" />
                  </div>}
                
              
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Id Card Front"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'IDCardFront')}}
                  />
                  <label for="file">Choose Id Card Front</label>
                </InputGroup>
              </FormGroup>
                    
              {IDCardFront && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+IDCardFront} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Id Card Back"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'IDCardBack')}}
                  />
                  <label for="file">Choose Id Card Back</label>
                </InputGroup>
              </FormGroup>


              {IDCardBack && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+IDCardBack} alt="data not available"  />
                  </div>}


              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Proof of Residency"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'ProofResidency')}}
                  />
                  <label for="file">Choose Proof of Residency</label>
                </InputGroup>
              </FormGroup>

              {ProofResidency && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+ProofResidency} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Driving Licence"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'drivingLicence')}}
                  />
                  <label for="file">Choose Driving Licence</label>
                </InputGroup>
              </FormGroup>

              {drivingLicence && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+drivingLicence} alt="data not available" />
                  </div>}
         
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Vehicle License"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'vehicleLicence')}}
                  />
                  <label for="file">Choose Vehicle License</label>
                </InputGroup>
              </FormGroup>
                
              {vehicleLicense && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+vehicleLicense} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="vehicle Body"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'vehicleBody')}}
                  />
                  <label for="file">Choose a Vehicle Body</label>
                </InputGroup>
              </FormGroup>

              {vehicleBody && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+vehicleBody} alt="data not available" />
                  </div>}

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <Input
                    placeholder="Insurance"
                    type="file"
                    onChange={(e)=>{handleFileChange(e,'Insurance')}}
                  />
                  <label for="file">Choose a Insurance</label>
                </InputGroup>
              </FormGroup>
         
              {insurance && 
                  <div style={{padding: '5px',border: '1px solid gray',margin: '5px'}}>
                      <img height="100px" width="120px" src={'https://gettruckingbackend.herokuapp.com/'+insurance} alt="data not available" />
                  </div>}

            </Form>
          
            
          
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={()=>{submitEditHandler();Edittoggle()}}>Submit</Button>{' '}
            <Button color="secondary" onClick={Edittoggle}>Cancel</Button>
          </ModalFooter>
        </Modal>


      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
            <CardHeader className="border-0">
                <Row>
                  <Col><h3>Drivers List</h3></Col>
                  <Col><Button color="primary" onClick={toggle} >Add New Driver</Button></Col>
                </Row>
                {message}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
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
                      {user.active ? <Badge color="" className="badge-dot mr-4">
                        <i className="bg-success" />
                        Active
                      </Badge> : <Badge color="" className="badge-dot mr-4">
                        <i className="bg-warning" />
                        Restricted
                      </Badge>}
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
                            href={"./Profile/"+user.driver_id}
                          >
                            Profile
                          </DropdownItem>
                          <DropdownItem
                            href={"./DriverRides/"+user.driver_id}
                          >
                            Ride Detail
                          </DropdownItem>
                          {user.active===1 && <DropdownItem
                            style={{backgroundColor:"#ffe8e0"}}
                            onClick={(e) => {handleActiveStatusChange(0,user.driver_id)}}
                          >
                            Restrict
                          </DropdownItem>}
                          {user.active===0 && <DropdownItem
                            style={{backgroundColor:"#b8f099"}}
                            onClick={(e) => {handleActiveStatusChange(1,user.driver_id)}}
                          >
                            Active
                          </DropdownItem>}
                          <DropdownItem
                            
                            onClick={(e) => {editData(user)}}
                          >
                            Edit Driver
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            style={{backgroundColor:"#ff6363"}}
                            onClick={(e) => {e.preventDefault();handleDelete(user.driver_id)}}
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
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
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

export default Drivers;
