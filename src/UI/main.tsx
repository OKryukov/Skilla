import {FC} from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import { Calls } from './calls/calls'
import { Plug } from './plug'


const MainStyled = styled.main`
  grid-area: main;
  background-color: var(--bg-color-main);
  overflow-y: scroll;
  position: relative;
  z-index: 1;
`

export const Main:FC = ()=>{
  return(
    <MainStyled>
      <Routes>
        <Route path='/results' element={<Plug/>}/>
        <Route path='/orders' element={<Plug/>}/>
        <Route path='/messages' element={<Plug/>}/>
        <Route path='/calls' element={<Calls/>}/>
        <Route path='/counterparties' element={<Plug/>}/>
        <Route path='/documentation' element={<Plug/>}/>
        <Route path='/performers' element={<Plug/>}/>
        <Route path='/reports' element={<Plug/>}/>
        <Route path='/knowledgeBase' element={<Plug/>}/>
        <Route path='/settings' element={<Plug/>}/>
      </Routes>
    </MainStyled>
  )
}