import {FC} from 'react'
import styled from 'styled-components'
import mp3 from '../BLL/audio/ShutYourMouth.mp3'


const PlugStyled = styled.main`
  height: 100%;
  grid-area: main;
  background-color: var(--bg-color-main);
  display: grid;
  grid-gap: 32px;
  align-content: center;
  justify-items: center;
  font-family: 'SFProDisplay';
  font-weight: 500;
  .message{
    font-size: 64px;
  }
  .author{
    font-size: 32px;
    .author_link{
      color: #369089;
    }
  }
  .date{
    font-size: 32px;
  }
`

export const Plug:FC = ()=>{
  return(
    <PlugStyled>
      <div className='message'>Этот раздел находится в режиме разработки</div>
      <div className='author'>
        <span>Разработчик: </span>
        <a className='author_link' href='https://github.com/OKryukov' target='_blank'>Крюков Олег</a>
      </div>
      <div className='date'>От 28.04.2023</div>
      <audio controls>
        <source src={mp3} type="audio/mp3"/>
      </audio>
    </PlugStyled>
  )
}