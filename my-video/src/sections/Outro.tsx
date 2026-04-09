import {AbsoluteFill, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, slideX, spr} from '../utils';

// ─── Beat 1: Quick Recap ──────────────────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	const recapItems = [
		{num: '01', title: 'Stock Market', desc: 'A marketplace to buy/sell ownership stakes in public companies', color: COLORS.cyan, emoji: '🏛️'},
		{num: '02', title: 'Stocks', desc: 'Shares of ownership. Common stock for growth, preferred for income', color: COLORS.green, emoji: '📊'},
		{num: '03', title: 'Options', desc: 'Right (not obligation) to buy/sell at a set price. High risk, high reward', color: COLORS.gold, emoji: '⚙️'},
		{num: '04', title: 'Futures', desc: 'Obligation to buy/sell at a set future price. Highly leveraged', color: COLORS.blue, emoji: '🔮'},
		{num: '05', title: 'Risk Management', desc: 'Diversify, use stop-losses, never risk more than you can lose', color: COLORS.purple, emoji: '🛡️'},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 68, fontWeight: 900, color: COLORS.text, marginBottom: 8, textAlign: 'center' as const}}>
				🎓 What You Learned Today
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 26, color: COLORS.muted, marginBottom: 48, textAlign: 'center' as const}}>
				Your complete Stock Market 101 crash course
			</div>

			<div style={{display: 'flex', flexDirection: 'column' as const, gap: 18, width: '100%', maxWidth: 1400}}>
				{recapItems.map(({num, title, desc, color, emoji}, i) => {
					const s = spr(f, i * 40, fps, 80, 200);
					return (
						<div key={num} style={{opacity: fade(f, i * 40, 25), transform: `translateX(${slideX(f, i * 40, 25, -50)}px) scale(${s * 0.05 + 0.95})`, background: COLORS.card, border: `1px solid ${color}40`, borderRadius: 16, padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 28}}>
							<div style={{width: 52, height: 52, borderRadius: '50%', background: `${color}20`, border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16, fontWeight: 900, color, letterSpacing: 0.5}}>
								{num}
							</div>
							<div style={{fontSize: 36}}>{emoji}</div>
							<div style={{flex: 1}}>
								<div style={{fontSize: 28, fontWeight: 800, color, marginBottom: 4}}>{title}</div>
								<div style={{fontSize: 20, color: COLORS.muted, lineHeight: 1.4}}>{desc}</div>
							</div>
							<div style={{width: 6, height: 52, background: color, borderRadius: 4, flexShrink: 0}} />
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Resources + Final Disclaimer ────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	const disclaimerS = spring({frame: Math.max(0, f - 300), fps, config: {damping: 160, stiffness: 60}});
	const disclaimerScale = disclaimerS * 0.1 + 0.9;

	const resources = [
		{name: 'Investopedia', desc: 'Best free encyclopedia for financial terms & concepts', url: 'investopedia.com', color: COLORS.blue},
		{name: 'FINRA', desc: 'Official US investor education & broker verification', url: 'finra.org', color: COLORS.green},
		{name: 'SEC.gov', desc: 'Official SEC investor tools and company filings (EDGAR)', url: 'sec.gov/investor', color: COLORS.gold},
		{name: 'Options Clearing Corp', desc: 'Free options education for beginners', url: 'optionseducation.org', color: COLORS.purple},
		{name: 'CME Group', desc: 'Learn futures trading from the world\'s largest exchange', url: 'cmegroup.com/education', color: COLORS.cyan},
		{name: 'Paper Trading', desc: 'Practice on Webull, ThinkOrSwim, or Investopedia Simulator', url: 'paper trade first!', color: COLORS.green},
	];

	const titleO = interpolate(f, [0, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const titleY = interpolate(f, [0, 30], [40, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			{/* Resources */}
			<div style={{opacity: titleO, transform: `translateY(${titleY}px)`, fontSize: 56, fontWeight: 900, color: COLORS.text, marginBottom: 8, textAlign: 'center' as const}}>
				📚 Learn More
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 24, color: COLORS.muted, marginBottom: 36, textAlign: 'center' as const}}>
				Free, trusted resources to continue your education
			</div>

			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, width: '100%', maxWidth: 1500, marginBottom: 36}}>
				{resources.map(({name, desc, url, color}, i) => (
					<div key={name} style={{opacity: fade(f, i * 25, 25), background: `${color}0D`, border: `1px solid ${color}35`, borderRadius: 14, padding: '22px 24px'}}>
						<div style={{fontSize: 22, fontWeight: 800, color, marginBottom: 6}}>{name}</div>
						<div style={{fontSize: 18, color: COLORS.muted, marginBottom: 10, lineHeight: 1.4}}>{desc}</div>
						<div style={{fontSize: 16, color: color, fontWeight: 600, fontFamily: 'monospace'}}>{url}</div>
					</div>
				))}
			</div>

			{/* Final Disclaimer — full and prominent */}
			<div style={{
				opacity: fade(f, 300, 40),
				transform: `scale(${disclaimerScale})`,
				background: 'rgba(239,68,68,0.12)',
				border: '2px solid rgba(239,68,68,0.5)',
				borderRadius: 20,
				padding: '36px 56px',
				width: '100%',
				maxWidth: 1400,
				textAlign: 'center' as const,
			}}>
				<div style={{fontSize: 36, fontWeight: 900, color: COLORS.red, marginBottom: 16}}>
					⚠️ IMPORTANT DISCLAIMER
				</div>
				<p style={{fontSize: 22, color: COLORS.redLight, margin: 0, lineHeight: 1.7}}>
					This video is strictly for <strong>educational and entertainment purposes only</strong>. Nothing presented here constitutes financial, investment, legal, or tax advice. Past market performance does not guarantee future results. All investing involves risk, including the potential loss of principal. <strong>Options and futures trading carry substantial risk of loss</strong> and are not suitable for all investors. Always consult a qualified and licensed financial advisor before making any investment decisions. <strong>Do your own research (DYOR).</strong>
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── End Card ────────────────────────────────────────────────────────────────
const EndCard: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const logoS = spr(f, 0, fps, 80, 200);
	const subS = spr(f, 60, fps, 70, 200);

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(124,58,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.08) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />
			<div style={{position: 'absolute', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', top: -100, left: -100}} />
			<div style={{position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', bottom: -100, right: -100}} />

			<div style={{opacity: fade(f, 0, 30), transform: `scale(${logoS * 0.2 + 0.8})`, textAlign: 'center' as const, zIndex: 1}}>
				<div style={{fontSize: 96, fontWeight: 900, letterSpacing: -3, lineHeight: 1}}>
					<span style={{color: COLORS.text}}>STOCK </span>
					<span style={{background: 'linear-gradient(135deg, #7C3AED, #60A5FA, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>MARKET</span>
				</div>
				<div style={{fontSize: 80, fontWeight: 900, color: COLORS.text, letterSpacing: -2}}>101</div>
			</div>

			<div style={{opacity: fade(f, 60, 30), transform: `scale(${subS * 0.1 + 0.9})`, marginTop: 36, textAlign: 'center' as const, zIndex: 1}}>
				<p style={{fontSize: 30, color: COLORS.muted, margin: 0}}>Thanks for watching! Keep learning, keep growing. 🚀</p>
				<div style={{display: 'flex', gap: 20, justifyContent: 'center', marginTop: 28}}>
					{['📈 Invest in yourself', '📚 Never stop learning', '🛡️ Manage your risk'].map(tag => (
						<div key={tag} style={{background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 100, padding: '10px 24px', color: COLORS.muted, fontSize: 20}}>
							{tag}
						</div>
					))}
				</div>
			</div>

			<div style={{opacity: fade(f, 120, 30), marginTop: 48, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '14px 36px', zIndex: 1}}>
				<p style={{color: '#FCA5A5', fontSize: 18, margin: 0}}>
					⚠️ Not financial advice. Educational purposes only. Always do your own research.
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const Outro: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />
			<Sequence from={0} durationInFrames={600}>
				<Beat1 />
			</Sequence>
			<Sequence from={600} durationInFrames={720}>
				<Beat2 />
			</Sequence>
			<Sequence from={1320} durationInFrames={480}>
				<EndCard />
			</Sequence>
		</AbsoluteFill>
	);
};
