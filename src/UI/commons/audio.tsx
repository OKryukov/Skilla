import { FC, useRef, useState } from 'react'
import styled from "styled-components"
import { AudioCloseSVG, AudioDownloadSVG, AudioPlaySVG, AudioStopSVG } from './svgStorage'
import mp3 from '../../BLL/audio/ShutYourMouth.mp3'


const AudioStyled = styled.div.attrs({className:'audio'})`
  width: 352px;
  height: 48px;
  border-radius: 48px;
  background-color: #EAF0FA;
  padding: 0 20px;
  color: #122945;
  font-family: 'SFProDisplay';
  font-size: 15px;
  font-weight: 400;
  display: flex;
  align-items: center;
  display: none;
  .audio__time{
    width: 36px;
    margin-right: 12px;
  }
  .audio__stop{
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .audio__line{
    width: 164px;
    height: 4px;
    border-radius: 50px;
    background-color: #ADBFDF;
    margin: 0 12px 0 8px;
  }
  .audio__download, .audio__close{
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover path{
      fill: #002CFB;
    }
  }
  .audio__close{
    margin-left: 12px;
  }
`

export const Audio:FC<{duration:string|null}> = (props)=>{
  const [isPlay, setIsplay] = useState<boolean>(false)
  let [duration, setDuration] = useState<string>()
  const audioItem = useRef<any>()
  const playHandler = ()=>{
    setIsplay(isPlay?false:true)
    isPlay?audioItem.current.pause():audioItem.current.play()
  }
  const timeUpdateHandler = ()=>{
    let date = new Date(audioItem.current.currentTime * 1000)
    setDuration(date.getMinutes()+':'+date.getSeconds())
  }
  return(
    <AudioStyled>
      <audio src={mp3} ref={audioItem} onTimeUpdate={timeUpdateHandler}></audio>
      <div className="audio__time">{duration}</div>
      <div className="audio__stop" onClick={playHandler}>{isPlay?<AudioStopSVG/>:<AudioPlaySVG/>}</div>
      <div className="audio__line"></div>
      <div className="audio__download"><AudioDownloadSVG/></div>
      <div className="audio__close"><AudioCloseSVG/></div>
    </AudioStyled>
  )
}