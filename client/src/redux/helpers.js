export function calculateDate(date) {
	const date1 = new Date().getTime();
	const date2 = new Date(date).getTime();
	const mili = 24 * 60 * 60 * 1000;
	const days = Math.floor(Math.abs(date2 - date1) / mili);
	return days;
}
