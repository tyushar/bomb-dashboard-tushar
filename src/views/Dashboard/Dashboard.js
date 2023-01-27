import React from 'react';
import React, { useMemo } from 'react';
import './dashboard.css';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import moment from 'moment';


const Dashboard = () => {

    const { to } = useTreasuryAllocationTimes();
    const currentEpoch = useCurrentEpoch();
    
    
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
      </div>
    </>
  );
};


export default Dashboard;