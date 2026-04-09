import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {buildChartPath, COLORS, fade, prog, slideX, slideY, STOCK_DATA, spr} from '../utils';

// ─── Shared sub-components ───────────────────────────────────────────────────

const SectionHeader: React.FC<{num: string; title: string; color: string; f: number}> = ({num, title, color, f}) => (
	<div style={{textAlign: 'center' as const, marginBottom: 56}}>
		<div style={{opacity: fade(f, 0, 20), transform: `translateY(${slideY(f, 0, 20, 30)}px)`, color, fontSize: 22, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase' as const, marginBottom: 12}}>
			SECTION {num}
		</div>
		<div style={{opacity: fade(f, 10, 25), transform: `translateY(${slideY(f, 10, 25, 40)}px)`, fontSize: 80, fontWeight: 900, color: COLORS.text, lineHeight: 1.05, letterSpacing: -2}}>
			{title}
		</div>
		<div style={{opacity: fade(f, 30, 20), width: 80, height: 4, background: color, borderRadius: 4, margin: '20px auto 0'}} />
	</div>
);

// ─── Beat 1: Hook + Definition ───────────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const titleS = spr(f, 0, fps, 70, 200);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 120px'}}>
			<SectionHeader num="01" title="What Is the Stock Market?" color={COLORS.cyan} f={f} />

			<div style={{opacity: fade(f, 40, 30), transform: `scale(${titleS * 0.15 + 0.85})`, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: '48px 60px', maxWidth: 1200, textAlign: 'center' as const}}>
				<p style={{fontSize: 44, color: COLORS.text, margin: 0, lineHeight: 1.55, fontWeight: 500}}>
					Did you know you can own a piece of{' '}
					<span style={{color: COLORS.cyan, fontWeight: 700}}>Apple</span>,{' '}
					<span style={{color: COLORS.green, fontWeight: 700}}>Tesla</span>, or{' '}
					<span style={{color: COLORS.gold, fontWeight: 700}}>Amazon</span>?
				</p>
				<p style={{fontSize: 34, color: COLORS.muted, margin: '28px 0 0', lineHeight: 1.5}}>
					The stock market is a marketplace where buyers and sellers trade ownership stakes in publicly listed companies.
				</p>
			</div>

			{/* Buyer ↔ Seller visual */}
			<div style={{opacity: fade(f, 200, 30), display: 'flex', alignItems: 'center', gap: 48, marginTop: 52}}>
				{[
					{label: 'BUYERS', emoji: '🛒', color: COLORS.green},
					{label: '↔', emoji: '', color: COLORS.muted},
					{label: 'SELLERS', emoji: '💼', color: COLORS.red},
				].map(({label, emoji, color}) => (
					<div key={label} style={{textAlign: 'center' as const}}>
						{emoji && <div style={{fontSize: 56}}>{emoji}</div>}
						<div style={{fontSize: label === '↔' ? 60 : 22, color, fontWeight: 700, letterSpacing: label === '↔' ? 0 : 4}}>{label}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Stock price chart ───────────────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();
	const W = 1200, H = 340;
	const pathD = buildChartPath(STOCK_DATA, W, H, 24);
	const fillD = pathD + ` L ${W} ${H} L 0 ${H} Z`;
	const clipW = prog(f, 30, 280) * W;

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 120px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 52, fontWeight: 800, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Markets Move. <span style={{color: COLORS.green}}>Historically Upward.</span>
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 44, textAlign: 'center' as const}}>
				The S&P 500 has averaged ~10% annual returns over the long run
			</div>

			<div style={{opacity: fade(f, 20, 25), background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: '36px 44px', width: '100%'}}>
				<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
					<span style={{color: COLORS.muted, fontSize: 22, fontWeight: 600}}>S&P 500 — Long-term trend</span>
					<span style={{color: COLORS.green, fontSize: 22, fontWeight: 700}}>+57% overall</span>
				</div>
				<svg width={W} height={H} style={{overflow: 'visible'}}>
					<defs>
						<linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={COLORS.green} stopOpacity={0.3} />
							<stop offset="100%" stopColor={COLORS.green} stopOpacity={0} />
						</linearGradient>
						<clipPath id="chartReveal">
							<rect x={0} y={0} width={clipW} height={H + 10} />
						</clipPath>
					</defs>
					<path d={fillD} fill="url(#greenGrad)" clipPath="url(#chartReveal)" />
					<path d={pathD} fill="none" stroke={COLORS.green} strokeWidth={3.5} clipPath="url(#chartReveal)" strokeLinecap="round" />
					{/* Animated dot at chart head */}
					{clipW > 10 && (() => {
						const idx = Math.min(Math.floor(prog(f, 30, 280) * (STOCK_DATA.length - 1)), STOCK_DATA.length - 1);
						const min = Math.min(...STOCK_DATA), max = Math.max(...STOCK_DATA);
						const dotX = (idx / (STOCK_DATA.length - 1)) * W;
						const dotY = H - 24 - ((STOCK_DATA[idx] - min) / (max - min)) * (H - 48);
						return (
							<circle cx={dotX} cy={dotY} r={8} fill={COLORS.green} />
						);
					})()}
				</svg>
				<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 12}}>
					<span style={{color: COLORS.muted, fontSize: 18}}>Past</span>
					<span style={{color: COLORS.muted, fontSize: 18}}>Present</span>
				</div>
			</div>

			{/* Stats row */}
			<div style={{opacity: fade(f, 350, 30), display: 'flex', gap: 32, marginTop: 40}}>
				{[
					{label: 'Global Market Cap', value: '$100T+', color: COLORS.cyan},
					{label: 'Daily Volume (US)', value: '$400B+', color: COLORS.gold},
					{label: 'Listed Companies', value: '40,000+', color: COLORS.purple},
				].map(({label, value, color}) => (
					<div key={label} style={{background: COLORS.card, border: `1px solid ${color}40`, borderRadius: 14, padding: '20px 32px', textAlign: 'center' as const, flex: 1}}>
						<div style={{fontSize: 40, fontWeight: 800, color}}>{value}</div>
						<div style={{fontSize: 18, color: COLORS.muted, marginTop: 6}}>{label}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 3: Bull vs Bear ─────────────────────────────────────────────────────
const Beat3: React.FC = () => {
	const f = useCurrentFrame();

	const bullS = spr(f, 0, 30, 80, 200);
	const bearS = spr(f, 60, 30, 80, 200);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 64, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Market Cycles
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 28, color: COLORS.muted, marginBottom: 60, textAlign: 'center' as const}}>
				Markets swing between two main phases
			</div>

			<div style={{display: 'flex', gap: 48, width: '100%', maxWidth: 1400}}>
				{/* Bull Market */}
				<div style={{opacity: fade(f, 0, 30), transform: `scale(${bullS * 0.15 + 0.85})`, flex: 1, background: 'rgba(16,185,129,0.08)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: 24, padding: '52px 48px', textAlign: 'center' as const}}>
					<div style={{fontSize: 100}}>🐂</div>
					<div style={{fontSize: 56, fontWeight: 900, color: COLORS.green, margin: '16px 0 8px'}}>Bull Market</div>
					<div style={{fontSize: 24, color: COLORS.muted, lineHeight: 1.6, marginBottom: 32}}>
						Prices are rising — investors are optimistic and buying. Markets trend upward for extended periods.
					</div>
					<div style={{display: 'flex', flexDirection: 'column' as const, gap: 14}}>
						{['📈 Rising stock prices', '😊 High investor confidence', '📰 Positive economic news', '💸 Easy credit conditions'].map(b => (
							<div key={b} style={{background: 'rgba(16,185,129,0.1)', borderRadius: 10, padding: '12px 20px', color: COLORS.greenLight, fontSize: 22, textAlign: 'left' as const}}>
								{b}
							</div>
						))}
					</div>
				</div>

				{/* Bear Market */}
				<div style={{opacity: fade(f, 60, 30), transform: `scale(${bearS * 0.15 + 0.85})`, flex: 1, background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.3)', borderRadius: 24, padding: '52px 48px', textAlign: 'center' as const}}>
					<div style={{fontSize: 100}}>🐻</div>
					<div style={{fontSize: 56, fontWeight: 900, color: COLORS.red, margin: '16px 0 8px'}}>Bear Market</div>
					<div style={{fontSize: 24, color: COLORS.muted, lineHeight: 1.6, marginBottom: 32}}>
						Prices fall 20%+ from recent highs. Fear dominates. Often linked to economic downturns or crises.
					</div>
					<div style={{display: 'flex', flexDirection: 'column' as const, gap: 14}}>
						{['📉 Falling stock prices', '😨 High fear & uncertainty', '📰 Negative economic news', '🏦 Tighter credit conditions'].map(b => (
							<div key={b} style={{background: 'rgba(239,68,68,0.1)', borderRadius: 10, padding: '12px 20px', color: COLORS.redLight, fontSize: 22, textAlign: 'left' as const}}>
								{b}
							</div>
						))}
					</div>
				</div>
			</div>

			<div style={{opacity: fade(f, 200, 30), marginTop: 44, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: '20px 44px', textAlign: 'center' as const}}>
				<p style={{color: COLORS.muted, fontSize: 24, margin: 0}}>
					💡 <strong style={{color: COLORS.gold}}>Pro tip:</strong> Since 1900, the US market has spent ~78% of its time in a bull phase. Patient investors are rewarded.
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 4: Market indices + Hours ──────────────────────────────────────────
const Beat4: React.FC = () => {
	const f = useCurrentFrame();
	const indices = [
		{name: 'S&P 500', desc: 'Top 500 US companies', value: '5,287', chg: '+18.2% YTD', color: COLORS.blue, delay: 0},
		{name: 'Dow Jones', desc: '30 largest US stocks', value: '39,142', chg: '+12.5% YTD', color: COLORS.gold, delay: 60},
		{name: 'NASDAQ', desc: 'Tech-heavy index', value: '16,428', chg: '+22.7% YTD', color: COLORS.purple, delay: 120},
		{name: 'Russell 2000', desc: '2000 small-cap stocks', value: '2,076', chg: '+9.4% YTD', color: COLORS.cyan, delay: 180},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 64, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Market Indices
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 28, color: COLORS.muted, marginBottom: 52, textAlign: 'center' as const}}>
				These benchmarks track the overall health of the market
			</div>

			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, width: '100%', maxWidth: 1400}}>
				{indices.map(({name, desc, value, chg, color, delay}) => (
					<div key={name} style={{opacity: fade(f, delay, 30), transform: `translateX(${slideX(f, delay, 30, 40)}px)`, background: COLORS.card, border: `1px solid ${color}40`, borderRadius: 18, padding: '32px 40px', display: 'flex', alignItems: 'center', gap: 28}}>
						<div style={{width: 10, alignSelf: 'stretch', background: color, borderRadius: 6, flexShrink: 0}} />
						<div style={{flex: 1}}>
							<div style={{fontSize: 30, fontWeight: 800, color, marginBottom: 4}}>{name}</div>
							<div style={{fontSize: 20, color: COLORS.muted, marginBottom: 16}}>{desc}</div>
							<div style={{fontSize: 48, fontWeight: 900, color: COLORS.text}}>{value}</div>
							<div style={{fontSize: 22, color: COLORS.green, fontWeight: 600, marginTop: 6}}>{chg}</div>
						</div>
					</div>
				))}
			</div>

			{/* Market hours */}
			<div style={{opacity: fade(f, 300, 30), marginTop: 40, display: 'flex', gap: 32, alignItems: 'center', background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: '20px 48px'}}>
				<span style={{fontSize: 40}}>🕐</span>
				<div>
					<div style={{fontSize: 24, fontWeight: 700, color: COLORS.text}}>US Market Hours</div>
					<div style={{fontSize: 20, color: COLORS.muted}}>Monday–Friday  •  9:30 AM – 4:00 PM ET</div>
				</div>
				<div style={{width: 1, height: 56, background: COLORS.cardBorder, margin: '0 12px'}} />
				<div>
					<div style={{fontSize: 22, color: COLORS.gold, fontWeight: 600}}>Pre-market: 4–9:30 AM</div>
					<div style={{fontSize: 22, color: COLORS.blue, fontWeight: 600}}>After-hours: 4–8 PM</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Main component ───────────────────────────────────────────────────────────
export const WhatIsStockMarket: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />

			<Sequence from={0} durationInFrames={900}>
				<Beat1 />
			</Sequence>
			<Sequence from={900} durationInFrames={1200}>
				<Beat2 />
			</Sequence>
			<Sequence from={2100} durationInFrames={900}>
				<Beat3 />
			</Sequence>
			<Sequence from={3000} durationInFrames={600}>
				<Beat4 />
			</Sequence>
		</AbsoluteFill>
	);
};
