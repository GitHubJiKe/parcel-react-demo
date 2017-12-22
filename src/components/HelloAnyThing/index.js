import React from 'react';
import styled from 'styled-components';
import img from '../../assets/Sakyamuni.jpg';



const HelloAnyThing = styled.div`
  color:red;
  font-size:20pt;
`

const ImageView = () => <img src={`dist${img}`}></img>

export { HelloAnyThing, ImageView }