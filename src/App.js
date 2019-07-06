import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import WorkDay from './components/workday/WorkDay';

//Ant
import { Layout, Breadcrumb } from 'antd';

//Components
import SideMenu from "./components/menu/menu";
import workers from "./components/workers/workers";
import { menuItems } from "./components/menu/menuItems";

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
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
              {<SideMenu/>}
          </Sider>
          <Layout>
            <Header style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Users</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>                
                <Route exact path="/" component={WorkDay} />
                { menuItems.map(menuItem => {
                  return (
                    menuItem.hasOwnProperty("submenu") ? 
                    <>
                      {menuItem.submenu.map(submenu => {
                        return <Route path={submenu.link} component={submenu.component}/>
                      })}
                    </> :
                    <Route path={menuItem.link} component={menuItem.component} />
                    )
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
