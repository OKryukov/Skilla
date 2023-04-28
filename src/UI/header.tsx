import {FC} from 'react'
import styled from 'styled-components'
import { SearchSVG } from './commons/svgStorage'
import { useSelector } from 'react-redux'
import { StateTape } from '../BLL/store'
import { More } from './commons/more'


const HeaderStyled = styled.header`
  grid-area: header;
  background-color: var(--bg-color-header);
  .header__container{
    height: 100%;
  }
  .header__inner{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'SFProDisplay';
  }
  .header__left{
    display: flex;
    .date{
      width: 176px;
      color: #899CB1;
      font-size: 15px;
      font-weight: 400;
      margin: auto 0;
    }
    .indicators{
      display: grid;
      grid-template-columns: repeat(3, 164px);
      grid-gap: 56px;
      .indicator__text{
        font-size: 14px;
        font-weight: 400;
        .indicator__text_green{
          color: var(--color-green);
        }
        .indicator__text_yellow{
          color: var(--color-yellow);
        }
        .indicator__text_red{
          color: var(--color-red);
        }
      }
      .indicator{
        display: grid;
        grid-gap: 7px;
        .indicator__progress{
        width: 156px;
        height: 6px;
        border-radius: 12px;
        }
        .indicator__progress::-webkit-progress-bar{
          background-color: #DEE6F5;
        }
        .indicator__progress_green::-webkit-progress-value{
          background-color: var(--color-green);
        }
        .indicator__progress_yellow::-webkit-progress-value{
          background-color: var(--color-yellow);
        }
        .indicator__progress_red::-webkit-progress-value{
          background-color: var(--color-red);
        }
      }
    }
  }
  .header__right{
    display: flex;
    justify-content: space-between;
    width: 487px;
    .search{
      align-self: center;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .user{
      display: flex;
      .client{
        display: grid;
        grid-template-columns: max-content 24px;
        grid-gap: 10px;
        align-items: center;
        .client__name{
          font-size: 15px;
          font-weight: 400;
          color: #899CB1;
        }
      }
      .avatar{
        display: grid;
        grid-template-columns: 40px 24px;
        grid-gap: 4px;
        align-items: center;
        margin-left: 47px;
        .avatar__img{
          border-radius: 50%;
        }
      }
    }
  }
`

export const Header:FC = ()=>{
  const state = useSelector((state:StateTape)=>state.header)
  return(
    <HeaderStyled>
      <div className="header__container">
        <div className="header__inner">
          <div className="header__left">
            <div className="date">
              <span className='date__day'>Среда</span>
              <span className='date__day'>, </span>
              <span className='date__date'>13 окт</span>
            </div>
            <div className="indicators">
              <div className="indicator newCalls">
                <div className="indicator__text">Новые звонки<span className="indicator__text_green"> 20 из 30 шт</span></div>
                <progress className="indicator__progress indicator__progress_green" max={100} value={43}></progress>
              </div>
              <div className="indicator quality">
                <div className="indicator__text">Качество разговоров<span className="indicator__text_yellow"> 40%</span></div>
                <progress className="indicator__progress indicator__progress_yellow" max={100} value={30}></progress>
              </div>
              <div className="indicator conversion">
                <div className="indicator__text">Конверсия в заказ<span className="indicator__text_red"> 67%</span></div>
                <progress className="indicator__progress indicator__progress_red" max={100} value={60}></progress>
              </div>
            </div>
          </div>
          <div className="header__right">
            <div className="search"><SearchSVG /></div>
            <div className="user">
              <div className="client">
                <div className="client__name">{state.name}</div>
                <div className="client__more"><More /></div>
              </div>
              <div className="avatar">
                <img className="avatar__img" src={state.avatar} />
                <div className="avatar__more"><More /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderStyled>
  )
}