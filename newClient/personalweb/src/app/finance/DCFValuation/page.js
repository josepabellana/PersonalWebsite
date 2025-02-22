"use client";
import { useState } from 'react';
const thisYear = new Date().getFullYear();
// https://site.financialmodelingprep.com/developer/docs


export default function DCFPage() {

    const historicalYearsDefault = [thisYear-6, thisYear-5, thisYear-4, thisYear-3, thisYear-2, thisYear-1] ;
    const [historicalYears] = useState(historicalYearsDefault);

    // Manually entered FCF values for each historical year
    const historicalValues = [1000, 1100, 1200, 1500, 2000, 2500];
    const [historicalFCFs, setHistoricalFCFs] = useState(historicalValues);
    const [historicalFCFGrowth, setHistoricalFCFGrowth] = useState(historicalValues.map((v,i)=> ((v-historicalValues[i-1])/historicalValues[i-1]) || 0));
    const [futureYearsCount, setFutureYearsCount] = useState(6);

    // Growth Rate (applied to last historical FCF, or an average)
    const [growthRate, setGrowthRate] = useState(10); // % per year
    const [discountRate, setDiscountRate] = useState(8); // % (WACC)
    const [perpetualGrowthRate, setPerpetualGrowthRate] = useState(2); // % for terminal value
    const [sharesOutstanding, setSharesOutstanding] = useState(10_000_000); // total shares
    const [currentPrice, setCurrentPrice] = useState(30); // current market price
    const [marginOfSafety, setMarginOfSafety] = useState(10); // % margin of safety

    // --------------------------
    // 3. Computed / Display Data
    // --------------------------
    const [futureFCFs, setFutureFCFs] = useState([]);
    const [discountedValues, setDiscountedValues] = useState([]);
    const [terminalValue, setTerminalValue] = useState(0);
    const [pvOfTerminal, setPvOfTerminal] = useState(0);
    const [intrinsicValue, setIntrinsicValue] = useState(0);
    const [intrinsicValuePerShare, setIntrinsicValuePerShare] = useState(0);
    const [upsidePercent, setUpsidePercent] = useState(0);

    // --------------------------
    // 4. Handlers
    // --------------------------
    // Update a single historical FCF input
    const handleHistoricalFCFChange = (index, value) => {
        const newFCFs = [...historicalFCFs];
        newFCFs[index] = parseFloat(value) || 0;
        setHistoricalFCFs(newFCFs);
    };

    // Calculate all DCF values
    const calculateDCF = () => {
        const g = growthRate / 100;
        const r = discountRate / 100;
        const gTerminal = perpetualGrowthRate / 100;

        // Last historical FCF (as a base for projecting)
        const lastHistoricalFCF = historicalFCFs[historicalFCFs.length - 1] || 0;

        // 4.1 Generate future FCFs
        let fcf = lastHistoricalFCF;
        const fcfArray = [];
        const discountArray = [];
        let sumOfPV = 0;

        for (let i = 1; i <= futureYearsCount; i++) {
            // Grow FCF by g
            if (i === 1) {
                // first future year = lastHistoricalFCF * (1+g)
                fcf = lastHistoricalFCF * (1 + g);
            } else {
                fcf = fcf * (1 + g);
            }
            fcfArray.push(fcf);

            // Discount factor
            const pv = fcf / Math.pow(1 + r, i);
            discountArray.push(pv);
            sumOfPV += pv;
        }

        // 4.2 Terminal Value (Perpetual Growth)
        // TV at the end of forecast period
        const fcfNth = fcfArray[fcfArray.length - 1] || 0;
        const tv = (fcfNth * (1 + gTerminal)) / (r - gTerminal);
        const tvPV = tv / Math.pow(1 + r, futureYearsCount);

        // 4.3 Sum up
        const totalIntrinsicValue = sumOfPV + tvPV;
        // Per-share (before margin of safety)
        const rawIntrinsicPerShare = totalIntrinsicValue / sharesOutstanding;

        // 4.4 Apply Margin of Safety
        const mos = marginOfSafety / 100;
        const mosIntrinsicPerShare = rawIntrinsicPerShare * (1 - mos);

        // 4.5 Compare with current price
        const diff = mosIntrinsicPerShare - currentPrice;
        const upside = (diff / currentPrice) * 100;

        // --------------------------
        // 5. Update state
        // --------------------------
        setFutureFCFs(fcfArray);
        setDiscountedValues(discountArray);
        setTerminalValue(tv);
        setPvOfTerminal(tvPV);
        setIntrinsicValue(totalIntrinsicValue);
        setIntrinsicValuePerShare(mosIntrinsicPerShare);
        setUpsidePercent(upside);
    };

    // --------------------------
    // 6. Render
    // --------------------------
    return (
        <div style={{ maxWidth: 1000, margin: '40px auto', padding: 20 }}>
            <h1>DCF Valuation</h1>

            {/* Inputs Section */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                    <h2>Historical FCF</h2>
                    <table style={{ borderCollapse: 'collapse' }}>
                        <thead>
                        <tr>
                            {historicalYears.map((yr) => (
                                <th key={yr} style={{ border: '1px solid #ccc', padding: 8 }}>{yr}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {historicalFCFs.map((val, i) => (
                                <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>
                                    <input
                                        type="number"
                                        value={val}
                                        onChange={(e) => handleHistoricalFCFChange(i, e.target.value)}
                                        style={{ width: '80px' }}
                                    />
                                </td>
                            ))}
                        </tr>
                        <tr>
                            {historicalFCFGrowth.map((val, i) => (
                                <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>
                                    <span style={{ width: '80px' }}>{val.toFixed(2)}%</span>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2>Forecast Inputs</h2>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Future Years to Forecast: </label>
                        <input
                            type="number"
                            value={futureYearsCount}
                            onChange={(e) => setFutureYearsCount(parseInt(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Growth Rate (%): </label>
                        <input
                            type="number"
                            value={growthRate}
                            onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Discount Rate (%): </label>
                        <input
                            type="number"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Perpetual Growth Rate (%): </label>
                        <input
                            type="number"
                            value={perpetualGrowthRate}
                            onChange={(e) => setPerpetualGrowthRate(parseFloat(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Shares Outstanding: </label>
                        <input
                            type="number"
                            value={sharesOutstanding}
                            onChange={(e) => setSharesOutstanding(parseFloat(e.target.value))}
                            style={{ width: '80px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Current Price ($): </label>
                        <input
                            type="number"
                            value={currentPrice}
                            onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Margin of Safety (%): </label>
                        <input
                            type="number"
                            value={marginOfSafety}
                            onChange={(e) => setMarginOfSafety(parseFloat(e.target.value))}
                            style={{ width: '60px' }}
                        />
                    </div>
                    <button onClick={calculateDCF} style={{ padding: '6px 12px', cursor: 'pointer' }}>
                        Calculate
                    </button>
                </div>
            </div>

            {/* Results Section */}
            <div style={{ marginTop: 40 }}>
                <h2>Projected Future Cash Flows</h2>
                {futureFCFs.length > 0 && (
                    <table style={{ borderCollapse: 'collapse', marginBottom: 20 }}>
                        <thead>
                        <tr>
                            {futureFCFs.map((_, i) => (
                                <th key={i} style={{ border: '1px solid #ccc', padding: 8 }}>
                                    Year {new Date().getFullYear() + i + 1}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {/* Future FCF row */}
                        <tr>
                            {futureFCFs.map((val, i) => (
                                <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>
                                    {val.toFixed(2)}
                                </td>
                            ))}
                        </tr>
                        {/* Discounted Value row */}
                        <tr>
                            {discountedValues.map((val, i) => (
                                <td key={i} style={{ border: '1px solid #ccc', padding: 8 }}>
                                    <small>PV: </small>{val.toFixed(2)}
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                )}

                <h2>Terminal Value</h2>
                <p>Terminal Value (not discounted): ${terminalValue.toFixed(2)}</p>
                <p>Present Value of Terminal: ${pvOfTerminal.toFixed(2)}</p>

                <h2>Valuation</h2>
                <p>Total Intrinsic Value (Sum of PV of FCFs + PV of TV): <strong>${intrinsicValue.toFixed(2)}</strong></p>
                <p>Intrinsic Value per Share (after Margin of Safety): <strong>${intrinsicValuePerShare.toFixed(2)}</strong></p>
                <p>Current Price: <strong>${currentPrice.toFixed(2)}</strong></p>
                <p>Upside (%): <strong>{upsidePercent.toFixed(2)}%</strong></p>
            </div>
        </div>
    );
}