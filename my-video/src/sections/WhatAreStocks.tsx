import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, prog, slideX, slideY, spr} from '../utils';

const SectionHeader: React.FC<{num: string; title: string; color: string; f: number}> = ({num, title, color, f}) => (
	<div style={{textAlign: 'center' as const, marginBottom: 52}}>
		<div style={{opacity: fade(f, 0, 20), color, fontSize: 22, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase' as const, marginBottom: 12}}>
			SECTION {num}
		</div>
		<div style={{opacity: fade(f, 10, 25), transform: `translateY(${slideY(f, 10, 25, 40)}px)`, fontSize: 80, fontWeight: 900, color: COLORS.text, lineHeight: 1.05, letterSpacing: -2}}>
			{title}
		</div>
		<div style={{opacity: fade(f, 30, 20), width: 80, height: 4, background: color, borderRadius: 4, margin: '20px auto 0'}} />
	</div>
);

// ─── Beat 1: What is a Stock? ─────────────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cardS = spr(f, 40, fps, 70, 200);
	// Dot grid: 100 dots, first one = "you"
	const TOTAL_DOTS = 100;
	const dotsProgress = prog(f, 60, 120);
	const visibleDots = Math.round(dotsProgress * TOTAL_DOTS);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<SectionHeader num="02" title="What Are Stocks?" color={COLORS.green} f={f} />

			<div style={{display: 'flex', gap: 60, width: '100%', maxWidth: 1400, alignItems: 'center'}}>
				{/* Left: definition */}
				<div style={{flex: 1, opacity: fade(f, 40, 30), transform: `scale(${cardS * 0.1 + 0.9})`}}>
					<div style={{background: COLORS.card, border: `1px solid ${COLORS.green}40`, borderRadius: 20, padding: '44px 48px'}}>
						<div style={{fontSize: 28, color: COLORS.green, fontWeight: 700, letterSpacing: 3, marginBottom: 16}}>STOCK = OWNERSHIP</div>
						<p style={{fontSize: 32, color: COLORS.text, margin: 0, lineHeight: 1.65}}>
							A <strong style={{color: COLORS.green}}>stock</strong> (or <strong style={{color: COLORS.green}}>share</strong>) represents a tiny slice of ownership in a company.
						</p>
						<p style={{fontSize: 26, color: COLORS.muted, margin: '24px 0 0', lineHeight: 1.6}}>
							When a company issues 1 million shares and you buy 1,000 of them — you own <strong style={{color: COLORS.greenLight}}>0.1%</strong> of that company.
						</p>
						<div style={{marginTop: 28, display: 'flex', gap: 16}}>
							{[{l: 'Profit share (dividends)', c: COLORS.green}, {l: 'Voting rights', c: COLORS.cyan}].map(({l, c}) => (
								<div key={l} style={{background: `${c}15`, border: `1px solid ${c}40`, borderRadius: 10, padding: '10px 18px', color: c, fontSize: 20, fontWeight: 600}}>✓ {l}</div>
							))}
						</div>
					</div>
				</div>

				{/* Right: dot grid */}
				<div style={{flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 20}}>
					<div style={{opacity: fade(f, 50, 20), fontSize: 22, color: COLORS.muted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const}}>
						Company Ownership
					</div>
					<div style={{display: 'flex', flexWrap: 'wrap' as const, width: 260, gap: 6}}>
						{Array.from({length: TOTAL_DOTS}, (_, i) => (
							<div key={i} style={{
								width: 20, height: 20, borderRadius: '50%',
								background: i === 0 ? COLORS.green : (i < visibleDots ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.04)'),
								transition: 'background 0.1s',
								boxShadow: i === 0 ? `0 0 12px ${COLORS.green}` : 'none',
							}} />
						))}
					</div>
					<div style={{opacity: fade(f, 60, 20), textAlign: 'center' as const}}>
						<div style={{display: 'inline-flex', alignItems: 'center', gap: 10}}>
							<div style={{width: 18, height: 18, borderRadius: '50%', background: COLORS.green}} />
							<span style={{color: COLORS.green, fontSize: 20, fontWeight: 700}}>= Your 1 share</span>
						</div>
						<div style={{color: COLORS.muted, fontSize: 18, marginTop: 6}}>Out of 100 total shares</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Common vs Preferred ─────────────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();
	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 62, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Types of Stock
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 52, textAlign: 'center' as const}}>
				Two main flavors — most investors deal with Common stock
			</div>

			<div style={{display: 'flex', gap: 44, width: '100%', maxWidth: 1400}}>
				{/* Common Stock */}
				<div style={{opacity: fade(f, 0, 30), transform: `translateX(${slideX(f, 0, 30, -50)}px)`, flex: 1, background: 'rgba(96,165,250,0.08)', border: '2px solid rgba(96,165,250,0.3)', borderRadius: 24, padding: '44px 48px'}}>
					<div style={{fontSize: 48, marginBottom: 12}}>📊</div>
					<div style={{fontSize: 46, fontWeight: 900, color: COLORS.blue, marginBottom: 20}}>Common Stock</div>
					<div style={{display: 'flex', flexDirection: 'column' as const, gap: 16}}>
						{[
							['Voting rights', 'Vote on company decisions (mergers, board)'],
							['Dividends (optional)', 'Company may pay you a portion of profits'],
							['Growth potential', 'Profit from stock price increases'],
							['Last in line', 'Paid after debt/preferred holders if company fails'],
						].map(([t, d]) => (
							<div key={t} style={{background: 'rgba(96,165,250,0.08)', borderRadius: 12, padding: '16px 20px'}}>
								<div style={{color: COLORS.blue, fontSize: 22, fontWeight: 700}}>✓ {t}</div>
								<div style={{color: COLORS.muted, fontSize: 19, marginTop: 4}}>{d}</div>
							</div>
						))}
					</div>
					<div style={{marginTop: 24, background: 'rgba(96,165,250,0.15)', borderRadius: 10, padding: '12px 20px', color: COLORS.blueLight, fontSize: 20, fontWeight: 600, textAlign: 'center' as const}}>
						👉 This is what most retail investors buy
					</div>
				</div>

				{/* Preferred Stock */}
				<div style={{opacity: fade(f, 60, 30), transform: `translateX(${slideX(f, 60, 30, 50)}px)`, flex: 1, background: 'rgba(245,158,11,0.08)', border: '2px solid rgba(245,158,11,0.3)', borderRadius: 24, padding: '44px 48px'}}>
					<div style={{fontSize: 48, marginBottom: 12}}>⭐</div>
					<div style={{fontSize: 46, fontWeight: 900, color: COLORS.gold, marginBottom: 20}}>Preferred Stock</div>
					<div style={{display: 'flex', flexDirection: 'column' as const, gap: 16}}>
						{[
							['Fixed dividends', 'Receive regular, fixed dividend payments'],
							['Priority in payouts', 'Paid before common shareholders'],
							['No voting rights', 'Usually cannot vote on company matters'],
							['Less price growth', 'Less potential for big price increases'],
						].map(([t, d]) => (
							<div key={t} style={{background: 'rgba(245,158,11,0.08)', borderRadius: 12, padding: '16px 20px'}}>
								<div style={{color: COLORS.gold, fontSize: 22, fontWeight: 700}}>✓ {t}</div>
								<div style={{color: COLORS.muted, fontSize: 19, marginTop: 4}}>{d}</div>
							</div>
						))}
					</div>
					<div style={{marginTop: 24, background: 'rgba(245,158,11,0.15)', borderRadius: 10, padding: '12px 20px', color: COLORS.goldLight, fontSize: 20, fontWeight: 600, textAlign: 'center' as const}}>
						👉 Popular with income-focused investors
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 3: How to Buy a Stock ───────────────────────────────────────────────
const Beat3: React.FC = () => {
	const f = useCurrentFrame();
	const steps = [
		{num: '1', title: 'Open a Brokerage Account', desc: 'Use a broker like Fidelity, TD Ameritrade, or Robinhood. Takes 10 minutes online.', emoji: '🏦', color: COLORS.cyan},
		{num: '2', title: 'Fund Your Account', desc: 'Transfer money from your bank. Many brokers have no minimum deposit.', emoji: '💵', color: COLORS.green},
		{num: '3', title: 'Search for a Stock', desc: 'Look up a company by name or ticker symbol (e.g., AAPL for Apple).', emoji: '🔍', color: COLORS.blue},
		{num: '4', title: 'Place Your Order', desc: 'Enter how many shares you want to buy and confirm the transaction.', emoji: '✅', color: COLORS.gold},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 62, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				How to Buy a Stock
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 52, textAlign: 'center' as const}}>
				It's easier than you think — takes about 15 minutes to get started
			</div>

			<div style={{display: 'flex', gap: 24, width: '100%', maxWidth: 1600}}>
				{steps.map(({num, title, desc, emoji, color}, i) => (
					<div key={num} style={{flex: 1}}>
						<div style={{opacity: fade(f, i * 70, 30), transform: `translateY(${slideY(f, i * 70, 30, 50)}px)`, background: COLORS.card, border: `1px solid ${color}40`, borderRadius: 20, padding: '36px 28px', height: '100%', display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const, gap: 16}}>
							<div style={{width: 60, height: 60, borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 900, color}}>
								{num}
							</div>
							<div style={{fontSize: 44}}>{emoji}</div>
							<div style={{fontSize: 26, fontWeight: 800, color}}>{title}</div>
							<div style={{fontSize: 22, color: COLORS.muted, lineHeight: 1.55}}>{desc}</div>
						</div>
					</div>
				))}
			</div>

			{/* Market vs Limit order */}
			<div style={{opacity: fade(f, 340, 30), marginTop: 44, display: 'flex', gap: 32, width: '100%', maxWidth: 1400}}>
				{[
					{type: 'Market Order', desc: 'Buy immediately at the current market price. Fast but less control.', color: COLORS.green},
					{type: 'Limit Order', desc: 'Set a maximum price you\'re willing to pay. Only executes at your price or better.', color: COLORS.blue},
					{type: 'Stop-Loss Order', desc: 'Automatically sells if price drops to a set level. Protects from big losses.', color: COLORS.red},
				].map(({type, desc, color}) => (
					<div key={type} style={{flex: 1, background: COLORS.card, border: `1px solid ${color}40`, borderRadius: 14, padding: '20px 24px'}}>
						<div style={{fontSize: 22, fontWeight: 700, color, marginBottom: 8}}>{type}</div>
						<div style={{fontSize: 19, color: COLORS.muted, lineHeight: 1.5}}>{desc}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 4: Key Metrics ──────────────────────────────────────────────────────
const Beat4: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Animate P/E ratio counter
	const peValue = Math.round(interpolate(f, [60, 160], [0, 25], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
	const epsValue = interpolate(f, [80, 180], [0, 4.73], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}).toFixed(2);
	const mcapS = spr(f, 100, fps, 80, 200);

	const metrics = [
		{key: 'P/E Ratio', value: `${peValue}x`, desc: 'Price you pay per $1 of company earnings. Lower = potentially cheaper.', color: COLORS.blue, delay: 40},
		{key: 'EPS', value: `$${epsValue}`, desc: 'Earnings Per Share — how much profit the company makes per share.', color: COLORS.green, delay: 60},
		{key: 'Market Cap', value: '$2.8T', desc: 'Total value of all shares. Mega-cap = $200B+. Small-cap = under $2B.', color: COLORS.gold, delay: 80},
		{key: 'Dividend Yield', value: '1.7%', desc: 'Annual dividend as % of stock price. Income investors love this.', color: COLORS.purple, delay: 100},
		{key: '52-Week Range', value: '$165–$199', desc: 'Highest and lowest price over past year. Context for current price.', color: COLORS.cyan, delay: 120},
		{key: 'Volume', value: '58.4M', desc: 'Shares traded today. High volume = more liquidity and interest.', color: COLORS.muted, delay: 140},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 62, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Reading Key Stock Metrics
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 44, textAlign: 'center' as const}}>
				These numbers tell the story behind any stock
			</div>

			<div style={{transform: `scale(${mcapS * 0.05 + 0.95})`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, width: '100%', maxWidth: 1500}}>
				{metrics.map(({key, value, desc, color, delay}) => (
					<div key={key} style={{opacity: fade(f, delay, 25), background: COLORS.card, border: `1px solid ${color}35`, borderRadius: 16, padding: '28px 32px'}}>
						<div style={{fontSize: 20, color: COLORS.muted, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: 8}}>{key}</div>
						<div style={{fontSize: 48, fontWeight: 900, color, marginBottom: 10}}>{value}</div>
						<div style={{fontSize: 20, color: COLORS.muted, lineHeight: 1.5}}>{desc}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ─── Main component ───────────────────────────────────────────────────────────
export const WhatAreStocks: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(16,185,129,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />

			<Sequence from={0} durationInFrames={900}>
				<Beat1 />
			</Sequence>
			<Sequence from={900} durationInFrames={900}>
				<Beat2 />
			</Sequence>
			<Sequence from={1800} durationInFrames={1000}>
				<Beat3 />
			</Sequence>
			<Sequence from={2800} durationInFrames={800}>
				<Beat4 />
			</Sequence>
		</AbsoluteFill>
	);
};
