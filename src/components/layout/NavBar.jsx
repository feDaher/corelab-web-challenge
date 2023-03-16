import styled from 'styled-components'

const StyledSpan = styled.span`
  position: absolute;
  line-height: 57px;
  margin-left: 100px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.star};
`
const StyledImg = styled.div`
  background-image: url('/img.png');
  background-repeat: no-repeat;
  background-size: 30px;
  position: absolute;
  width: 30px;
  height: 36px;
  margin: 10px 50px;
`

function NavBar() {
  return (
    <>
      <StyledImg />
      <StyledSpan>CoreNotes</StyledSpan>
    </>
  )
}

export default NavBar
