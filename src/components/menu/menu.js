import React from "react";
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;

const menuItems = [
  {
    id: 1,
    label: "Iniciar Jornada",
    icon: "pie-chart",
    component: null,
    showInMenu: true,
    link: "/WorkDay"
  },
  {
    id: 2,
    label: "Terminar Jornada",
    icon: "pie-chart",
    component: null,
    showInMenu: true,
    link: "/WorkDay"
  },
  {
    id: 3,
    label: "Catalogos",
    icon: "pie-chart",
    component: null,
    showInMenu: true,
    link: "#",
    submenu: [
      { id: 31, label: "Personas", icon: "pie-chart", component: null, showInMenu: true, link: "/Persons" },
      { id: 32, label: "Camiones", icon: "pie-chart", component: null, showInMenu: true, link: "/Trucks" }
    ]
  }
];

const SideMenu = () => {
  return (
    <>
      <div className="logo" style={{ color: "white" }}>
        <img src={`url(${process.env.PUBLIC_URL || ""}/assets/logo.jpg)`} alt="Schubert"/>
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
