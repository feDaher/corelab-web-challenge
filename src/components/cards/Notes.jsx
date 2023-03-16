import styled from 'styled-components'
import { AiOutlineStar } from 'react-icons/ai'
import { MdOutlineEdit } from 'react-icons/md'
import MenuColor from './MenuColor'
import { TiDeleteOutline } from 'react-icons/ti'
import { useState } from 'react'
import { useSWRConfig } from 'swr'
import axios from 'axios'

const NotesContainer = styled.div`
  width: 390px;
  min-height: 400px;
  margin-bottom: 25px;
  background-color: ${({ color }) => color};
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  position: relative;
  z-index: 0;
  @media (max-width: 380px) {
    width: 300px;
  }
`

const ContainerStar = styled.div`
  float: right;
  margin: 15px 20px;
  cursor: pointer;
  color: ${({ isFavorite }) => (isFavorite ? 'gold' : '#455A64')};
  font-size: 22px;
`
const StyledBorder = styled.div`
  width: 390px;
  margin: 15px 0;
  height: 0px;
  border: 1px solid ${(props) => props.theme.border};
`

const ContainerSimbols = styled.div`
  margin-left: 30px;
  font-size: 20px;
  display: flex;
  color: ${(props) => props.theme.icons};
  position: absolute;
  bottom: 0;
  transform: translateY(-60%);
  gap: 15px;
`
const MenuSimbol = styled.div`
  cursor: pointer;
  font-size: 25px;
`
const MenuDelete = styled.div`
  margin-right: 20px;
  font-size: 25px;
  display: flex;
  color: ${(props) => props.theme.icons};
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 90%;
  transform: translateY(-60%);
`
const StyledTitle = styled.h4`
  color: ${(props) => props.theme.black};
  margin: 15px 0px 0 25px;
`
const StyledText = styled.p`
  color: ${(props) => props.theme.black};
  font-size: 13px;
  line-height: 16px;
  padding: 5px 25px;
  text-align: justify;
`
const NewTitle = styled.input`
  width: 300px;
  margin-left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => props.theme.black};
  background-color: transparent;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #333333;
    font-size: 14px;
    font-weight: bold;
  }
`
const NewText = styled.textarea`
  width: 305px;
  min-height: 300px;
  resize: none;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.black};
  font-size: 13px;
  line-height: 16px;
  padding: 5px 25px 0 5px;
  text-align: justify;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 13px;
    color: ${(props) => props.theme.input};
  }
`
const NewButton = styled.button`
  padding: 5px 10px;
  display: flex;
  float: right;
  border: solid 1px grey;
  background-color: transparent;
  cursor: pointer;
  margin-bottom: 50px;
  margin-right: 20px;
  font-family: 'Inter';
`
const FavoriteStar = styled(AiOutlineStar)`
  color: ${({ isFavorite }) => (isFavorite ? 'gold' : 'inherit')};
`
const StyledEditIcon = styled(MdOutlineEdit)`
  background-color: ${({ isEditing }) => (isEditing ? '#FFE3B3' : 'inherit')};
  border-radius: ${({ isEditing }) => (isEditing ? '40px' : 'inherit')};
`

function Notes({ title, text, id, isFavorite, onFavorite, color }) {
  const { mutate } = useSWRConfig()
  const [editNote, setEditNote] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newText, setNewText] = useState(text)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedColor, setSelectedColor] = useState(color || '#FFFFFF')

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
        data: {
          id
        }
      })
      if (response.status === 200) mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = async () => {
    setNewTitle(title)
    setNewText(text)
    setEditNote(true)
    setIsEditing(!isEditing)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsEditing(false)
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, {
        id,
        title: newTitle,
        text: newText
      })
      if (response.status === 200) {
        setEditNote(false)
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleFavoriteClick = () => {
    onFavorite()
  }

  return (
    <>
      <NotesContainer color={selectedColor}>
        <ContainerStar>
          <FavoriteStar onClick={handleFavoriteClick} isFavorite={isFavorite}></FavoriteStar>
        </ContainerStar>
        <StyledTitle>
          {!editNote && title}
          {editNote && (
            <NewTitle
              id={id}
              text={title}
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
            />
          )}
        </StyledTitle>
        <StyledBorder />
        <StyledText>
          {!editNote && text}
          {editNote && (
            <NewText
              id={id}
              text={text}
              value={newText}
              onChange={(event) => setNewText(event.target.value)}
            />
          )}
        </StyledText>
        <ContainerSimbols>
          <MenuSimbol>
            <StyledEditIcon onClick={() => handleEdit()} isEditing={isEditing} />
          </MenuSimbol>
          <MenuSimbol>
            <MenuColor id={id} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </MenuSimbol>
        </ContainerSimbols>
        <MenuDelete>
          <TiDeleteOutline onClick={() => handleDelete(id.id)} />
        </MenuDelete>
        {editNote && (
          <form onSubmit={handleSubmit}>
            <NewButton type="submit">Salvar</NewButton>
          </form>
        )}
      </NotesContainer>
    </>
  )
}

export default Notes
