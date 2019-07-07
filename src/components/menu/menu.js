import React from "react";
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { menuItems } from './menuItems';

const SubMenu = Menu.SubMenu;

const SideMenu = () => {
  return (
    <>
      <div className="logo" style={{ color: "white" }}>
        <img src={`${process.env.PUBLIC_URL || ""}/assets/logo.png`} alt="Schubert" width="100%"/>
      </div>
      
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {menuItems.map(menuItem => {         
          return (
          menuItem.hasOwnProperty("submenu") ?
              <SubMenu
                key={menuItem.id}
                title={
                  <span>
                    <Icon type={menuItem.icon} />
                    <span>{menuItem.label}</span>
                  </span>
                }
              >
                {menuItem.submenu.map(submenu => {
                  return (
                      <Menu.Item key={submenu.id}>
                        <Link to={submenu.link}>{submenu.label}</Link>
                      </Menu.Item>
                    )
                })}
              </SubMenu>
            :
              <Menu.Item key={menuItem.id}>
                <Link to={menuItem.link}>
                  <Icon type={menuItem.icon} />
                  <span>{menuItem.label}</span>
                </Link> 
              </Menu.Item>
            )
        })}
      </Menu>
    </>
  );
};

export default SideMenu;
