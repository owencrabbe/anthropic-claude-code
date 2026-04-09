import {Composition} from 'remotion';
import {StockMarketVideo} from './StockMarketVideo';

// 10 minutes at 30fps = 18,000 frames
export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="StockMarket101"
			component={StockMarketVideo}
			durationInFrames={18000}
			fps={30}
			width={1920}
			height={1080}
		/>
	);
};
