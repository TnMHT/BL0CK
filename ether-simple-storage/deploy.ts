(async () => {
	console.log("IFFE");
})();

async function main() {
	console.log("main");
    await sleep(1000);
    console.log("main2");
}
