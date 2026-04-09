import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, slideY} from '../utils';

const TICKERS = [
	{sym: 'AAPL', price: '192.35', chg: '+1.24%', up: true},
	{sym: 'TSLA', price: '238.45', chg: '+3.18%', up: true},
	{sym: 'MSFT', price: '415.20', chg: '+0.87%', up: true},
	{sym: 'NVDA', price: '875.60', chg: '-1.23%', up: false},
	{sym: 'AMZN', price: '185.40', chg: '+2.10%', up: true},
	{sym: 'META', price: '520.80', chg: '-0.45%', up: false},
	{sym: 'GOOGL', price: '175.25', chg: '+1.56%', up: true},
	{sym: 'SPY', price: '528.90', chg: '+0.92%', up: true},
	{sym: 'QQQ', price: '450.30', chg: '+1.15%', up: true},
	{sym: 'BTC', price: '67,450', chg: '+4.32%', up: true},
	{sym: 'GLD', price: '195.60', chg: '+0.34%', up: true},
	{sym: 'DIS', price: '112.40', chg: '-0.78%', up: false},
];

export const Intro: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	const gridO = fade(f, 0, 40);
	const titleScale = spring({frame: Math.max(0, f - 20), fps, config: {damping: 180, stiffness: 70}});
	const titleO = fade(f, 20, 35);
	const subO = fade(f, 80, 30);
	const subY = slideY(f, 80, 30, 45);
	const chipsO = fade(f, 130, 30);
	const chipsY = slideY(f, 130, 30, 40);
	const disclaimerO = fade(f, 220, 40);
	const tickerX = interpolate(f, [0, 900], [0, -2200]);

	return (
		<AbsoluteFill style={{background: COLORS.bg, overflow: 'hidden'}}>
			{/* Animated grid */}
			<div style={{
				position: 'absolute', inset: 0, opacity: gridO,
				backgroundImage: `linear-gradient(rgba(124,58,237,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.07) 1px, transparent 1px)`,
				backgroundSize: '80px 80px',
			}} />

			{/* Glow orbs */}
			<div style={{position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)', top: -100, left: 200, opacity: gridO}} />
			<div style={{position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', bottom: -50, right: 300, opacity: gridO}} />
			<div style={{position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)', top: 200, right: 100, opacity: gridO}} />

			{/* Top ticker tape */}
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 52, background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
				<div style={{display: 'flex', gap: 64, transform: `translateX(${tickerX}px)`, whiteSpace: 'nowrap'}}>
					{[...TICKERS, ...TICKERS, ...TICKERS].map((t, i) => (
						<div key={i} style={{display: 'flex', gap: 12, alignItems: 'center'}}>
							<span style={{color: COLORS.text, fontSize: 19, fontWeight: 700, letterSpacing: 0.5}}>{t.sym}</span>
							<span style={{color: COLORS.muted, fontSize: 18}}>${t.price}</span>
							<span style={{color: t.up ? COLORS.green : COLORS.red, fontSize: 18, fontWeight: 600}}>{t.chg}</span>
						</div>
					))}
				</div>
			</div>

			{/* Center content */}
			<AbsoluteFill style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 52}}>
				{/* Badge */}
				<div style={{opacity: titleO, transform: `scale(${titleScale * 0.4 + 0.6})`, marginBottom: 28, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(167,139,250,0.35)', borderRadius: 100, padding: '10px 28px'}}>
					<span style={{color: COLORS.purpleLight, fontSize: 19, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' as const}}>
						Beginner's Crash Course
					</span>
				</div>

				{/* Main title */}
				<div style={{opacity: titleO, transform: `scale(${titleScale * 0.25 + 0.75})`, textAlign: 'center' as const, lineHeight: 1}}>
					<div style={{fontSize: 148, fontWeight: 900, letterSpacing: -5, color: COLORS.text, margin: 0}}>
						STOCK
						<span style={{background: 'linear-gradient(135deg, #7C3AED 0%, #60A5FA 50%, #06B6D4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginLeft: 30}}>
							MARKET
						</span>
					</div>
					<div style={{fontSize: 120, fontWeight: 900, letterSpacing: -3, color: COLORS.text, lineHeight: 1.05}}>
						101
					</div>
				</div>

				{/* Subtitle */}
				<div style={{opacity: subO, transform: `translateY(${subY}px)`, marginTop: 44, textAlign: 'center' as const}}>
					<p style={{fontSize: 34, color: COLORS.muted, margin: 0, fontWeight: 400, letterSpacing: 0.5}}>
						Everything you need to know to get started
					</p>
				</div>

				{/* Topic chips */}
				<div style={{opacity: chipsO, transform: `translateY(${chipsY}px)`, display: 'flex', gap: 20, marginTop: 36, flexWrap: 'wrap' as const, justifyContent: 'center'}}>
					{[
						{label: '📈 Stocks', color: COLORS.green},
						{label: '⚙️ Options', color: COLORS.gold},
						{label: '🔮 Futures', color: COLORS.blue},
						{label: '🛡️ Risk Management', color: COLORS.purple},
					].map(({label, color}) => (
						<div key={label} style={{background: 'rgba(255,255,255,0.06)', border: `1px solid ${color}40`, borderRadius: 10, padding: '12px 28px', color: color, fontSize: 22, fontWeight: 600}}>
							{label}
						</div>
					))}
				</div>

				{/* Disclaimer */}
				<div style={{opacity: disclaimerO, position: 'absolute', bottom: 50, width: 980, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 14, padding: '20px 44px', textAlign: 'center' as const}}>
					<p style={{color: '#FCA5A5', fontSize: 20, margin: 0, lineHeight: 1.6}}>
						<strong>⚠️ DISCLAIMER:</strong> This video is for <strong>educational purposes only</strong> and does <strong>NOT</strong> constitute financial advice.
						Always conduct your own research and consult a licensed financial advisor before making investment decisions.
					</p>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
