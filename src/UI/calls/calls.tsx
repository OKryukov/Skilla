import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AudioCloseSVG, BadlySVG, BalanceSVG, FineSVG, GreatSVG, LeftSVG, RightSVG, SearchSVG, СalendarSVG} from '../commons/svgStorage'
import { actionCreators } from '../../BLL/callsReducer'
import { More } from '../commons/more'
import avatar from '../../BLL/images/avatar.jpg'
import { Table } from './table'
import { StateTape } from '../../BLL/store'

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
  .filter__filters{
    display: flex;
    gap: 32px;
    overflow: visible;
    &>*{
      display: flex;
      align-items: center;
      cursor: pointer;
      padding-bottom: 12px;
      margin-top: 12px;
    }
    &>*:hover{
      color: var(--color-blue);
      & path{
        fill: var(--color-blue);
      }
    }
    .f-por{
      position: relative;
      overflow: visible;
      .f-abs{
        position: absolute;
        display: none;
        z-index: 3;
        right: 0;
        top: 36px;
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
          .item__avatar{
            width: 32px;
            border-radius: 50%;
          }
        }
        &>.title{
          color: #002efbdd;
        }
        &>*:not(.title):hover{
          background-color: #002efb21;
          color: #122945;
        }
      }
    }
    .f-por:hover{
      & .f-abs{
        display: block;
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
  let listCalls = useSelector((state:StateTape)=>state.calls.callsList)
  const [searchValue,setSearchValue] = useState('')
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const serchHandler = ()=>{
    setIsSearch(isSearch?false:true)
    setSearchValue('')
  }
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
                <input type='tel' value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}/>
                <div className="search"><SearchSVG/></div>
                <div className="close" onClick={serchHandler}><AudioCloseSVG/></div>
              </div>
            </div>
            <div className="filter__filters">
              <div className="allTypes f-por">
                <div className="allTypes__text">Все типы</div>
                <div className="allTypes__btn"><More /></div>
                <div className="allTypes__filter f-abs">
                <div className="title">Все типы</div>
                  <div className="item">Клиенты</div>
                  <div className="item">Новые клиенты</div>
                  <div className="item">Рабочие</div>
                  <div className="item">Приложение</div>
                </div>
              </div>
              <div className="allEmployees f-por">
                <div className="allEmployees__text">Все сотрудники</div>
                <div className="allEmployees__btn"><More /></div>
                <div className="allEmployees__filter f-abs">
                  <div className="title">Все сотрудники</div>
                  <div className="item">
                    <img src={avatar} className="item__avatar" />
                    <div className="item__name">Константин К.</div>
                  </div>
                  <div className="item">
                    <img src={avatar} className="item__avatar" />
                    <div className="item__name">Полина З.</div>
                  </div>
                </div>
              </div>
              <div className="allCalls f-por">
                <div className="allCalls__text">Все звонки</div>
                <div className="allCalls__btn"><More /></div>
                <div className="allCalls__filter f-abs">
                  <div className="title">Все звонки</div>
                  <div className="item">Новые клиенты</div>
                  <div className="item">Все исполнители</div>
                  <div className="item">Через приложение</div>
                  <div className="item">Прочие звонки</div>
                </div>
              </div>
              <div className="allSource f-por">
                <div className="allSource__text">Все источники</div>
                <div className="allSource__btn"><More /></div>
                <div className="allSource__filter f-abs">
                  <div className="title">Все источники</div>
                  <div className="item">С сайта</div>
                  <div className="item">Yandex номер</div>
                  <div className="item">Google номер</div>
                  <div className="item">Без источника</div>
                </div>
              </div>
              <div className="allGrade f-por">
                <div className="allGrade__text">Все оценки</div>
                <div className="allGrade__btn"><More /></div>
                <div className="allGrade__filter f-abs">
                  <div className="title">Все оценки</div>
                  <div className="item">Распознать</div>
                  <div className="item">Скрипт не использован</div>
                  <div className="item"><GreatSVG/></div>
                  <div className="item"><FineSVG/></div>
                  <div className="item"><BadlySVG/></div>
                </div>
              </div>
              <div className="allErrors f-por">
                <div className="allErrors__text">Все ошибки</div>
                <div className="allErrors__btn"><More /></div>
                <div className="allErrors__filter f-abs">
                  <div className="title">Все ошибки</div>
                  <div className="item">Приветствие</div>
                  <div className="item">Имя</div>
                  <div className="item">Цена</div>
                  <div className="item">Скидка</div>
                  <div className="item">Предзаказ</div>
                  <div className="item">Благодарность</div>
                  <div className="item">Стоп слова</div>
                </div>
              </div>
            </div>
          </div>
          <Table listCalls={listCalls}/>
        </div>
      </div>
    </CallsStyled>
  )
}