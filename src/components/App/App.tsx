import 'normalize.css';
import './app.scss';
import { Object } from '../../interfaces';
import uuid from 'react-uuid';
import { useState, useEffect } from 'react';




const App: React.FC = () => {
	const width: number = window.innerWidth;
	const height: number = window.innerHeight;
	const squaresByWidth: number = Math.floor(width / 22);
	const squaresByHeight: number = Math.floor(height / 22);
	const squaresAmount = squaresByWidth * squaresByHeight;
	const [data, setData] = useState<Object[]>();

	useEffect(() => {
		setData(onCreateSquares());
	}, []);

	function onCreateSquares(): Object[] {
		const squares = [];
		for (let i = 0; i < squaresAmount; i++) {
			squares.push(
				{ id: uuid(), cls: 'app__quarter', bgColor: '#222222' }
			);
		};
		return squares;
	};

	function createRGB(): string {
		const red: number = getRandom(0, 255);
		const green: number = getRandom(0, 255);
		const blue: number = getRandom(0, 255);
		return `rgb(${red}, ${green}, ${blue})`;
	};

	function getRandom(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	function onChangeColors(id: string): void {
		const newData = data?.map(item => {
			if (item.id !== id) {
				return item;
			} else {
				const color: string = createRGB();
				return { ...item, bgColor: color };
			};
		});
		setData(newData);
	};

	function onRestoreColors(id: string): void {
		const newData = data?.map(item => {
			if (item.id !== id) {
				return { ...item, bgColor: '#222222' };
			};
			return item;
		});
		setData(newData);
	};

	if (data !== undefined) {
		const result = data.map(item => {
			const { id, cls, bgColor } = item;
			return (
				<div
					className={cls}
					key={id}
					style={{ background: bgColor }}
					onMouseOver={() => onChangeColors(id)}
					onMouseLeave={() => onRestoreColors(id)}
				></div>
			);
		});

		return (
			<div className="app">
				{result}
			</div>
		);
	};


	return (
		<div className="app">

		</div>
	);
};

export default App;
