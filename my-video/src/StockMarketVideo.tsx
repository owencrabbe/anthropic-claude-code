import {AbsoluteFill, Sequence} from 'remotion';
import {Intro} from './sections/Intro';
import {WhatIsStockMarket} from './sections/WhatIsStockMarket';
import {WhatAreStocks} from './sections/WhatAreStocks';
import {OptionsTrading} from './sections/OptionsTrading';
import {FuturesTrading} from './sections/FuturesTrading';
import {RiskManagement} from './sections/RiskManagement';
import {Outro} from './sections/Outro';

// ─── Timing (30 fps) ────────────────────────────────────────────────────────
// Intro           0  – 900    (0:00 – 0:30)
// WhatIsMarket  900  – 4500   (0:30 – 2:30)
// WhatAreStocks 4500 – 8100   (2:30 – 4:30)
// Options       8100 – 11700  (4:30 – 6:30)
// Futures      11700 – 14400  (6:30 – 8:00)
// Risk Mgmt    14400 – 16200  (8:00 – 9:00)
// Outro        16200 – 18000  (9:00 – 10:00)

export const StockMarketVideo: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
			<Sequence from={0} durationInFrames={900}>
				<Intro />
			</Sequence>

			<Sequence from={900} durationInFrames={3600}>
				<WhatIsStockMarket />
			</Sequence>

			<Sequence from={4500} durationInFrames={3600}>
				<WhatAreStocks />
			</Sequence>

			<Sequence from={8100} durationInFrames={3600}>
				<OptionsTrading />
			</Sequence>

			<Sequence from={11700} durationInFrames={2700}>
				<FuturesTrading />
			</Sequence>

			<Sequence from={14400} durationInFrames={1800}>
				<RiskManagement />
			</Sequence>

			<Sequence from={16200} durationInFrames={1800}>
				<Outro />
			</Sequence>
		</AbsoluteFill>
	);
};
