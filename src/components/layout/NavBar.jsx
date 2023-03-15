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
  background-image: url('https://s3-alpha-sig.figma.com/img/0668/b1c8/1b27213540f22b3bda3ab0125bf1fd2f?Expires=1679270400&Signature=HBtWiEygugqaJNTI6ymG5fszaIzzjVWzQ2oCk9MQ9XoAyv5ArFsEiq0E5nk~UR9AM0TnR92VXhn4j~FKrh1VuN-W~cYGq52XN146~~asGoPy~x0SUGIHCL65Xbjca1D67W7QqEERlTl87~fcdSr~CT-ojCoIYwG~Ja41pKQAm1qjZI2ent1AGH~7xeu~FhMeqoY5NmArvhqOZ~bPm11T8ohOOF31xt446F7vmyU1DPkq8N5v0eECZBe1z~Bb0my1Fa1gR3Gqa7DG-e40jeo74VRmC7QMecghOM45W~Ew01MJBLGQ80rdYkdYCzKG1QatALWVHMjHWIvUl3sdQdwIsQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 30px;
  position: absolute;
  width: 30px;
  height: 36.31px;
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
