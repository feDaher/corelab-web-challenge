import styled from 'styled-components'
import { AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { useState } from 'react'
import { useSWRConfig } from 'swr'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledContainer = styled.div`
  max-width: 530px;
  background: ${(props) => props.theme.components};
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  margin-top: 40px;
  @media (max-width: 770px) {
    max-width: 400px;
    border-radius: 25px;
  }
  @media (max-width: 545px) {
    max-width: 350px;
    border-radius: 25px;
  }
  @media (max-width: 380px) {
    max-width: 300px;
    border-radius: 15px;
  }
`
const StyledInputTitle = styled.input`
  margin: 15px 0;
  margin-left: 20px;
  border: none;
  font-size: 14px;
  font-weight: bold;
  width: 250px;
  ::placeholder {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
  }
  :focus {
    outline: none;
  }
  @media (max-width: 380px) {
    width: 200px;
  }
`
const StyledStar = styled.div`
  display: flex;
  float: right;
  margin: 15px;
  color: ${(props) => props.theme.star};
  font-size: 22px;
  @media (max-width: 380px) {
    margin-top: 15px;
  }
`

const StyledBorder = styled.div`
  width: 528px;
  height: 0px;
  left: 443.3px;
  top: 121.79px;
  border: 1px solid ${(props) => props.theme.border};
  @media (max-width: 770px) {
    left: 25%;
    max-width: 400px;
  }
  @media (max-width: 545px) {
    left: 15%;
    max-width: 350px;
    border-radius: 25px;
  }
  @media (max-width: 380px) {
    max-width: 300px;
  }
`
const CreateNotesInput = styled.input`
  width: 480px;
  line-height: 30px;
  min-height: 60px;
  margin-left: 20px;
  font-size: 13px;
  color: ${(props) => props.theme.input};
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
  @media (max-width: 380px) {
    max-height: 50px;
  }
`

const ColorInput = styled.input`
  display: none;
  width: 480px;
  line-height: 30px;
  min-height: 60px;
  margin-left: 20px;
  font-size: 13px;
  color: ${(props) => props.theme.input};
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
`
const SpanError = styled.span`
  font-size: 12px;
  color: red;
  margin: 3px 15px;
  position: absolute;
  bottom: 0;
`

function Container() {
  const { mutate } = useSWRConfig()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [color, setColor] = useState('#ffffff')
  const [error, setError] = useState('')

  const handleForm = async (event) => {
    event.preventDefault()

    if (title.trim() === '' || text.trim() === '') {
      setError('Por favor, preencha os campos de título e texto.')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
        title: title,
        text: text,
        color: color
      })
      if (response.status === 200) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
        setFormSubmitted(true)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const resetForm = () => {
    setTitle('')
    setText('')
  }

  return (
    <>
      <StyledDiv>
        <StyledContainer>
          <form onSubmit={handleForm}>
            <StyledInputTitle
              placeholder="Título"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value)
                setError('')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleForm(event)
                  resetForm()
                }
              }}
            />
            <StyledStar>
              <AiOutlineStar />
            </StyledStar>
            <StyledBorder />
            <ColorInput
              placeholder="cor padrao"
              value={color}
              onChange={({ target }) => {
                setColor(target.value)
              }}
            />
            <SpanError>{error}</SpanError>
            <CreateNotesInput
              placeholder="Criar nota..."
              key={formSubmitted}
              value={text}
              onChange={({ target }) => {
                setText(target.value)
                setError('')
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleForm(event)
                  resetForm()
                }
              }}
            />
          </form>
        </StyledContainer>
      </StyledDiv>
    </>
  )
}

export default Container
