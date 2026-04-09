import {interpolate, spring} from 'remotion';

export const COLORS = {
	bg: '#050A14',
	text: '#F9FAFB',
	muted: '#94A3B8',
	subtle: '#374151',
	green: '#10B981',
	greenLight: '#6EE7B7',
	red: '#EF4444',
	redLight: '#FCA5A5',
	gold: '#F59E0B',
	goldLight: '#FDE68A',
	blue: '#60A5FA',
	blueLight: '#BFDBFE',
	purple: '#7C3AED',
	purpleLight: '#A78BFA',
	cyan: '#06B6D4',
	cyanLight: '#A5F3FC',
	card: 'rgba(255,255,255,0.05)',
	cardBorder: 'rgba(255,255,255,0.1)',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export const fade = (f: number, start: number, dur = 20): number =>
	interpolate(f, [start, start + dur], [0, 1], clamp);

export const fadeOut = (f: number, start: number, dur = 20): number =>
	interpolate(f, [start, start + dur], [1, 0], clamp);

export const slideY = (f: number, start: number, dur = 25, dist = 50): number =>
	interpolate(f, [start, start + dur], [dist, 0], clamp);

export const slideX = (f: number, start: number, dur = 25, dist = 60): number =>
	interpolate(f, [start, start + dur], [dist, 0], clamp);

export const prog = (f: number, start: number, dur: number): number =>
	interpolate(f, [start, start + dur], [0, 1], clamp);

export const spr = (f: number, start: number, fps: number, stiffness = 80, damping = 200): number =>
	spring({frame: Math.max(0, f - start), fps, config: {damping, stiffness}});

export const gridBg = (color: string, opacity: number): React.CSSProperties => ({
	backgroundImage: `linear-gradient(${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px), linear-gradient(90deg, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')} 1px, transparent 1px)`,
	backgroundSize: '80px 80px',
});

// Stock price data (S&P 500-like uptrend with volatility)
export const STOCK_DATA = [
	96, 98, 95, 100, 103, 101, 106, 103, 108, 105, 110, 107, 112, 109,
	115, 112, 118, 114, 119, 116, 122, 118, 124, 120, 126, 122, 128, 124,
	131, 127, 133, 129, 136, 132, 138, 134, 140, 136, 143, 139, 145, 141,
	148, 144, 151, 147, 154, 150, 157, 153,
];

export const buildChartPath = (data: number[], W: number, H: number, padding = 20): string => {
	const min = Math.min(...data);
	const max = Math.max(...data);
	const toX = (i: number) => (i / (data.length - 1)) * W;
	const toY = (p: number) => H - padding - ((p - min) / (max - min)) * (H - padding * 2);
	return data.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(p).toFixed(1)}`).join(' ');
};
