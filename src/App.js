import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WorkDay from './components/workday/WorkDay';

//Ant
import { Layout, Breadcrumb, Icon } from 'antd';

//Components
import SideMenu from "./components/menu/menu";
import { menuComponents } from "./components/menu/menuItems";

const { Header, Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {
    const date = new Date();
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Router>
          <Sider
            style={{backgroundColor: "#6D747A"}}
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
              {<SideMenu/>}
          </Sider>
          <Layout>
            <Header style={{ padding: 0, backgroundColor: "#4e5358" }}>
              <div>
              <h2 style={{color: "white", marginLeft: "15px"}}>Bienvenido</h2>
              <Icon type="logout" style={{position: "absolute", color: "white", fontSize: "25px", top: "15px", right: "15px"}} />
              </div>
            </Header>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                {/*<Breadcrumb.Item>Users</Breadcrumb.Item>*/}
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>                
                <Route exact path="/" component={WorkDay} />
                { menuComponents.map(menuComponent => {
                    return <Route exact key={menuComponent.id} path={menuComponent.path} component={menuComponent.component}/>
                  })
                }    
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
            {`Schubert ©${date.getFullYear()}`}
            </Footer>
          </Layout>
        </Router>
      </Layout>
    );
  }
}

export default App;
