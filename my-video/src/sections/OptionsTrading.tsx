import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, prog, slideX, slideY, spr} from '../utils';

const SectionHeader: React.FC<{num: string; title: string; color: string; f: number}> = ({num, title, color, f}) => (
	<div style={{textAlign: 'center' as const, marginBottom: 48}}>
		<div style={{opacity: fade(f, 0, 20), color, fontSize: 22, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase' as const, marginBottom: 12}}>SECTION {num}</div>
		<div style={{opacity: fade(f, 10, 25), transform: `translateY(${slideY(f, 10, 25, 40)}px)`, fontSize: 80, fontWeight: 900, color: COLORS.text, lineHeight: 1.05, letterSpacing: -2}}>{title}</div>
		<div style={{opacity: fade(f, 30, 20), width: 80, height: 4, background: color, borderRadius: 4, margin: '20px auto 0'}} />
	</div>
);

// ─── Beat 1: What Are Options? ────────────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cardS = spr(f, 40, fps, 70, 200);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<SectionHeader num="03" title="Options Trading 101" color={COLORS.gold} f={f} />

			<div style={{opacity: fade(f, 40, 30), transform: `scale(${cardS * 0.1 + 0.9})`, background: COLORS.card, border: `2px solid ${COLORS.gold}40`, borderRadius: 24, padding: '52px 60px', maxWidth: 1200, textAlign: 'center' as const, marginBottom: 40}}>
				<div style={{fontSize: 60}}>⚙️</div>
				<p style={{fontSize: 40, color: COLORS.text, margin: '16px 0', lineHeight: 1.55, fontWeight: 500}}>
					An <strong style={{color: COLORS.gold}}>option</strong> is a contract that gives you the <strong style={{color: COLORS.gold}}>RIGHT</strong> — but <em style={{color: COLORS.red}}>NOT the obligation</em> — to buy or sell a stock at a specific price before a specific date.
				</p>
				<p style={{fontSize: 28, color: COLORS.muted, margin: '16px 0 0', lineHeight: 1.5}}>
					You pay a <strong style={{color: COLORS.goldLight}}>premium</strong> upfront for this right.
				</p>
			</div>

			{/* Key terms */}
			<div style={{opacity: fade(f, 200, 30), display: 'flex', gap: 28, width: '100%', maxWidth: 1200}}>
				{[
					{term: 'Strike Price', def: 'The agreed price to buy/sell the stock', color: COLORS.blue},
					{term: 'Expiry Date', def: 'When the option contract expires', color: COLORS.purple},
					{term: 'Premium', def: 'The cost you pay for the contract', color: COLORS.gold},
				].map(({term, def, color}) => (
					<div key={term} style={{flex: 1, background: `${color}10`, border: `1px solid ${color}40`, borderRadius: 14, padding: '24px 28px', textAlign: 'center' as const}}>
						<div style={{fontSize: 24, fontWeight: 800, color, marginBottom: 10}}>{term}</div>
						<div style={{fontSize: 20, color: COLORS.muted, lineHeight: 1.5}}>{def}</div>
					</div>
				))}
			</div>

			<div style={{opacity: fade(f, 250, 30), marginTop: 32, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '16px 36px'}}>
				<p style={{color: COLORS.goldLight, fontSize: 22, margin: 0}}>
					💡 Options are available on stocks, ETFs, indices, and more. They're versatile but complex — perfect for educated traders.
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Call vs Put ──────────────────────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();

	// Payoff diagram data
	const W = 480, H = 220;
	const prices = Array.from({length: 60}, (_, i) => i * 2 + 80); // 80–198
	const strike = 140;
	const premium = 8;
	const chartProg = prog(f, 80, 200);

	// Call payoff
	const callPayoff = prices.map(p => Math.max(p - strike, 0) - premium);
	const putPayoff = prices.map(p => Math.max(strike - p, 0) - premium);
	const minY = -15, maxY = 50;
	const toX = (i: number) => (i / (prices.length - 1)) * W;
	const toY = (y: number) => H - ((y - minY) / (maxY - minY)) * H;
	const zeroY = toY(0);

	const buildPath = (payoff: number[]) =>
		payoff.map((y, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(y).toFixed(1)}`).join(' ');

	const callPath = buildPath(callPayoff);
	const putPath = buildPath(putPayoff);
	const clipW = chartProg * W;

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 62, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Two Types of Options
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 48, textAlign: 'center' as const}}>
				Each profits from a different direction in the market
			</div>

			<div style={{display: 'flex', gap: 44, width: '100%', maxWidth: 1500}}>
				{/* Call Option */}
				<div style={{opacity: fade(f, 0, 30), transform: `translateX(${slideX(f, 0, 30, -50)}px)`, flex: 1, background: 'rgba(16,185,129,0.08)', border: '2px solid rgba(16,185,129,0.35)', borderRadius: 24, padding: '36px 40px'}}>
					<div style={{fontSize: 48, fontWeight: 900, color: COLORS.green, marginBottom: 8}}>📈 Call Option</div>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 20}}>Right to <strong style={{color: COLORS.green}}>BUY</strong> at the strike price</div>

					<div style={{background: 'rgba(16,185,129,0.05)', borderRadius: 14, padding: '16px 20px', marginBottom: 20}}>
						<div style={{fontSize: 18, color: COLORS.muted, marginBottom: 6}}>Example: AAPL @ $150 strike</div>
						<div style={{fontSize: 20, color: COLORS.text}}>
							You pay <span style={{color: COLORS.gold}}>$8 premium</span><br/>
							If AAPL rises to $170 → profit <span style={{color: COLORS.green}}>$12/share</span><br/>
							If AAPL stays at $140 → loss <span style={{color: COLORS.red}}>$8 (premium)</span>
						</div>
					</div>

					{/* Payoff chart */}
					<svg width={W} height={H} style={{overflow: 'visible'}}>
						<defs>
							<clipPath id="callClip"><rect x={0} y={0} width={clipW} height={H + 10} /></clipPath>
						</defs>
						<line x1={0} y1={zeroY} x2={W} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="6,4" />
						<path d={callPath} fill="none" stroke={COLORS.green} strokeWidth={3} clipPath="url(#callClip)" strokeLinecap="round" />
						<text x={2} y={H - 4} fill={COLORS.muted} fontSize={14}>← Lower price</text>
						<text x={W - 100} y={H - 4} fill={COLORS.muted} fontSize={14}>Higher price →</text>
						<text x={2} y={14} fill={COLORS.green} fontSize={14}>Profit ↑</text>
					</svg>
					<div style={{marginTop: 16, fontSize: 20, color: COLORS.greenLight, fontWeight: 600}}>
						✅ Best when you expect the stock to RISE
					</div>
				</div>

				{/* Put Option */}
				<div style={{opacity: fade(f, 60, 30), transform: `translateX(${slideX(f, 60, 30, 50)}px)`, flex: 1, background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.35)', borderRadius: 24, padding: '36px 40px'}}>
					<div style={{fontSize: 48, fontWeight: 900, color: COLORS.red, marginBottom: 8}}>📉 Put Option</div>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 20}}>Right to <strong style={{color: COLORS.red}}>SELL</strong> at the strike price</div>

					<div style={{background: 'rgba(239,68,68,0.05)', borderRadius: 14, padding: '16px 20px', marginBottom: 20}}>
						<div style={{fontSize: 18, color: COLORS.muted, marginBottom: 6}}>Example: AAPL @ $150 strike</div>
						<div style={{fontSize: 20, color: COLORS.text}}>
							You pay <span style={{color: COLORS.gold}}>$8 premium</span><br/>
							If AAPL drops to $120 → profit <span style={{color: COLORS.green}}>$22/share</span><br/>
							If AAPL stays at $160 → loss <span style={{color: COLORS.red}}>$8 (premium)</span>
						</div>
					</div>

					{/* Payoff chart */}
					<svg width={W} height={H} style={{overflow: 'visible'}}>
						<defs>
							<clipPath id="putClip"><rect x={0} y={0} width={clipW} height={H + 10} /></clipPath>
						</defs>
						<line x1={0} y1={zeroY} x2={W} y2={zeroY} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="6,4" />
						<path d={putPath} fill="none" stroke={COLORS.red} strokeWidth={3} clipPath="url(#putClip)" strokeLinecap="round" />
						<text x={2} y={H - 4} fill={COLORS.muted} fontSize={14}>← Lower price</text>
						<text x={W - 100} y={H - 4} fill={COLORS.muted} fontSize={14}>Higher price →</text>
						<text x={2} y={14} fill={COLORS.green} fontSize={14}>Profit ↑</text>
					</svg>
					<div style={{marginTop: 16, fontSize: 20, color: COLORS.redLight, fontWeight: 600}}>
						✅ Best when you expect the stock to FALL
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 3: Time Decay & Risk Warning ────────────────────────────────────────
const Beat3: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const warnS = spr(f, 200, fps, 60, 200);

	// Time decay visualization
	const W = 600, H = 200;
	const decayProg = prog(f, 80, 200);
	const decayClipW = decayProg * W;
	const decayData = Array.from({length: 50}, (_, i) => {
		const t = i / 49; // 0 = far from expiry, 1 = expiry
		return H - 20 - (1 - t * t) * (H - 40); // theta decay curve
	});
	const decayPath = decayData.map((y, i) => `${i === 0 ? 'M' : 'L'} ${(i / 49 * W).toFixed(1)} ${y.toFixed(1)}`).join(' ');

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 56, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Options Premium & Time Decay (Theta)
			</div>

			<div style={{display: 'flex', gap: 44, width: '100%', maxWidth: 1400, marginBottom: 40}}>
				{/* Time decay chart */}
				<div style={{opacity: fade(f, 20, 30), flex: 1, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 20, padding: '32px 36px'}}>
					<div style={{fontSize: 26, fontWeight: 700, color: COLORS.gold, marginBottom: 6}}>⏰ Theta Decay</div>
					<div style={{fontSize: 20, color: COLORS.muted, marginBottom: 20}}>Options lose value every day as expiry approaches</div>
					<svg width={W} height={H} style={{overflow: 'visible'}}>
						<defs>
							<clipPath id="decayClip"><rect x={0} y={0} width={decayClipW} height={H + 10} /></clipPath>
						</defs>
						<line x1={0} y1={H - 20} x2={W} y2={H - 20} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
						<path d={decayPath} fill="none" stroke={COLORS.gold} strokeWidth={3.5} clipPath="url(#decayClip)" />
						<text x={2} y={H - 6} fill={COLORS.muted} fontSize={15}>Far from Expiry →</text>
						<text x={W - 120} y={H - 6} fill={COLORS.muted} fontSize={15}>Expiry Date</text>
						<text x={8} y={30} fill={COLORS.gold} fontSize={15}>Premium Value</text>
					</svg>
					<div style={{fontSize: 18, color: COLORS.muted, marginTop: 8}}>The closer to expiry → the faster the premium erodes</div>
				</div>

				{/* Key concepts */}
				<div style={{flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 20}}>
					{[
						{term: 'In the Money (ITM)', def: 'Option has intrinsic value. Call: stock > strike. Put: stock < strike.', color: COLORS.green},
						{term: 'At the Money (ATM)', def: 'Stock price equals the strike price. The most traded scenario.', color: COLORS.gold},
						{term: 'Out of the Money (OTM)', def: 'Option has no intrinsic value. Pure time value. High risk of expiring worthless.', color: COLORS.red},
					].map(({term, def, color}, i) => (
						<div key={term} style={{opacity: fade(f, 40 + i * 40, 25), background: `${color}10`, border: `1px solid ${color}35`, borderRadius: 14, padding: '20px 24px'}}>
							<div style={{fontSize: 22, fontWeight: 700, color, marginBottom: 6}}>{term}</div>
							<div style={{fontSize: 19, color: COLORS.muted, lineHeight: 1.5}}>{def}</div>
						</div>
					))}
				</div>
			</div>

			{/* Risk Warning */}
			<div style={{opacity: fade(f, 200, 30), transform: `scale(${warnS * 0.08 + 0.92})`, background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: 18, padding: '28px 52px', width: '100%', maxWidth: 1200, textAlign: 'center' as const}}>
				<div style={{fontSize: 32, fontWeight: 900, color: COLORS.red, marginBottom: 12}}>⚠️ OPTIONS RISK WARNING</div>
				<p style={{fontSize: 24, color: COLORS.redLight, margin: 0, lineHeight: 1.6}}>
					Options can expire <strong>completely worthless</strong>, meaning you lose 100% of your premium. They involve significant leverage and risk. <strong>Only trade options after thorough education and practice.</strong>
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const OptionsTrading: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(245,158,11,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />
			<Sequence from={0} durationInFrames={1000}>
				<Beat1 />
			</Sequence>
			<Sequence from={1000} durationInFrames={1400}>
				<Beat2 />
			</Sequence>
			<Sequence from={2400} durationInFrames={1200}>
				<Beat3 />
			</Sequence>
		</AbsoluteFill>
	);
};
