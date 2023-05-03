import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { BalanceSVG, LeftSVG, RightSVG, СalendarSVG} from '../commons/svgStorage'
import { Table } from './table'
import { Filters } from './filters'
import { Search } from './search'

const CallsStyled = styled.main`
.calls__inner{min-height: 100vh;}
grid-area: main;
background-color: var(--bg-color-main);
font-family: 'SFProDisplay';
.unclear{
  height: 80px;
  display: flex;
  gap: 48px;
  align-items: center;
  justify-content: flex-end;
  overflow: visible;
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
    position: relative;
    overflow: visible;
    display: flex;
    align-items: center;
    .interval__value{
      margin-top: 29px;
      padding-bottom: 29px;
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
    .interval__filter{
      position: absolute;
      display: none;
      z-index: 4;
      right: 0;
      top: 80px;
      width: 204px;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 0 26px 0 #e9edf3cc;
      &>*{
        height: 40px;
        padding-left: 20px;
        color: #899CB1;
        display: flex;
        gap: 8px;
        align-items: center;
        cursor: pointer;
      }
      &>.title{
          color: #002efbdd;
        }
      &>*:not(.title):hover{
        background-color: #002efb21;
        color: #122945;
      }
    }
    .interval__value:hover{
      .interval__filter{
        display: block;
      }
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
  overflow: visible;
}
`
export const Calls:FC<any> = (props:any)=>{
  const { defaultCallsList , getList, getEmployees} = props
  const [callsList, setCallsList] = useState(defaultCallsList)
  useEffect(()=>{
    setCallsList(defaultCallsList)
  },[defaultCallsList])
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
                <div className="interval__filter">
                  <div className="title">{'3 дня'}</div>
                  <div className="item">Неделя</div>
                  <div className="item">Месяц</div>
                  <div className="item">Год</div>
                  <div className="date">
                    <div className='date__title'>Указать даты</div>
                    <div className='date__input'>date__input</div>
                  </div>
                </div>
              </div>
              <div className="interval__right"><RightSVG/></div>
            </div>
          </div>
          <div className="filter">
            <Search defaultCallsList={defaultCallsList} setCallsList={setCallsList}/>
            <Filters getList={getList} getEmployees={getEmployees}/>
          </div>
          <Table listCalls={callsList}/>
        </div>
      </div>
    </CallsStyled>
  )
}