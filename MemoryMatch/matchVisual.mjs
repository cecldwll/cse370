async function getEmojis(count = 8) {
    const res = await fetch("https://emojihub.yurace.pro/api/all/category/food-and-drink");
    const all = await res.json();

    // Shuffle and take first N unique emojis
    const shuffled = all.sort(() => Math.random() - 0.5);
    const limited = shuffled.slice(0, count);
    console.log(limited);
    return shuffled.slice(0, count).map(e => e.htmlCode[0]);
}

getEmojis(8);