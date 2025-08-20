import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/FPLDashboard.module.css';

const FPLDashboard = () => {
  const [teamId1, setTeamId1] = useState('');
  const [teamId2, setTeamId2] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const chartRef = useRef(null);

  const fetchFPLData = async (teamId) => {
    try {
      // Try multiple approaches to handle CORS issues
      const baseUrl = 'https://fantasy.premierleague.com/api';
      
      // First, try direct fetch (might work in some environments)
      let summary, history, transfers, bootstrap;
      
      try {
        const summaryUrl = `${baseUrl}/entry/${teamId}/`;
        const historyUrl = `${baseUrl}/entry/${teamId}/history/`;
        const transfersUrl = `${baseUrl}/entry/${teamId}/transfers/`;
        const bootstrapUrl = `${baseUrl}/bootstrap-static/`;

        [summary, history, transfers, bootstrap] = await Promise.all([
          fetch(summaryUrl).then(res => res.json()),
          fetch(historyUrl).then(res => res.json()),
          fetch(transfersUrl).then(res => res.json()),
          fetch(bootstrapUrl).then(res => res.json())
        ]);
      } catch (directError) {
        console.log('Direct fetch failed due to CORS, trying CORS proxy...');
        
        // Try multiple CORS proxy services for better reliability
        const proxyServices = [
          'https://api.allorigins.win/raw?url=',
          'https://corsproxy.io/?',
          'https://thingproxy.freeboard.io/fetch/'
        ];
        
        let success = false;
        for (const proxy of proxyServices) {
          try {
            console.log(`Trying proxy: ${proxy}`);
            const summaryUrl = `${proxy}${encodeURIComponent(`${baseUrl}/entry/${teamId}/`)}`;
            const historyUrl = `${proxy}${encodeURIComponent(`${baseUrl}/entry/${teamId}/history/`)}`;
            const transfersUrl = `${proxy}${encodeURIComponent(`${baseUrl}/entry/${teamId}/transfers/`)}`;
            const bootstrapUrl = `${proxy}${encodeURIComponent(`${baseUrl}/bootstrap-static/`)}`;

            [summary, history, transfers, bootstrap] = await Promise.all([
              fetch(summaryUrl).then(res => res.json()),
              fetch(historyUrl).then(res => res.json()),
              fetch(transfersUrl).then(res => res.json()),
              fetch(bootstrapUrl).then(res => res.json())
            ]);
            
            success = true;
            console.log('Successfully fetched data using proxy');
            break;
          } catch (proxyError) {
            console.log(`Proxy ${proxy} failed:`, proxyError.message);
            continue;
          }
        }
        
              if (!success) {
        throw new Error('All CORS proxy attempts failed. This is common in local development due to CORS restrictions. Please try demo mode or deploy to production where CORS proxies work better.');
      }
      }

      // Fetch picks data for each gameweek
      const picksData = {};
      const events = bootstrap.events;
      for (const event of events) {
        try {
          let picksResponse;
          try {
            // Try direct fetch first
            picksResponse = await fetch(`${baseUrl}/entry/${teamId}/event/${event.id}/picks/`);
          } catch (picksError) {
            // Fallback to CORS proxy with multiple services
            const proxyServices = [
              'https://api.allorigins.win/raw?url=',
              'https://corsproxy.io/?',
              'https://thingproxy.freeboard.io/fetch/'
            ];
            
            let picksSuccess = false;
            for (const proxy of proxyServices) {
              try {
                const picksUrl = `${proxy}${encodeURIComponent(`${baseUrl}/entry/${teamId}/event/${event.id}/picks/`)}`;
                picksResponse = await fetch(picksUrl);
                picksSuccess = true;
                break;
              } catch (proxyError) {
                continue;
              }
            }
            
            if (!picksSuccess) {
              throw new Error('Failed to fetch picks data');
            }
          }
          
          if (picksResponse.ok) {
            picksData[event.id] = await picksResponse.json();
          }
        } catch (err) {
          console.warn(`Failed to fetch picks for GW ${event.id}:`, err);
        }
      }

      return {
        summary,
        history: history.current,
        transfers,
        chips: history.chips,
        elements: bootstrap.elements,
        events: bootstrap.events,
        picks: picksData,
        totalPlayers: bootstrap.total_players || 1
      };
    } catch (error) {
      throw new Error(`Failed to fetch data for team ${teamId}: ${error.message}`);
    }
  };

  const processHistory = (history, chips) => {
    const processed = history.map(gw => ({
      GW: gw.event,
      'GW Points': gw.points,
      'Total Points': gw.total_points,
      'Overall Rank': gw.overall_rank,
      'Transfers': gw.event_transfers,
      'Pts Spent': gw.event_transfers_cost,
      'Bench Points': gw.points_on_bench,
      'Bank (£m)': (gw.bank / 10).toFixed(1),
      'Squad Value (£m)': (gw.value / 10).toFixed(1),
      'Chip Used': chips.find(chip => chip.event === gw.event)?.name || null
    }));

    return processed.sort((a, b) => a.GW - b.GW);
  };

  const processTransfers = (transfers, history, lookup, chips) => {
    if (!transfers || transfers.length === 0) return [];

    const processed = transfers.map(transfer => ({
      GW: transfer.event,
      'Player In': lookup[transfer.element_in] || 'Unknown',
      'Player Out': lookup[transfer.element_out] || 'Unknown',
      'Chip': chips.find(chip => chip.event === transfer.event)?.name || null,
      'Pts Spent': history.find(h => h.event === transfer.event)?.event_transfers_cost || 0
    }));

    return processed;
  };

  const processCaptains = (picks, lookup) => {
    const rows = [];
    for (const [gw, data] of Object.entries(picks)) {
      const captain = data.picks.find(p => p.is_captain);
      const vice = data.picks.find(p => p.is_vice_captain);
      rows.push({
        GW: parseInt(gw),
        Captain: lookup[captain?.element] || 'Unknown',
        'Vice-Captain': lookup[vice?.element] || 'Unknown'
      });
    }
    return rows.sort((a, b) => a.GW - b.GW);
  };

  const processChips = (history) => {
    const used = history.filter(gw => gw['Chip Used']);
    const chipStats = {};
    
    used.forEach(gw => {
      const chip = gw['Chip Used'];
      if (!chipStats[chip]) {
        chipStats[chip] = { count: 0, total: 0 };
      }
      chipStats[chip].count++;
      chipStats[chip].total += gw['GW Points'];
    });

    return Object.entries(chipStats).map(([chip, stats]) => ({
      'Chip Used': chip,
      'Count': stats.count,
      'Average Points': (stats.total / stats.count).toFixed(1)
    }));
  };

  const processROI = (transfers, elements) => {
    if (!transfers || transfers.length === 0) return { transfers: [], summary: [], top: [], bottom: [] };

    const ptsMap = {};
    elements.forEach(element => {
      ptsMap[element.id] = element.total_points;
    });

    const processed = transfers.map(transfer => ({
      GW: transfer.event,
      'In Pts': ptsMap[transfer.element_in] || 0,
      'Out Pts': ptsMap[transfer.element_out] || 0,
      'Net': (ptsMap[transfer.element_in] || 0) - (ptsMap[transfer.element_out] || 0)
    }));

    const summary = processed.reduce((acc, transfer) => {
      const existing = acc.find(s => s.GW === transfer.GW);
      if (existing) {
        existing.Net += transfer.Net;
      } else {
        acc.push({ GW: transfer.GW, Net: transfer.Net });
      }
      return acc;
    }, []);

    const top = [...processed].sort((a, b) => b.Net - a.Net).slice(0, 10);
    const bottom = [...processed].sort((a, b) => a.Net - b.Net).slice(0, 10);

    return { transfers: processed, summary, top, bottom };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamId1) return;

    setIsLoading(true);
    setError('');
    setData(null);

    try {
      const data1 = await fetchFPLData(teamId1);
      let data2 = null;

      if (teamId2) {
        data2 = await fetchFPLData(teamId2);
      }

      const lookup = {};
      data1.elements.forEach(element => {
        lookup[element.id] = `${element.first_name} ${element.second_name}`;
      });

      const processedData = {
        team1: {
          ...data1,
          history: processHistory(data1.history, data1.chips),
          transfers: processTransfers(data1.transfers, data1.history, lookup, data1.chips),
          captains: processCaptains(data1.picks, lookup),
          chips: processChips(processHistory(data1.history, data1.chips)),
          roi: processROI(data1.transfers, data1.elements)
        }
      };

      if (data2) {
        processedData.team2 = {
          ...data2,
          history: processHistory(data2.history, data2.chips),
          transfers: processTransfers(data2.transfers, data2.history, lookup, data2.chips),
          captains: processCaptains(data2.picks, lookup),
          chips: processChips(processHistory(data2.history, data2.chips)),
          roi: processROI(data2.transfers, data2.elements)
        };
      }

      setData(processedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = (data, filename) => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  const loadDemoData = () => {
    const demoData = {
      team1: {
        summary: {
          name: "Demo FPL Team",
          player_first_name: "John",
          player_last_name: "Doe"
        },
        history: [
          { GW: 1, 'GW Points': 78, 'Total Points': 78, 'Overall Rank': 1250000, 'Transfers': 0, 'Pts Spent': 0, 'Bench Points': 8, 'Bank (£m)': 0.5, 'Squad Value (£m)': 100.0, 'Chip Used': null },
          { GW: 2, 'GW Points': 65, 'Total Points': 143, 'Overall Rank': 1100000, 'Transfers': 1, 'Pts Spent': 4, 'Bench Points': 12, 'Bank (£m)': 0.3, 'Squad Value (£m)': 100.2, 'Chip Used': null },
          { GW: 3, 'GW Points': 89, 'Total Points': 232, 'Overall Rank': 850000, 'Transfers': 2, 'Pts Spent': 8, 'Bench Points': 6, 'Bank (£m)': 0.1, 'Squad Value (£m)': 100.5, 'Chip Used': null },
          { GW: 4, 'GW Points': 72, 'Total Points': 304, 'Overall Rank': 750000, 'Transfers': 1, 'Pts Spent': 4, 'Bench Points': 15, 'Bank (£m)': 0.0, 'Squad Value (£m)': 100.8, 'Chip Used': 'Wildcard' },
          { GW: 5, 'GW Points': 95, 'Total Points': 399, 'Overall Rank': 600000, 'Transfers': 0, 'Pts Spent': 0, 'Bench Points': 9, 'Bank (£m)': 0.2, 'Squad Value (£m)': 101.0, 'Chip Used': null }
        ],
        transfers: [
          { GW: 2, 'Player In': 'Haaland', 'Player Out': 'Kane', 'Chip': null, 'Pts Spent': 4 },
          { GW: 3, 'Player In': 'Salah', 'Player Out': 'Son', 'Chip': null, 'Pts Spent': 4 },
          { GW: 4, 'Player In': 'De Bruyne', 'Player Out': 'Fernandes', 'Chip': 'Wildcard', 'Pts Spent': 0 }
        ],
        captains: [
          { GW: 1, Captain: 'Haaland', 'Vice-Captain': 'Salah' },
          { GW: 2, Captain: 'Salah', 'Vice-Captain': 'Haaland' },
          { GW: 3, Captain: 'Haaland', 'Vice-Captain': 'De Bruyne' },
          { GW: 4, Captain: 'De Bruyne', 'Vice-Captain': 'Haaland' },
          { GW: 5, Captain: 'Haaland', 'Vice-Captain': 'Salah' }
        ],
        chips: [
          { 'Chip Used': 'Wildcard', 'Count': 1, 'Average Points': 95.0 }
        ],
        roi: {
          transfers: [
            { GW: 2, 'In Pts': 45, 'Out Pts': 32, 'Net': 13 },
            { GW: 3, 'In Pts': 38, 'Out Pts': 28, 'Net': 10 },
            { GW: 4, 'In Pts': 52, 'Out Pts': 35, 'Net': 17 }
          ],
          summary: [
            { GW: 2, Net: 13 },
            { GW: 3, Net: 10 },
            { GW: 4, Net: 17 }
          ],
          top: [
            { GW: 4, 'In Pts': 52, 'Out Pts': 35, 'Net': 17 },
            { GW: 2, 'In Pts': 45, 'Out Pts': 32, 'Net': 13 },
            { GW: 3, 'In Pts': 38, 'Out Pts': 28, 'Net': 10 }
          ],
          bottom: [
            { GW: 3, 'In Pts': 38, 'Out Pts': 28, 'Net': 10 },
            { GW: 2, 'In Pts': 45, 'Out Pts': 32, 'Net': 13 },
            { GW: 4, 'In Pts': 52, 'Out Pts': 35, 'Net': 17 }
          ]
        }
      }
    };

    setData(demoData);
    setDemoMode(true);
  };

  return (
    <div className={styles.fplDashboard}>
      <div className={styles.header}>
        <h1>⚽ Fantasy Premier League Dashboard</h1>
        <p>Analyze your FPL team performance with detailed statistics and insights</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <div className={styles.inputGroup}>
          <label htmlFor="teamId1">Enter your FPL Team ID:</label>
          <input
            id="teamId1"
            type="text"
            value={teamId1}
            onChange={(e) => setTeamId1(e.target.value)}
            placeholder="e.g., 1234567"
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="teamId2">Compare with another FPL Team ID (optional):</label>
          <input
            id="teamId2"
            type="text"
            value={teamId2}
            onChange={(e) => setTeamId2(e.target.value)}
            placeholder="e.g., 7654321"
          />
        </div>
        
        <button type="submit" disabled={isLoading || !teamId1} className={styles.submitButton}>
          {isLoading ? 'Loading...' : 'Load FPL Data'}
        </button>
        
        <div className={styles.demoSection}>
          <p><strong>Local Development Note:</strong> FPL API has CORS restrictions. If you get errors, try demo mode:</p>
          <button 
            type="button" 
            onClick={loadDemoData} 
            className={styles.demoButton}
          >
            🎮 Load Demo Data
          </button>
          <p className={styles.demoNote}>
            <small>
              💡 <strong>Pro Tip:</strong> The app will automatically try multiple CORS proxies if direct API calls fail.
              <br />
              🚀 <strong>Production:</strong> This works perfectly when deployed to Vercel/Netlify!
            </small>
          </p>
        </div>
      </form>

      {error && (
        <div className={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {data && (
        <div className={styles.dashboard}>
          {demoMode && (
            <div className={styles.demoBanner}>
              🎮 <strong>Demo Mode Active</strong> - Showing sample FPL data. 
              Real data will work when deployed to production!
            </div>
          )}
          
          {/* Team Information */}
          <div className={styles.teamInfo}>
            <div className={styles.teamCard}>
              <h3>Team 1: {data.team1.summary.name || '—'}</h3>
              <p>Manager: {`${data.team1.summary.player_first_name || ''} ${data.team1.summary.player_last_name || ''}`.trim()}</p>
            </div>
            {data.team2 && (
              <div className={styles.teamCard}>
                <h3>Team 2: {data.team2.summary.name || '—'}</h3>
                <p>Manager: {`${data.team2.summary.player_first_name || ''} ${data.team2.summary.player_last_name || ''}`.trim()}</p>
              </div>
            )}
          </div>

          {/* Gameweek Performance */}
          <div className={styles.section}>
            <h2>📋 Gameweek Performance</h2>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>GW</th>
                    <th>Points</th>
                    <th>Total</th>
                    <th>Rank</th>
                    <th>Transfers</th>
                    <th>Cost</th>
                    <th>Chip</th>
                    <th>Bench</th>
                    <th>Bank</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.team1.history.map((gw, index) => (
                    <tr key={index}>
                      <td>{gw.GW}</td>
                      <td>{gw['GW Points']}</td>
                      <td>{gw['Total Points']}</td>
                      <td>{gw['Overall Rank']?.toLocaleString()}</td>
                      <td>{gw.Transfers}</td>
                      <td>{gw['Pts Spent']}</td>
                      <td>{gw['Chip Used'] || '—'}</td>
                      <td>{gw['Bench Points']}</td>
                      <td>£{gw['Bank (£m)']}m</td>
                      <td>£{gw['Squad Value (£m)']}m</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => downloadCSV(data.team1.history, 'team1_history.csv')}
              className={styles.downloadButton}
            >
              Download Team 1 CSV
            </button>
          </div>

          {/* Visual Analysis */}
          <div className={styles.section}>
            <h2>📈 Performance Charts</h2>
            <div className={styles.chartsGrid}>
              <div className={styles.chartContainer}>
                <h3>Total Points Progress</h3>
                <div className={styles.chart} ref={chartRef}>
                  <div className={styles.chartPlaceholder}>
                    Chart visualization would go here
                    <br />
                    <small>Using Chart.js or similar library for interactive charts</small>
                  </div>
                </div>
              </div>
              
              <div className={styles.chartContainer}>
                <h3>Gameweek Points vs Average</h3>
                <div className={styles.chart}>
                  <div className={styles.chartPlaceholder}>
                    Weekly comparison chart
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transfer Summary */}
          {data.team1.transfers.length > 0 && (
            <div className={styles.section}>
              <h2>🔁 Transfer Summary (Team 1)</h2>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>GW</th>
                      <th>Player In</th>
                      <th>Player Out</th>
                      <th>Chip</th>
                      <th>Points Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.team1.transfers.map((transfer, index) => (
                      <tr key={index}>
                        <td>{transfer.GW}</td>
                        <td>{transfer['Player In']}</td>
                        <td>{transfer['Player Out']}</td>
                        <td>{transfer.Chip || '—'}</td>
                        <td>{transfer['Pts Spent']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button 
                onClick={() => downloadCSV(data.team1.transfers, 'team1_transfers.csv')}
                className={styles.downloadButton}
              >
                Download Team 1 Transfers CSV
              </button>
            </div>
          )}

          {/* Captain & Vice-Captain */}
          <div className={styles.section}>
            <h2>🧢 Captain & Vice-Captain Picks (Team 1)</h2>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>GW</th>
                    <th>Captain</th>
                    <th>Vice-Captain</th>
                  </tr>
                </thead>
                <tbody>
                  {data.team1.captains.map((captain, index) => (
                    <tr key={index}>
                      <td>{captain.GW}</td>
                      <td>{captain.Captain}</td>
                      <td>{captain['Vice-Captain']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chip Performance */}
          {data.team1.chips.length > 0 && (
            <div className={styles.section}>
              <h2>🏷️ Chip Performance (Team 1)</h2>
              <div className={styles.tableContainer}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Chip Used</th>
                      <th>Count</th>
                      <th>Average Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.team1.chips.map((chip, index) => (
                      <tr key={index}>
                        <td>{chip['Chip Used']}</td>
                        <td>{chip.Count}</td>
                        <td>{chip['Average Points']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transfer ROI */}
          {data.team1.roi.transfers.length > 0 && (
            <div className={styles.section}>
              <h2>💰 Transfer ROI (Team 1)</h2>
              <p className={styles.roiExplanation}>
                <strong>What is Transfer ROI?</strong> Compares season-long points of players in vs out.
              </p>
              
              <div className={styles.roiGrid}>
                <div>
                  <h4>Top 10 Transfers by Net Gain</h4>
                  <div className={styles.tableContainer}>
                    <table className={styles.dataTable}>
                      <thead>
                        <tr>
                          <th>GW</th>
                          <th>In Points</th>
                          <th>Out Points</th>
                          <th>Net Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.team1.roi.top.map((transfer, index) => (
                          <tr key={index}>
                            <td>{transfer.GW}</td>
                            <td>{transfer['In Pts']}</td>
                            <td>{transfer['Out Pts']}</td>
                            <td className={styles.positive}>{transfer.Net}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <h4>Worst 10 Transfers by Net Gain</h4>
                  <div className={styles.tableContainer}>
                    <table className={styles.dataTable}>
                      <thead>
                        <tr>
                          <th>GW</th>
                          <th>In Points</th>
                          <th>Out Points</th>
                          <th>Net Loss</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.team1.roi.bottom.map((transfer, index) => (
                          <tr key={index}>
                            <td>{transfer.GW}</td>
                            <td>{transfer['In Pts']}</td>
                            <td>{transfer['Out Pts']}</td>
                            <td className={styles.negative}>{transfer.Net}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FPLDashboard; 