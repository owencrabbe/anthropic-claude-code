import {AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, prog, slideX, slideY, spr} from '../utils';

const SectionHeader: React.FC<{num: string; title: string; color: string; f: number}> = ({num, title, color, f}) => (
	<div style={{textAlign: 'center' as const, marginBottom: 48}}>
		<div style={{opacity: fade(f, 0, 20), color, fontSize: 22, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase' as const, marginBottom: 12}}>SECTION {num}</div>
		<div style={{opacity: fade(f, 10, 25), transform: `translateY(${slideY(f, 10, 25, 40)}px)`, fontSize: 80, fontWeight: 900, color: COLORS.text, lineHeight: 1.05, letterSpacing: -2}}>{title}</div>
		<div style={{opacity: fade(f, 30, 20), width: 80, height: 4, background: color, borderRadius: 4, margin: '20px auto 0'}} />
	</div>
);

// ─── Beat 1: What Are Futures? ────────────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const cardS = spr(f, 40, fps, 70, 200);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 100px'}}>
			<SectionHeader num="04" title="Futures Trading 101" color={COLORS.blue} f={f} />

			<div style={{opacity: fade(f, 40, 30), transform: `scale(${cardS * 0.1 + 0.9})`, background: COLORS.card, border: `2px solid ${COLORS.blue}40`, borderRadius: 24, padding: '52px 60px', maxWidth: 1200, textAlign: 'center' as const, marginBottom: 44}}>
				<div style={{fontSize: 60}}>🔮</div>
				<p style={{fontSize: 40, color: COLORS.text, margin: '16px 0', lineHeight: 1.55, fontWeight: 500}}>
					A <strong style={{color: COLORS.blue}}>futures contract</strong> is a legal agreement to buy or sell an asset at a <strong style={{color: COLORS.blue}}>predetermined price</strong> at a <strong style={{color: COLORS.blue}}>specified future date</strong>.
				</p>
				<p style={{fontSize: 28, color: COLORS.muted, margin: '16px 0 0', lineHeight: 1.5}}>
					Unlike options, futures are an <strong style={{color: COLORS.blueLight}}>obligation</strong> — both parties must complete the contract.
				</p>
			</div>

			<div style={{opacity: fade(f, 200, 30), display: 'flex', gap: 28, width: '100%', maxWidth: 1200}}>
				{[
					{label: 'Both parties obligated', icon: '🤝', color: COLORS.blue},
					{label: 'Set price today', icon: '💰', color: COLORS.gold},
					{label: 'Settle in the future', icon: '📅', color: COLORS.purple},
					{label: 'Highly leveraged', icon: '⚡', color: COLORS.red},
				].map(({label, icon, color}) => (
					<div key={label} style={{flex: 1, background: `${color}10`, border: `1px solid ${color}40`, borderRadius: 14, padding: '20px 16px', textAlign: 'center' as const}}>
						<div style={{fontSize: 40, marginBottom: 10}}>{icon}</div>
						<div style={{fontSize: 20, fontWeight: 700, color, lineHeight: 1.4}}>{label}</div>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Origins & How They Work ─────────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();
	const arrowP = prog(f, 80, 120);
	const arrowW = arrowP * 300;

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 56, fontWeight: 900, color: COLORS.text, marginBottom: 10, textAlign: 'center' as const}}>
				Born From the Farming Industry 🌾
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 24, color: COLORS.muted, marginBottom: 52, textAlign: 'center' as const}}>
				The original purpose: protect farmers from price swings
			</div>

			{/* Farmer ↔ Baker diagram */}
			<div style={{opacity: fade(f, 30, 30), display: 'flex', alignItems: 'center', gap: 0, width: '100%', maxWidth: 1300, marginBottom: 44}}>
				{/* Farmer card */}
				<div style={{flex: 1, background: 'rgba(16,185,129,0.08)', border: '2px solid rgba(16,185,129,0.3)', borderRadius: 20, padding: '36px 36px', textAlign: 'center' as const}}>
					<div style={{fontSize: 80}}>👨‍🌾</div>
					<div style={{fontSize: 32, fontWeight: 800, color: COLORS.green, marginBottom: 10}}>Wheat Farmer</div>
					<p style={{fontSize: 21, color: COLORS.muted, margin: 0, lineHeight: 1.55}}>
						Worried about prices <em style={{color: COLORS.red}}>falling</em> by harvest time. Wants to lock in today's price.
					</p>
					<div style={{marginTop: 20, background: 'rgba(16,185,129,0.15)', borderRadius: 10, padding: '12px 20px', color: COLORS.greenLight, fontSize: 20, fontWeight: 600}}>
						Agrees to sell wheat at <br/><strong>$200/bushel</strong> in 3 months
					</div>
				</div>

				{/* Arrow */}
				<div style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', padding: '0 20px', minWidth: 200}}>
					<div style={{overflow: 'hidden', width: arrowW, height: 4, background: COLORS.blue, borderRadius: 4, marginBottom: 8}} />
					<div style={{fontSize: 18, color: COLORS.blue, fontWeight: 700, textAlign: 'center' as const}}>FUTURES CONTRACT</div>
					<div style={{overflow: 'hidden', width: arrowW, height: 4, background: COLORS.blue, borderRadius: 4, marginTop: 8}} />
				</div>

				{/* Buyer card */}
				<div style={{flex: 1, background: 'rgba(96,165,250,0.08)', border: '2px solid rgba(96,165,250,0.3)', borderRadius: 20, padding: '36px 36px', textAlign: 'center' as const}}>
					<div style={{fontSize: 80}}>👨‍🍳</div>
					<div style={{fontSize: 32, fontWeight: 800, color: COLORS.blue, marginBottom: 10}}>Bread Maker</div>
					<p style={{fontSize: 21, color: COLORS.muted, margin: 0, lineHeight: 1.55}}>
						Worried about prices <em style={{color: COLORS.red}}>rising</em> by the time they need wheat. Wants budget certainty.
					</p>
					<div style={{marginTop: 20, background: 'rgba(96,165,250,0.15)', borderRadius: 10, padding: '12px 20px', color: COLORS.blueLight, fontSize: 20, fontWeight: 600}}>
						Agrees to buy wheat at <br/><strong>$200/bushel</strong> in 3 months
					</div>
				</div>
			</div>

			{/* Outcome boxes */}
			<div style={{opacity: fade(f, 250, 30), display: 'flex', gap: 28, width: '100%', maxWidth: 1300}}>
				<div style={{flex: 1, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: '20px 28px', textAlign: 'center' as const}}>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 8}}>If price drops to $150</div>
					<div style={{fontSize: 26, color: COLORS.green, fontWeight: 700}}>🧑‍🌾 Farmer: saved $50/bushel</div>
					<div style={{fontSize: 22, color: COLORS.muted}}>👨‍🍳 Baker: pays more than market price</div>
				</div>
				<div style={{flex: 1, background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 16, padding: '20px 28px', textAlign: 'center' as const}}>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 8}}>If price rises to $250</div>
					<div style={{fontSize: 22, color: COLORS.muted}}>🧑‍🌾 Farmer: gets less than market price</div>
					<div style={{fontSize: 26, color: COLORS.green, fontWeight: 700}}>👨‍🍳 Baker: saved $50/bushel</div>
				</div>
				<div style={{flex: 1, background: COLORS.card, border: `1px solid ${COLORS.cyan}40`, borderRadius: 16, padding: '20px 28px', textAlign: 'center' as const}}>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 8}}>The key benefit</div>
					<div style={{fontSize: 24, color: COLORS.cyan, fontWeight: 700}}>Both sides get <strong>certainty</strong> and can plan their business without worrying about price swings</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 3: Modern Futures + Leverage ───────────────────────────────────────
const Beat3: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const warnS = spr(f, 260, fps, 60, 200);

	// Leverage meter
	const leverageProgress = prog(f, 80, 120);
	const leverageValue = Math.round(interpolate(f, [80, 200], [1, 10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));

	const futuresTypes = [
		{name: 'Commodities', items: ['Oil (CL)', 'Gold (GC)', 'Wheat (ZW)', 'Natural Gas'], emoji: '⛽', color: COLORS.gold},
		{name: 'Stock Indices', items: ['S&P 500 (ES)', 'NASDAQ (NQ)', 'Dow Jones (YM)', 'Russell (RTY)'], emoji: '📊', color: COLORS.blue},
		{name: 'Currencies', items: ['EUR/USD', 'GBP/USD', 'JPY', 'AUD/USD'], emoji: '💱', color: COLORS.purple},
		{name: 'Crypto', items: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Micro BTC', 'Micro ETH'], emoji: '₿', color: COLORS.cyan},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 56, fontWeight: 900, color: COLORS.text, marginBottom: 12, textAlign: 'center' as const}}>
				Modern Futures Markets
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 24, color: COLORS.muted, marginBottom: 40, textAlign: 'center' as const}}>
				Today's futures go far beyond agriculture
			</div>

			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', maxWidth: 1400, marginBottom: 36}}>
				{futuresTypes.map(({name, items, emoji, color}, i) => (
					<div key={name} style={{opacity: fade(f, i * 40, 25), transform: `translateX(${slideX(f, i * 40, 25, i % 2 === 0 ? -40 : 40)}px)`, background: COLORS.card, border: `1px solid ${color}35`, borderRadius: 16, padding: '28px 32px'}}>
						<div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16}}>
							<span style={{fontSize: 40}}>{emoji}</span>
							<span style={{fontSize: 30, fontWeight: 800, color}}>{name}</span>
						</div>
						<div style={{display: 'flex', flexWrap: 'wrap' as const, gap: 10}}>
							{items.map(item => (
								<div key={item} style={{background: `${color}15`, borderRadius: 8, padding: '6px 16px', color: color, fontSize: 18, fontWeight: 600}}>
									{item}
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			{/* Leverage explanation */}
			<div style={{opacity: fade(f, 180, 30), display: 'flex', gap: 36, width: '100%', maxWidth: 1400, alignItems: 'center'}}>
				<div style={{flex: 1, background: 'rgba(96,165,250,0.08)', border: '2px solid rgba(96,165,250,0.3)', borderRadius: 18, padding: '28px 36px'}}>
					<div style={{fontSize: 30, fontWeight: 800, color: COLORS.blue, marginBottom: 12}}>⚡ Leverage & Margin</div>
					<p style={{fontSize: 22, color: COLORS.muted, margin: 0, lineHeight: 1.6}}>
						Futures require only a small <strong style={{color: COLORS.blue}}>margin deposit</strong> (typically 3–12% of contract value) to control a large position.
					</p>
					<div style={{marginTop: 20, fontSize: 24, color: COLORS.text}}>
						Control a $100,000 contract with just <span style={{color: COLORS.gold, fontWeight: 800}}>${Math.round(100000 * 0.05).toLocaleString()}</span> margin
					</div>
				</div>

				{/* Leverage meter */}
				<div style={{background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 18, padding: '28px 36px', textAlign: 'center' as const, minWidth: 280}}>
					<div style={{fontSize: 22, color: COLORS.muted, marginBottom: 16}}>Leverage Multiplier</div>
					<div style={{fontSize: 80, fontWeight: 900, color: leverageValue > 5 ? COLORS.red : COLORS.green}}>{leverageValue}x</div>
					<div style={{width: '100%', height: 12, background: 'rgba(255,255,255,0.1)', borderRadius: 8, overflow: 'hidden'}}>
						<div style={{width: `${leverageProgress * 100}%`, height: '100%', background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.red})`, borderRadius: 8}} />
					</div>
					<div style={{display: 'flex', justifyContent: 'space-between', marginTop: 8}}>
						<span style={{color: COLORS.green, fontSize: 16}}>Low risk</span>
						<span style={{color: COLORS.red, fontSize: 16}}>High risk</span>
					</div>
				</div>
			</div>

			{/* Warning */}
			<div style={{opacity: fade(f, 260, 30), transform: `scale(${warnS * 0.05 + 0.95})`, marginTop: 28, background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.4)', borderRadius: 14, padding: '20px 44px', width: '100%', maxWidth: 1400, textAlign: 'center' as const}}>
				<p style={{color: COLORS.redLight, fontSize: 22, margin: 0, lineHeight: 1.5}}>
					⚠️ <strong>Leverage cuts both ways.</strong> A 10x leveraged position means a 10% price move against you = 100% loss of your margin. Futures are for experienced traders only.
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const FuturesTrading: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(96,165,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />
			<Sequence from={0} durationInFrames={800}>
				<Beat1 />
			</Sequence>
			<Sequence from={800} durationInFrames={1000}>
				<Beat2 />
			</Sequence>
			<Sequence from={1800} durationInFrames={900}>
				<Beat3 />
			</Sequence>
		</AbsoluteFill>
	);
};
