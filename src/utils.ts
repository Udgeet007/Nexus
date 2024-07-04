const MAX_LEN = 5;

 export function generate() {
	const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
	const length = 5;
	let ans = "";
	for (let i = 0; i < length; i++) {
		ans += subset[Math.floor(Math.random() * subset.length)];
	}
	return ans;
}
