import styled from 'styled-components'

const StyledInput = styled.input`
  box-sizing: border-box;
  max-width: 530px;
  margin: 12px 200px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
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
  background-image: url('https://img.freepik.com/vetores-premium/icone-de-pesquisa-simbolo-da-lupa-icone-de-contorno_543062-139.jpg?w=740');
  background-position: right;
  background-repeat: no-repeat;
  background-size: 18px;

  @media (max-width: 700px) {
    max-width: 300px;
    padding-right: 30px;
    ::placeholder {
      font-size: 10px;
    }
  }
`

function InputFilter(props) {
  return <StyledInput {...props} placeholder="Pesquisar notas" />
}

export default InputFilter
