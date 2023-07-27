import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const Card = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  &:hover{
    filter: brightness(50%);
    cursor: pointer;
  }
`


const GridPhoto = ({post}) => {
  const [indexPhoto, setIndexPhoto] = useState(0);



  useEffect(()=>{
    const interval = setInterval(()=>{
      setIndexPhoto((value)=>(value+1) % post.length);
    },3000)
    return () => clearInterval(interval);
  })

  return (
    <>
     
      <Card src={post[indexPhoto]}/>

    </>
  );
}

export default GridPhoto;