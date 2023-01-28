import React from 'react';
import  { useMemo } from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import moment from 'moment';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../hooks/useBombStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../hooks/useBombFinance';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import { useWallet } from 'use-wallet';
import useEarnings from '../../hooks/useEarnings';
import Show from './components/Show';
import BondDash from './components/BondDash';
import HomeImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';
import img1 from '../../assets/img/bomb-bitcoin-LP.png';
import img2 from '../../assets/img/bshare-bnb-LP.png';
import img3 from '../../assets/img/bbond.png';
import img4 from '../../assets/img/bshares.png';
import meta from '../../assets/img/metamask-fox.svg';

// const BackgroundImage = createGlobalStyle`
//   body {
//     background: url(${HomeImage}) repeat !important;
//     background-size: cover !important;
//     background-color: #171923;
//   }
// `;

const Dashboard = () => {

    const { to } = useTreasuryAllocationTimes();
    const currentEpoch = useCurrentEpoch();
    const bombFinance = useBombFinance();
    const stakedBalance = useStakedBalanceOnBoardroom();
    

    
     const earnings = useEarningsOnBoardroom();
  const bombStats = useBombStats();
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const tokenPriceInDollars = React.useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  //apr 
  const boardroomAPR = useFetchBoardroomAPR();

    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const bombPriceInDollars = useMemo(
      () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
      [bombStats],
    );
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
  
    //sshare
    const bShareStats = usebShareStats();
    const tBondStats = useBondStats();
  
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
    const bShareCirculatingSupply = useMemo(
      () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
      [bShareStats],
    );
  
    const bSharePriceInDollars = useMemo(
      () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
      [bShareStats],
    );
    const bSharePriceInBNB = useMemo(
      () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
      [bShareStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const tBondCirculatingSupply = useMemo(
      () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
      [tBondStats],
    );

    
    const bank = useBank('BombBtcbLPBShareRewardPool');
   

  return (
    <>
      <div className={'dashboard_invest'}>
        <div className="bomb-summary">
          <div className="head-top">
            <h2>Bomb Finance Summary</h2>
          </div>
          <div className="header-div"></div>
          <div className="summary">
            <div className="summary-table">
            <table>
                <tr>
                  <th></th>
                  <th>Current Supply</th>
                  <th>Total Supply</th>
                  <th>Price </th>
                  <th></th>
                </tr>
                <tr>
                <td className="td1">
                    <img src={meta} />
                    <span>$BOMB</span>
                  </td>
                  <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                  <td> {roundAndFormatNumber(bombTotalSupply, 2)}</td>
                  <td>
                    <div>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}</div>{' '}
                    <div>{bombPriceInBNB ? bombPriceInBNB : '-.----'} BTC</div>
                  </td>
                  <td>
                    <img src={meta} />
                  </td>
                </tr>
                <tr>
                  <td className="td1">
                    <img src={meta} />
                    <span>$BSHARE</span>
                  </td>
                  <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)} </td>
                  <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                  <td>
                    <div>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}</div>{' '}
                    <div>{bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB</div>
                  </td>
                  <td>
                    <img src={meta} />
                  </td>
                </tr>
                <tr>
                <td className="td1">
                    <img src={meta} />
                    <span>$BBOND</span>
                  </td>
                  <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                  <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                  <td>
                    <div>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}</div>{' '}
                    <div>{bSharePriceInBNB ? bSharePriceInBNB : '-.----'} BNB</div>
                  </td>
                  <td>
                    <img src={meta} />
                  </td>
                </tr>
              </table>
              </div>
            </div>

            <div className="left-summary">
            <div className="left-head">Current Epoch</div>
              <div className="bold-summary">{Number(currentEpoch)}</div>
              <div className="summary-clock">
                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              </div>

              <div className="left-head-next">Next Epoch in</div>
              <div className="left-status">
              <div>
                  Live TWAP: <span>1.17</span>
                  </div>
                <div>
                  TVL: <span>$5,002.412</span>
                  </div>
                <div>
                  Live TWAP: <span>1.22</span>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div className="invest-strategy">
          <div className="strategy-col">
            <div className="read_link">
              <Link to={''}>Read Investement Strategy</Link>
            </div>
            <div className="btn-invest">
              <p>Invest</p>
            </div>
            <div className="links-to">
              <div>Chat on Discord</div>
              <div>Read Doc</div>
            </div>
            <div className="board-room">
              <div className="head">
              <div className="head-img">
                  <img src={img4} />
                </div>
                <div className="info">
                  <div className="content">
                    <div className="head_content">
                      <h2>Boardroom</h2>
                      <div className="recommend">Recommended</div>
                    </div>
                    <div className="para">Stake BSHARE and earn BOMB every epoch</div>
                  </div>
                  <div className="TVL">TVL: $1,008,430</div>
                </div>
              </div>
              <div className="tot-stack">
                <div className="content">Total Staked:7232</div>
              </div>
              <div className="info-content">
                <div className="table">
                <table>
                    <tr>
                      <th>Daily Returns:</th>
                      <th>Your Stake:</th>
                      <th>Earned: </th>
                    </tr>
                    <tr>
                      <td>{boardroomAPR.toFixed(2)}%</td>
                      <td>{`${getDisplayBalance(stakedBalance)}`}</td>
                      <td>{getDisplayBalance(earnings)}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{`≈$${tokenPriceInDollars}`}</td>
                      <td>{`≈$${earnedInDollars}`}</td>
                    </tr>
                  </table>
                </div>
                <div className="tags">
                <div className='tag-top'>
                    <button>Deposit</button>
                    <button>Withdraw</button>
                  </div>
                  <button>Clain Rewards</button>
                </div>
              </div>
            </div>
          </div>
          <div className="news">
            <h2>Latest News</h2>
          </div>
        </div>
 {bank ? (
          <div className="bomb-farm">
            <div className="head">
              <div className="content">
                <h2>Bomb Farms</h2>
                <p>Stake your LP tokens in our farms to start earning $BSHARE</p>
              </div>
              <div className="claim">Claim all</div>
            </div>
            <Show img={img1} id={'BombBtcbLPBShareRewardPool'} />
            <Show img={img2} id={'BshareBnbLPBShareRewardPool'} />
          </div>
        ) : (
          <></>
        )}
        <div className="bonds-container-invest">
          <div className="head-show">
            <div className="head-img-show">
              <img src={img3} />
            </div>
            <div className="info-show">
              <div className="content-show">
                <div className="head_content-show">
                  <h2>Boardroom</h2>
                </div>
                <p>BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</p>
              </div>
            </div>
          </div>
          <BondDash/>
        </div>
    
    </>
  );
};


export default Dashboard;