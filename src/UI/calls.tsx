import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { v1 } from 'uuid'
import { BadlySVG, BalanceSVG, FallIncomingSVG, FallOutgoingSVG, FineSVG, GreatSVG, IncomingSVG, LeftSVG, OutgoingSVG, RightSVG, SearchSVG, СalendarSVG} from './commons/svgStorage'
import { actionCreators } from '../BLL/callsReducer'
import { StateTape } from '../BLL/store'
import { More } from './commons/more'
import { Audio } from './commons/audio'

const CallsStyled = styled.main`
grid-area: main;
background-color: var(--bg-color-main);
font-family: 'SFProDisplay';
.unclear{
  height: 80px;
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: flex-end;
  .balance{
    display: inline-grid;
    grid-template-columns: max-content 24px;
    align-items: center;
    grid-gap: 10px;
    height: 40px;
    padding: 0 12px;
    background-color: white;
    border-radius: 48px;
    .balance__text{
      color: #899CB1;
      font-size: 14px;
      .balance__value{
        color: #122945;
      }
    }
    .balance__add{
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover path{
        fill: #0024CB;
      }
    }
    &:hover{
      .balance__value{
        color: var(--color-blue);
      }
    }
  }
  .interval{
    display: flex;
    gap: 12px;
    .interval__value{
      display: flex;
      gap: 8px;
      color: #005FF8;
      cursor: pointer;
      &:hover path{
        fill: var(--color-blue);
      }
    }
    .interval__left, .interval__right{
      width: 16px;
      height: 24px;
      cursor: pointer;
      &:hover path{
        fill: var(--color-blue);
      }
    }
    .interval__right{
      text-align: right;
    }

  }

}
.filter{
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5E7793;
  font-size: 14px;
  .filter__search{
    display: grid;
    grid-template-columns: 16px max-content;
    grid-gap: 12px;
    align-items: center;
    cursor: pointer;
    &:hover{
      color: var(--color-blue);
      & path{
        fill: var(--color-blue);
      }
    }
  }
  .filter__filters{
    display: flex;
    gap: 32px;
    &>*{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    &>*:hover{
      color: var(--color-blue);
      & path{
        fill: var(--color-blue);
      }
    }
  }
}
.table{
  display: grid;
  grid-template-rows: 60px 1fr;
  font-family: 'SFProDisplay';
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 60px;
  .table__head{
    display: grid;
    grid-template-columns: minmax(25px, 54px) minmax(48px, 89px) minmax(76px, 128px) minmax(250px, 326px) 214px minmax(170px, 197px) 352px;
    align-items: center;
    color: #899CB1;
    font-size: 14px;
    font-weight: 400;
    padding: 0 40px;
    .duration{
      justify-self: end;
    }
  }
  .table__body{
    font-size: 15px;
    font-weight: 400;
    display: grid;
    grid-auto-rows: 64px;
    .table__row{
      display: grid;
      grid-template-columns: minmax(25px, 54px) minmax(48px, 89px) minmax(76px, 128px) minmax(250px, 326px) 214px minmax(170px, 197px) 352px;
      align-items: center;
      border-top: 1px solid #EAF0FA;
      cursor: pointer;
      color: #122945;
      padding: 0 40px;
      position: relative;
      .type{
        height: 24px;
        width: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .employee{
        display: grid;
        align-items: center;
        .employee__avatar{
          width: 32px;
          border-radius: 50%;
        }
      }
      .source{
        color: #5E7793;
      }
      .duration{
        justify-self: end;
      }
    }
    .table__row:hover{
      background-color: #d4dff32d;
      .duration{
        display: none;
      }
      .audio{
        display: flex;
      }
    }
  }
}
`

export const Calls:FC = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actionCreators.getCallsAsyncAC())
  },[])
  let list = useSelector((state:StateTape)=>state.calls.callsList)
  let duration = (sec:number)=>{
    let minutes = Math.trunc(sec/60);
    let seconds = sec % 60;
    if(sec === 0){
      return null
    }else if(seconds<10){
      return `${minutes}:0${seconds}`
    }else{
      return `${minutes}:${seconds}`
    }
    ;
  }
  const tableBody = list.map((call:any)=>{
    const random = ()=>{
      let rand = 1 - 0.5 + Math.random() * (2 - 0 + 1);
      return Math.round(rand);
    }
    const randomGrade = call.time===0?0:random()
    let time = duration(call.time)
    return(
      <div className='table__row' key={v1()}>
        <div className="type">{call.in_out===1?call.time===0?<FallOutgoingSVG/>:<OutgoingSVG/>:call.time===0?<FallIncomingSVG/>:<IncomingSVG/>}</div>
        <div className="time">{call.date.substring(11,16)}</div>
        <div className="employee">
          <img className="employee__avatar" src={call.person_avatar}/>
        </div>
        <div className="call">{call.in_out===1?call.from_number:call.to_number}</div>
        <div className="source">{call.source}</div>
        <div className="grade">{randomGrade===3?<GreatSVG/>:randomGrade===2?<FineSVG/>:randomGrade===1?<BadlySVG/>:''}</div>
        <Audio duration={time}/><div className="duration">{time}</div>
      </div>
    )
  })
  return(
    <CallsStyled>
      <div className="calls__container">
        <div className="calls__inner">
          <div className="unclear">
            <div className="balance">
              <span className="balance__text">Баланс: <span className='balance__value'>{272} Р</span></span>
              <div className="balance__add"><BalanceSVG/></div>
            </div>
            <div className="interval">
              <div className="interval__left"><LeftSVG/></div>
              <div className="interval__value">
                <div className="interval__calendar"><СalendarSVG/></div>
                <div className="interval__text">{'3 дня'}</div>
              </div>
              <div className="interval__right"><RightSVG/></div>
            </div>
          </div>
          <div className="filter">
            <div className="filter__search">
              <div className="filter__search_svg"><SearchSVG/></div>
              <div className="filter__search_text">Поиск по звонкам</div>
            </div>
            <div className="filter__filters">
              <div className="filter__allTypes">
                <div className="filter__text">Все типы</div>
                <div className="filter__burger"><More /></div>
              </div>
              <div className="filter__allEmployees">
                <div className="filter__text">Все сотрудники</div>
                <div className="filter__burger"><More /></div>
              </div>
              <div className="filter__allCalls">
                <div className="filter__text">Все звонки</div>
                <div className="filter__burger"><More /></div>
              </div>
              <div className="filter__allSource">
                <div className="filter__text">Все источники</div>
                <div className="filter__burger"><More /></div>
              </div>
              <div className="filter__allGrade">
                <div className="filter__text">Все оценки</div>
                <div className="filter__burger"><More /></div>
              </div>
              <div className="filter__allErrors">
                <div className="filter__text">Все ошибки</div>
                <div className="filter__burger"><More /></div>
              </div>
            </div>
          </div>
          <div className="table">
            <div className="table__head">
              <div className="type">Тип</div>
              <div className="time">Время</div>
              <div className="employee">Сотрудник</div>
              <div className="call">Звонок</div>
              <div className="source">Источник</div>
              <div className="grade">Оценка</div>
              <div className="duration">Длительность</div>
            </div>
            <div className="table__body">
              {tableBody}
            </div>
          </div>
        </div>
      </div>
    </CallsStyled>
  )
}