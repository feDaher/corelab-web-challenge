import styled from 'styled-components'
import NavBar from '../src/components/layout/NavBar'
import Container from '../src/components/layout/Container'
import Notes from '../src/components/cards/Notes'
import InputFilter from '../src/components/inputs/InputFilter'
import colorNameList from 'color-name-list'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const NotesFavorites = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 30px;
  position: relative;
  align-items: flex-end;
  margin-top: 50px;
  gap: 30px;
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    gap: 20px;
  }
  @media (max-width: 850px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`
const NotesNotFavorites = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px 30px;
  position: relative;
  align-items: flex-end;
  margin-top: 50px;
  gap: 30px;
`
const StyledDiv = styled.div`
  display: flex;
  width: 100vw;
  background: ${(props) => props.theme.components};
  box-shadow: 0px 1px 7px rgba(149, 149, 149, 0.25);
`
const StyleFavorite = styled.span`
  margin-left: 30px;
  margin-top: 30px;
  font-size: 14px;
  font-weight: bold;
`
const StyleNotFavorite = styled.span`
  margin-left: 30px;
  margin-top: 30px;
  font-size: 14px;
  font-weight: bold;
`
const fetcher = (url) => axios.get(url).then((res) => res.data)

function HomePage() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, fetcher)
  const [filteredNotes, setFilteredNotes] = useState([])
  const [notes, setNotes] = useState([])
  const [isFavorite, setIsFavorite] = useState([])
  const favoritesRef = useRef(null)

  useEffect(() => {
    if (data) {
      setNotes(data)
      setFilteredNotes(data)
    }
  }, [data])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase()
    setFilteredNotes(filterValue)
    let filtered = notes.filter((item) => {
      const itemColor = item.color.toLocaleLowerCase() || ''
      const hexColor = /^#[0-9A-F]{6}$/i.test(itemColor) ? itemColor : ''
      const colorName = colorNameList.find((c) => c.hex === hexColor)?.name || ''

      return (
        item.title?.toLowerCase().includes(filterValue) ||
        item.text?.toLowerCase().includes(filterValue) ||
        itemColor.toLowerCase().includes(filterValue) ||
        colorName.toLowerCase().includes(filterValue)
      )
    })
    setFilteredNotes(filtered)
  }

  const handleFavorite = (id) => {
    setIsFavorite((prevIsFavorite) => [...prevIsFavorite, id])
    favoritesRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  const handleDeleteFavorite = (id) => {
    setIsFavorite((prevIsFavorite) => prevIsFavorite.filter((element) => element !== id))
    favoritesRef.current.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <>
      <StyledDiv>
        <NavBar />
        <InputFilter type="text" name="search" onChange={handleFilterChange} />
      </StyledDiv>
      <Container />
      <StyleFavorite ref={favoritesRef}>Favoritas:</StyleFavorite>
      <NotesFavorites>
        {filteredNotes
          ?.filter(({ _id }) => isFavorite.find((id) => id === _id))
          .map((note) => (
            <Notes
              key={note._id}
              id={note._id}
              title={note.title}
              text={note.text}
              color={note.color}
              onFavorite={() => {
                handleDeleteFavorite(note._id)
              }}
              isFavorite
            />
          ))}
      </NotesFavorites>
      <StyleNotFavorite>Outras:</StyleNotFavorite>
      <NotesNotFavorites>
        {filteredNotes
          ?.filter(({ _id }) => !isFavorite.find((id) => id === _id))
          .map((note) => (
            <Notes
              key={note._id}
              id={note._id}
              title={note.title}
              text={note.text}
              color={note.color}
              onFavorite={() => {
                handleFavorite(note._id)
              }}
            />
          ))}
      </NotesNotFavorites>
    </>
  )
}

export default HomePage
