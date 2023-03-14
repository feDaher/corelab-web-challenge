import styled from "styled-components"

const StyledCreateNotes = styled.input`
  resize: none ;
  width: 480px;
  line-height: 20px;
  min-height: 60px;
  margin-left: 20px;
  margin-top: 15px;
  font-size: 13px;
  color: #50656E;
  background-color: transparent;
  border: none;
  :focus{
    outline: none;
  }
`

function Input () {
  return (
    <StyledCreateNotes placeholder='Criar nota...' />
  )
}

export default Input