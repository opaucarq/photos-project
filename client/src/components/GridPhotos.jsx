import styled from "@emotion/styled";
import GridPhoto from "./GridPhoto";

const Grid = styled.div`
  display: grid;
  background: red;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
`


const GridPhotos = ({data}) => {
  return (
    <Grid>
      {data.length > 0 ? (
        data.map((post, index) => (
          <div key={index}>              
            <GridPhoto post={post.images}/>
          </div>
        ))
        ) : (
          <p>No images to display.</p>
          )}
    </Grid>
  )
}

export default GridPhotos