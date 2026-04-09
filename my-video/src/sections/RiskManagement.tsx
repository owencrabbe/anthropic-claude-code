import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, fade, prog, slideX, slideY, spr} from '../utils';

const SectionHeader: React.FC<{num: string; title: string; color: string; f: number}> = ({num, title, color, f}) => (
	<div style={{textAlign: 'center' as const, marginBottom: 44}}>
		<div style={{opacity: fade(f, 0, 20), color, fontSize: 22, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase' as const, marginBottom: 12}}>SECTION {num}</div>
		<div style={{opacity: fade(f, 10, 25), transform: `translateY(${slideY(f, 10, 25, 40)}px)`, fontSize: 74, fontWeight: 900, color: COLORS.text, lineHeight: 1.05, letterSpacing: -2}}>{title}</div>
		<div style={{opacity: fade(f, 30, 20), width: 80, height: 4, background: color, borderRadius: 4, margin: '20px auto 0'}} />
	</div>
);

// ─── Beat 1: Diversification & Rules ─────────────────────────────────────────
const Beat1: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const eggS = spr(f, 30, fps, 80, 200);

	// Animated portfolio pie
	const pieProg = prog(f, 60, 150);

	const rules = [
		{rule: "Never risk more than 1–2% of your portfolio on a single trade", icon: '💰', color: COLORS.green},
		{rule: "Diversify across sectors: tech, healthcare, finance, energy", icon: '🧺', color: COLORS.blue},
		{rule: "Use stop-loss orders to cap your downside automatically", icon: '🛑', color: COLORS.red},
		{rule: "Never invest money you can't afford to lose completely", icon: '⚠️', color: COLORS.gold},
		{rule: "Have an exit strategy BEFORE you enter a trade", icon: '📋', color: COLORS.purple},
		{rule: "Paper trade first — practice with fake money before real money", icon: '📝', color: COLORS.cyan},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<SectionHeader num="05" title="Risk Management" color={COLORS.cyan} f={f} />

			<div style={{display: 'flex', gap: 48, width: '100%', maxWidth: 1500, alignItems: 'flex-start'}}>
				{/* Left: Don't put eggs in one basket */}
				<div style={{flex: 1.1}}>
					<div style={{opacity: fade(f, 30, 25), transform: `scale(${eggS * 0.1 + 0.9})`, background: COLORS.card, border: `1px solid ${COLORS.cyan}40`, borderRadius: 20, padding: '32px 36px', marginBottom: 28, textAlign: 'center' as const}}>
						<div style={{fontSize: 64}}>🧺</div>
						<div style={{fontSize: 34, fontWeight: 900, color: COLORS.cyan, margin: '12px 0 8px'}}>Diversification</div>
						<p style={{fontSize: 22, color: COLORS.muted, margin: 0, lineHeight: 1.55}}>
							Don't put all your eggs in one basket. Spread investments across different <strong style={{color: COLORS.text}}>sectors</strong>, <strong style={{color: COLORS.text}}>asset classes</strong>, and <strong style={{color: COLORS.text}}>geographies</strong>.
						</p>

						{/* Portfolio breakdown bars */}
						<div style={{marginTop: 24, display: 'flex', flexDirection: 'column' as const, gap: 12}}>
							{[
								{label: 'US Stocks', pct: 40, color: COLORS.blue},
								{label: 'International Stocks', pct: 20, color: COLORS.purple},
								{label: 'Bonds', pct: 20, color: COLORS.gold},
								{label: 'Real Estate (REITs)', pct: 10, color: COLORS.green},
								{label: 'Cash / Alternatives', pct: 10, color: COLORS.muted},
							].map(({label, pct, color}) => (
								<div key={label}>
									<div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 4}}>
										<span style={{color: COLORS.muted, fontSize: 17}}>{label}</span>
										<span style={{color, fontSize: 17, fontWeight: 700}}>{pct}%</span>
									</div>
									<div style={{height: 10, background: 'rgba(255,255,255,0.08)', borderRadius: 6, overflow: 'hidden'}}>
										<div style={{height: '100%', width: `${pieProg * pct}%`, background: color, borderRadius: 6}} />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right: Rules list */}
				<div style={{flex: 1, display: 'flex', flexDirection: 'column' as const, gap: 18}}>
					<div style={{opacity: fade(f, 0, 20), fontSize: 30, fontWeight: 800, color: COLORS.text, marginBottom: 4}}>The Golden Rules</div>
					{rules.map(({rule, icon, color}, i) => (
						<div key={i} style={{opacity: fade(f, 20 + i * 30, 25), transform: `translateX(${slideX(f, 20 + i * 30, 25, 40)}px)`, background: `${color}0D`, border: `1px solid ${color}30`, borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'flex-start', gap: 14}}>
							<span style={{fontSize: 28, flexShrink: 0}}>{icon}</span>
							<span style={{fontSize: 19, color: COLORS.text, lineHeight: 1.5}}>{rule}</span>
						</div>
					))}
				</div>
			</div>
		</AbsoluteFill>
	);
};

// ─── Beat 2: Common Mistakes ───────────────────────────────────────────────────
const Beat2: React.FC = () => {
	const f = useCurrentFrame();

	const mistakes = [
		{mistake: 'FOMO Trading', detail: 'Buying because "everyone else is". Leads to buying tops.', icon: '😱', color: COLORS.red},
		{mistake: 'Emotional Decisions', detail: 'Panic selling during dips or greed-holding too long.', icon: '🎢', color: COLORS.gold},
		{mistake: 'Overtrading', detail: 'Trading too frequently increases fees and bad decisions.', icon: '🔄', color: COLORS.purple},
		{mistake: 'Ignoring Fees', detail: 'Commissions + slippage + taxes eat your returns fast.', icon: '💸', color: COLORS.red},
		{mistake: 'No Research', detail: 'Buying stocks based on tips, social media, or rumors.', icon: '🎰', color: COLORS.gold},
		{mistake: 'Over-Leveraging', detail: 'Using too much margin amplifies both gains AND losses.', icon: '📈', color: COLORS.red},
	];

	return (
		<AbsoluteFill style={{display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', padding: '0 80px'}}>
			<div style={{opacity: fade(f, 0, 25), fontSize: 60, fontWeight: 900, color: COLORS.text, marginBottom: 8, textAlign: 'center' as const}}>
				🚫 Common Beginner Mistakes
			</div>
			<div style={{opacity: fade(f, 15, 20), fontSize: 24, color: COLORS.muted, marginBottom: 44, textAlign: 'center' as const}}>
				Avoid these traps — they cost new investors thousands
			</div>

			<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, width: '100%', maxWidth: 1500}}>
				{mistakes.map(({mistake, detail, icon, color}, i) => (
					<div key={mistake} style={{opacity: fade(f, i * 30, 25), transform: `translateY(${slideX(f, i * 30, 25, 30)}px)`, background: `${color}0D`, border: `1px solid ${color}30`, borderRadius: 16, padding: '28px 28px'}}>
						<div style={{fontSize: 44, marginBottom: 12}}>{icon}</div>
						<div style={{fontSize: 26, fontWeight: 800, color, marginBottom: 10}}>{mistake}</div>
						<div style={{fontSize: 20, color: COLORS.muted, lineHeight: 1.55}}>{detail}</div>
					</div>
				))}
			</div>

			{/* Paper trading tip */}
			<div style={{opacity: fade(f, 280, 30), marginTop: 36, background: 'rgba(6,182,212,0.1)', border: '2px solid rgba(6,182,212,0.35)', borderRadius: 16, padding: '24px 52px', width: '100%', maxWidth: 1200, textAlign: 'center' as const}}>
				<div style={{fontSize: 30, fontWeight: 900, color: COLORS.cyan, marginBottom: 10}}>💡 Start with Paper Trading</div>
				<p style={{fontSize: 22, color: COLORS.cyanLight, margin: 0, lineHeight: 1.6}}>
					Most brokers offer simulated trading with virtual money. Practice for <strong>3–6 months</strong> before using real capital. ThinkOrSwim, Webull, and Investopedia all offer paper trading.
				</p>
			</div>
		</AbsoluteFill>
	);
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export const RiskManagement: React.FC = () => {
	return (
		<AbsoluteFill style={{background: '#050A14'}}>
			<div style={{position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(6,182,212,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.05) 1px, transparent 1px)`, backgroundSize: '80px 80px'}} />
			<Sequence from={0} durationInFrames={1000}>
				<Beat1 />
			</Sequence>
			<Sequence from={1000} durationInFrames={800}>
				<Beat2 />
			</Sequence>
		</AbsoluteFill>
	);
};
