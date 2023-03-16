import styled from 'styled-components'

const StyledInput = styled.input`
  box-sizing: border-box;
  width: 530px;
  margin: 12px 200px;
  background: ${(props) => props.theme.components};
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  padding: 8px 250px 8px 10px;
  font-size: 12px;
  ::placeholder {
    color: #9a9a9a;
    font-size: 9px;
  }
  :focus {
    outline: none;
  }
  background-image: url('/icon.png');
  background-position: 98%;
  background-repeat: no-repeat;
  background-size: 18px;

  @media (max-width: 700px) {
    max-width: 700px;
    padding-right: 30px;
    ::placeholder {
      font-size: 10px;
    }
  }
  @media (max-width: 400px) {
    max-width: 150px;
    padding-right: 5px;
    ::placeholder {
      font-size: 10px;
    }
  }
  @media (max-width: 350px) {
    max-width: 100px;
    padding-right: 5px;
    ::placeholder {
      font-size: 9px;
    }
  }
`

function InputFilter(props) {
  return <StyledInput {...props} placeholder="Pesquisar notas" />
}

export default InputFilter
