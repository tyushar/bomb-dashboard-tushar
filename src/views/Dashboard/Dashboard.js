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

import HomeImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';
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
              <div className="header">
                <div className="head"></div>
                <div className="head">Current Supply</div>
                <div className="head">Total Supply</div>
                <div className="head">Price</div>
                <div className="head"></div>
              </div>
            </div>

            <div className="left-summary">
              <p className="left-head">Current Epoch</p>
              <p className="bold-summary">{Number(currentEpoch)}</p>
              <p className="bold-summary">03:38:36</p>
              <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
              <p className="left-head">Next Epoch in</p>
              <div className="left-status">
                <p>
                  Live TWAP: <span>1.17</span>
                </p>
                <p>
                  TVL: <span>$5,002.412</span>
                </p>
                <p>
                  Live TWAP: <span>1.22</span>
                </p>
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
                <div className="head-img">img</div>
                <div className="info">
                  <div className="content">
                    <div className="head_content">
                      <h2>Boardroom</h2>
                      <div>Recommended</div>
                    </div>
                    <p>Stake BSHARE and earn BOMB every epoch</p>
                  </div>
                  <div className="TVL">TVL: $1,008,430</div>
                </div>
              </div>
              <div className="tot-stack">
                <div className="content">Total Staked:7232</div>
              </div>
              <div className="info-content">
                <div className="table">
                  <div className="head">
                    <div>Daily return</div>
                    <div>Your Stack</div>
                    <div>Earned</div>
                  </div>
                  <div className="info">
                    <div>{boardroomAPR.toFixed(2)}%</div>
                    <div>{`${getDisplayBalance(stakedBalance)}`}</div>
                    <div>{`${getDisplayBalance(earnings)}`}</div>
                  </div>
                  <div className="info">
                    <div></div>
                    <div>{`≈$${tokenPriceInDollars}`}</div>
                    <div>{`≈$${earnedInDollars}`}</div>
                  </div>
                </div>
                <div className="tags">
                  <div>Deposit</div>
                  <div>Withdraw</div>
                  <div>Clain Rewards</div>
                </div>
              </div>
            </div>
          </div>
          <div className="news">
            <h2>Latest News</h2>
          </div>
        </div>

      </div>
    </>
  );
};


export default Dashboard;