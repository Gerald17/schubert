import React from 'react';
import { Drawer } from 'antd';

const MainDrawer = props => {
  const { placement, title, onClose, drawerStatus, destroyOnClose, height } = props;
  return (
    <Drawer
      title={title}
      placement={placement}
      closable={true}
      onClose={onClose}
      visible={drawerStatus}
      destroyOnClose={destroyOnClose}
      height={height}
    >
      {props.children}
    </Drawer>
   );
}
 
export default MainDrawer;