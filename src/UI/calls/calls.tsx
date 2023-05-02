import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AudioCloseSVG, BalanceSVG, LeftSVG, RightSVG, SearchSVG, СalendarSVG} from '../commons/svgStorage'
import { Table } from './table'
import { Filters } from './filters'

const CallsStyled = styled.main<{isSearchNumber:boolean}>`
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
  .filter__search{
    display: grid;
    grid-template-columns: 16px max-content;
    grid-gap: 12px;
    align-items: center;
    position: relative;
    overflow: visible;
    cursor: pointer;
    .search__input{
      position: absolute;
      display: ${({isSearchNumber})=>isSearchNumber?'blok':'none'};
      z-index: 3;
      border-radius: 48px;
      & input{
        width: 482px;
        height: 40px;
        border: 1px solid #EAF0FA;
        border-radius: 48px;
        outline: none;
        padding: 10px 46px;
        font-size: 14px;
        font-weight: 400;
        font-family: 'SFProDisplay';
        &:focus{
          border-color: #002CFB;
        }
      }
      & .close, .search{
        position: absolute;
        top: 0;
        z-index: 4;
        width: 46px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        & svg{
          width: 14px;
          height: 14px;
        }
      }
      & .close{
        right: 0px;
        &:hover path{
          fill: var(--color-blue);
        }
      }
      & .search{
        left: 0px;
      }
    }
    &:hover{
      color: var(--color-blue);
      &.search__svg path{
        fill: var(--color-blue);
      }
    }
    
  }
}

`
const filterCalls = (searchValue:any, list:any) => {
  if (!searchValue) {
    return list;
  }
  return list.filter((call:any) =>
    call.from_number.includes(searchValue)
  );
}
export const Calls:FC<any> = (props:any)=>{
  const {defaultCallsList} = props
  const [callsList, setCallsList] = useState(defaultCallsList)
  const [searchValue,setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const serchHandler = ()=>{
    setIsSearch(isSearch?false:true)
    setSearchValue('')
  }
  useEffect(()=>{
    setCallsList(defaultCallsList)
  },[defaultCallsList])
  useEffect(()=>{
    const filteredCalls = filterCalls(searchValue,defaultCallsList)
    setCallsList(filteredCalls)
  },[searchValue])
  return(
    <CallsStyled isSearchNumber={isSearch}>
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
            <div className="filter__search search">
              <div className="search__svg"onClick={serchHandler}><SearchSVG/></div>
              <div className="search__text"onClick={serchHandler}>Поиск по звонкам</div>
              <div className="search__input">
                <input type='number' value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
                <div className="search"><SearchSVG/></div>
                <div className="close" onClick={serchHandler}><AudioCloseSVG/></div>
              </div>
            </div>
            <Filters/>
          </div>
          <Table listCalls={callsList}/>
        </div>
      </div>
    </CallsStyled>
  )
}