function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const url = GurbaniNow.buildApiUrl({ id: getRandomInt(1, 5540) });
const $viewer = document.querySelector('.shabad-viewer');
fetch(url)
	.then(r => r.json())
	.then(r => {
		if (r.error) {   
			return Promise.reject(r);
		}
		$viewer.dataset.error = "";
		$viewer.dataset.loading = "true";
		const {
			shabadinfo: { pageno: ang, source: { english: granth }, writer: { english: author } },
			shabad: lines
		} = r;
		$viewer.querySelector('.author').innerText = author;
		$viewer.querySelector('.ang').innerText = ang;
		$viewer.querySelector('.granth').innerText = granth;
		$viewer.querySelector('.bani').innerHTML = lines
		.map(({ line }) => `
			<div class='shabad-line'>
				<p>${line.gurmukhi.unicode}</p>
				<blockquote>${line.translation.english.default}</blockquote>
			</div>
		`).join('');
		$viewer.dataset.loading = "false";
	}).catch(err => {
		console.error(err);
		$viewer.dataset.loading = "false";
		$viewer.dataset.error = `Sorry, we are facing troubles in getting your Shabad`;
	});
