import styled from 'styled-components'
import { AiOutlineStar } from 'react-icons/ai'
import axios from 'axios'
import { useState, useEffect } from 'react'
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
  background: #FFFFFF;
  border: 1px solid #D9D9D9;
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
  :focus{
    outline: none;
  }
`
const StyledStar = styled.div`
  display: flex;
  float: right;
  margin: 15px;
  color: #455A64;
  font-size: 22px;
`

const StyledBorder = styled.div`
  width: 528px;
  height: 0px;
  left: 443.3px;
  top: 121.79px;
  border: 1px solid #D9D9D9;
  @media (max-width: 770px) {
    left: 25%;
    max-width: 400px;
  }
  @media (max-width: 545px) {
    left: 15%;
    max-width: 350px;
    border-radius: 25px;
  }
`
const CreateNotesInput = styled.input`
  width: 480px;
  line-height: 30px;
  min-height: 60px;
  margin-left: 20px;
  font-size: 13px;
  color: #50656E;
  background-color: transparent;
  border: none;
  :focus{
    outline: none;
  }
`

function Container () {
  const { mutate } = useSWRConfig()
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleForm = async (event) => { 
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
        title: title,
        text: text
      })
      if (response.status === 200){
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
        setFormSubmitted(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (formSubmitted) {
      setTitle('');
      setText('');
      setFormSubmitted(false);
    }
  }, [formSubmitted]);
  console.log(formSubmitted)
  return (
    <>
      <StyledDiv>
        <StyledContainer>
          <form onSubmit={handleForm}>
            <StyledInputTitle placeholder='Título' 
              value={title}
              onChange={({ target }) => {setTitle(target.value)}}
            />
              <StyledStar>
                <AiOutlineStar />
              </StyledStar>
              <StyledBorder />
              <CreateNotesInput
              placeholder='Criar nota...'
              value={text}
              onChange={({ target }) => {setText(target.value)}}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  handleForm(event)
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