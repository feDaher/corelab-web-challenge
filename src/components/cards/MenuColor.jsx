import { RiPaintFill } from 'react-icons/ri'
import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const StyledEditColor = styled(RiPaintFill)`
  background-color: ${({ color }) => (color ? '#FFE3B3' : 'inherit')};
  border-radius: ${({ color }) => (color ? '40px' : 'inherit')};
`
const StyledMenu = styled.div`
  width: 430px;
  height: 45px;
  position: absolute;
  background: ${(props) => props.theme.components};
  border: 1px solid #d9d9d9;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  transform: translateX(-20%);
  @media (max-width: 745px) {
    width: 220px;
    height: 80px;
    transform: translateY(-10%);
  }
`
const StyledContainerMenu = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`
const StyledOption = styled.div`
  position: absolute;
  display: flex;
  margin: 7px;
  gap: 5px;
  flex-wrap: wrap;
  z-index: 2;
  @media (max-width: 745px) {
  }
`
const OptionColor = styled.div`
  border-radius: 50px;
  background-color: ${({ color }) => color};
  padding: 15px;
  cursor: pointer;
`

const MenuColor = ({ setSelectedColor }) => {
  const [color, setColor] = useState(false)
  const [show, setShow] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setShow(false)
      setColor(false)
    }
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [menuRef])

  const handleEditColor = () => {
    setColor(!color)
    setShow(!show)
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color)
  }

  return (
    <StyledContainerMenu>
      <StyledEditColor
        onClick={handleEditColor}
        color={color}
        ref={menuRef}
        onBlur={() => setColor(false)}
      />
      <StyledMenu show={show} ref={menuRef} onBlur={() => setShow(false)}>
        <StyledOption>
          <OptionColor color="#BAE2FF" onClick={() => handleColorSelect('#BAE2FF')} />
          <OptionColor color="#B9FFDD" onClick={() => handleColorSelect('#B9FFDD')} />
          <OptionColor color="#FFE8AC" onClick={() => handleColorSelect('#FFE8AC')} />
          <OptionColor color="#FFCAB9" onClick={() => handleColorSelect('#FFCAB9')} />
          <OptionColor color="#F99494" onClick={() => handleColorSelect('#F99494')} />
          <OptionColor color="#9DD6FF" onClick={() => handleColorSelect('#9DD6FF')} />
          <OptionColor color="#ECA2FF" onClick={() => handleColorSelect('#ECA2FF')} />
          <OptionColor color="#DAFF8B" onClick={() => handleColorSelect('#DAFF8B')} />
          <OptionColor color="#FFA285" onClick={() => handleColorSelect('#FFA285')} />
          <OptionColor color="#CDCDCD" onClick={() => handleColorSelect('#CDCDCD')} />
          <OptionColor color="#979797" onClick={() => handleColorSelect('#979797')} />
          <OptionColor color="#A99A7C" onClick={() => handleColorSelect('#A99A7C')} />
        </StyledOption>
      </StyledMenu>
    </StyledContainerMenu>
  )
}

export default MenuColor
