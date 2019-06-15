import React, { Component } from "react";

//Ant
import { 
  Select, 
  Row, 
  Col,
  Table, 
  Divider,
  Card,
  Avatar
} from "antd";

const { Option } = Select;
const { Meta } = Card;

class WorkDay extends Component {
  state = {
    data: [
      { text: "San Salvador", value: 1 },
      { text: "Santa Ana", value: 2 }
    ],
    value: undefined
  };
  
  fetch(value) {
    console.log("value", value);
    const data = this.state.data;
    return data
  }

  handleSearch = value => {
    //TODO: FETCH REQUEST
    console.log("value", value);
  };

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const options = this.state.data.map(d => (
      <Option key={d.value}>{d.text}</Option>
    ));
    return (
      <>
        <h1>Crear Jornada</h1>
        
        <Row>
          <Col className="gutter-row" span={8}>            
            <div className="gutter-box">    
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                style={{ width: '100%' }}
              >
                {options}
              </Select>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box"> 
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                style={{ width: '100%' }}
              >
                {options}
              </Select>
            </div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box"> 
              <Select
                showSearch
                value={this.state.value}
                placeholder={this.props.placeholder}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                style={{ width: '100%' }}
              >
                {options}
              </Select>
            </div>
          </Col>
          <br/>
          <br/>
          <br/>
          <Col span={24}>
            <Table columns={columns} dataSource={data} />
          </Col>

          <br/>
          <br/>
          <br/>
          <Col xs={24} sm={24} md={24}>
            <Card
              hoverable
              style={{ width: "100%" }}
            >
            <Col md={24}>
              <img alt="example" style={{margin: "0 auto",  width:"100px", display: "block" }} src="http://www.myiconfinder.com/uploads/iconsets/256-256-da0e62dc898129ed81766d1539cf9573-truck.png" />
            </Col>
            <Col md={8}>
              <Meta title="Marca" description="Toyota" />
            </Col>
            <Col md={8}>
              <Meta title="Placa" description="P129283" />
            </Col>
            <Col md={8}>
              <Meta title="Millaje" description="60,000" />
            </Col>
            </Card>
          </Col>
          
          <Col xs={24} sm={24} md={24}>
            <Table columns={columnsTools} dataSource={dataTools} />
          </Col>


        </Row>
        

      </>
    );
  }
}

export default WorkDay;


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Cambiar</a>
        <Divider type="vertical" />
        <a href="javascript:;">Quitar</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];


const columnsTools = [
  {
    title: 'Nombre',
    dataIndex: 'Nombre',
    key: 'Nombre',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Código',
    dataIndex: 'Código',
    key: 'Código',
  },
  {
    title: 'Cantidad',
    dataIndex: 'Cantidad',
    key: 'Cantidad',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Cambiar</a>
        <Divider type="vertical" />
        <a href="javascript:;">Quitar</a>
      </span>
    ),
  },
];

const dataTools = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
