import styled from 'styled-components'
import NavBar from '../src/components/layout/NavBar'
import Container from '../src/components/layout/Container'
import Notes from '../src/components/cards/Notes'
import InputFilter from '../src/components/inputs/InputFilter'

import { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const NotesContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin: 0px 30px;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 850px) {
    grid-template-columns: auto;
  }
`
const StyledDiv = styled.div`
  display: flex;
  width: 100vw;
  background: ${(props) => props.theme.components};
  box-shadow: 0px 1px 7px rgba(149, 149, 149, 0.25);
`

const fetcher = (url) => axios.get(url).then((res) => res.data)

function HomePage() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/notes`, fetcher)
  const [filteredNotes, setFilteredNotes] = useState([])
  const [notes, setNotes] = useState([])
  const [isFavorite, setIsFavorite] = useState([])

  useEffect(() => {
    if (data) {
      setNotes(data)
      setFilteredNotes(data)
    }
  }, [data])

  const handleFilterChange = (event) => {
    const filterValue = event.target.value.toLowerCase()
    const filtered = notes.filter(
      (item) =>
        item.title?.toLowerCase().includes(filterValue) ||
        item.text?.toLowerCase().includes(filterValue) ||
        item.color?.toLowerCase().includes(filterValue)
    )

    setFilteredNotes(filtered)
  }
  const handleFavorite = (id) => {
    setIsFavorite([...isFavorite, id])
  }
  const handleDeleteFavorite = (id) => {
    setIsFavorite(isFavorite.filter((element) => element !== id))
  }
  return (
    <>
      <StyledDiv>
        <NavBar />
        <InputFilter type="text" name="search" onChange={handleFilterChange} />
      </StyledDiv>
      <Container />
      <NotesContainer>
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
      </NotesContainer>
    </>
  )
}

export default HomePage
