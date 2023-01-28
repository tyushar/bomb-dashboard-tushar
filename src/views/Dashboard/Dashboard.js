import React, { useMemo } from 'react';
import './dashboard.css';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useBombStats from '../../hooks/useBombStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../hooks/useBombFinance';
import moment from 'moment';
import { Link } from 'react-router-dom';
import HomeImage from '../../assets/img/background.jpg';
import { createGlobalStyle } from 'styled-components';

import img1 from '../../assets/img/bomb-bitcoin-LP.png';
import img2 from '../../assets/img/bshare-bnb-LP.png';
import img3 from '../../assets/img/bbond.png';
import img4 from '../../assets/img/bshares.png';
import meta from '../../assets/img/metamask-fox.svg';
import doc from '../../assets/img/doc.png';
import discord from '../../assets/img/discord.png';

import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

//bomb-farm
import useBank from '../../hooks/useBank';
import { useWallet } from 'use-wallet';
import useEarnings from '../../hooks/useEarnings';
import Show from './components/Show';
import BondDash from './components/BondDash';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';
import useModal from '../../hooks/useModal';
import DepositModal from '../Boardroom/components/DepositModal';
import useTokenBalance from '../../hooks/useTokenBalance';
import useStakeToBoardroom from '../../hooks/useStakeToBoardroom';
import WithdrawModal from '../Boardroom/components/WithdrawModal';
import useWithdrawFromBoardroom from '../../hooks/useWithdrawFromBoardroom';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';

const Dashboard = () => {
  const bombFinance = useBombFinance();
  const stakedBalance = useStakedBalanceOnBoardroom();
  const { to } = useTreasuryAllocationTimes();
  const currentEpoch = useCurrentEpoch();
  const earnings = useEarningsOnBoardroom();
  const bombStats = useBombStats();

  // invest strategy section
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
  const tokenPriceInDollars = React.useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  //bomb-farm
  const bank = useBank('BombBtcbLPBShareRewardPool');
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

  // Bomb-summary
  const boardroomAPR = useFetchBoardroomAPR();
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

  const TVL_BOBM = useTotalValueLocked();
  const { onStake } = useStakeToBoardroom();
  const { onRedeem } = useRedeemOnBoardroom();
  const tokenBalance = useTokenBalance(bombFinance.BSHARE);

  // Boardroom section
  const totalStaked = useTotalStakedOnBoardroom();
  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );
  const { onWithdraw } = useWithdrawFromBoardroom();
  const { onReward } = useHarvestFromBoardroom();
  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );
  return (
    <>
      {/* <BackgroundImage /> */}
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
                    <img src={img1} />
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
                    <img src={img4} />
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
                    <img src={img3} />
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
                  TVL: <span>${TVL_BOBM.toFixed(2)}</span>
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
            <a href={'https://www.bombswap.xyz/swap?outputCurrency=0x522348779DCb2911539e76A1042aA922F9C47Ee3'} target="_blank">
                  Invest Now
                </a>
            </div>
            <div className="links-to">
              <div>
                <img  src={discord} />
                Chat on Discord
              </div>
              <div>
                <img src={doc} />
                <a href={'https://docs.bomb.money/welcome-start-here/readme'} target="_blank">
                  Read Doc
                </a>
              </div>
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
                <div className="content">Total Staked:{getDisplayBalance(totalStaked)}</div>
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
                  <div className="tag-top">
                    <button onClick={onPresentDeposit}>Deposit</button>
                    <button onClick={onPresentWithdraw}>Withdraw</button>
                  </div>
                  <button onClick={onReward}>Claim Rewards</button>
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
              <button>Claim All</button>
            </div>
            <Show img={img1} id={'BombBtcbLPBShareRewardPool'} />
            <Show img={img2} id={'BshareBnbLPBShareRewardPool'} />
          </div>
        ) : (
          <></>
        )}
        <div className="bonds-container-jt">
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
          <BondDash />
        </div>
      </div>
    </>
  );
};

export default Dashboard;