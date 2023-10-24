export default function randomNums(count: number, range: number): number[] {
	const randomNums: number[] = [];
	while (randomNums.length < count) {
		let r = Math.floor(Math.random() * range) + 1;
		if (!randomNums.includes(r)) randomNums.push(r);
	}
	return randomNums;
}