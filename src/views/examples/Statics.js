import React from 'react'
import {
    Card,
    Table,
    Container,
    Row,
  
  } from "reactstrap";
  import Header from "components/Headers/Header.js";


function Statics() {
    return (
        <>
        <Header />
        <Container className="mt--7 full-height-container" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
                <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>
                    <th scope="row">
                        <span className="mb-0 text-sm">
                        Sample Name
                        </span>
                    </th>
                    <td>$50 </td>
                    <td>
                        20-12-2021
                    </td>
                  </tr>
                  
                </tbody>
              </Table>
              
            </Card>
          </div>
          <div className="col">
            <Card className="shadow">
            
              <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr>
                    <th scope="row">
                        <span className="mb-0 text-sm">
                        Sample Name
                        </span>
                    </th>
                    <td>$50 </td>
                    <td>
                        20-12-2021
                    </td>
                  </tr>
                  
                </tbody>
              </Table>
              
            </Card>
          </div>
        </Row>
      </Container>
        </>
    )
}

export default Statics
