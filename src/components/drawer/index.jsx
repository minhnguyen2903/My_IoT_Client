import styled, { css } from 'styled-components';
import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dashboard from '@mui/icons-material/Dashboard';
import SsidChart from '@mui/icons-material/SsidChart';
import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import { useSelector } from 'react-redux';

const DrawerNavStyled = styled.div`
    position: relative;
    height: 100%;
    min-width: 300px;
    width: 300px;
    padding: 62px 0;
    padding-left: 5px;
    z-index: 1;
`

const TransitionActive = styled.div`
  position: absolute;
  left: 5px;
  width: 100%;
  top: ${(props) => props.active * 62}px;
  height: 62px;
  background: white;
  transition: top 0.2s ease-in-out;
  border-radius: 10px 0 0 10px;
  &:after {
    content: '';
    position: absolute;
    right: 5px;
    top: -10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1976D2;
    box-shadow: 5px 5px 0 0px white;
  }
  &:before {
    content: '';
    position: absolute;
    right: 5px;
    bottom: -10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #1976D2;
    box-shadow: 5px -5px 0 0px white;
  }
`

const nav = [{
  index: 1,
  name: 'Bảng điều khiển',
  path: '/',
  icon: <Dashboard />
}, {
  index: 2,
  name: 'Biều đồ',
  path: '/chart',
  icon: <SsidChart />
}]

const DrawerNav = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const drawer = useSelector(state => state.drawer);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Collapse orientation="horizontal" in={drawer.open}>
      <DrawerNavStyled>
        <TransitionActive active={props.active} />
        <List
          sx={{ width: '100%', maxWidth: 300, padding: 0 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {nav.map(item => (
            <ListItemButton key={item.index} sx={{ padding: '15px' }} onClick={() => {
              navigate(item.path, { replace: true });
            }}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <Typography variant='h6' component='h5'>
                {item.name}
              </Typography>
            </ListItemButton>
          ))
          }
        </List>
        <Outlet />
      </DrawerNavStyled>
    </Collapse>

  )
}

export default DrawerNav;