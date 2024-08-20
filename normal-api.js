async function doGet(e, t, n) {
    try {
        let response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${t}&tl=${n}&dt=t&q=${encodeURIComponent(e)}`);
        if (!response.ok) throw new Error("Translation failed");
        let translationData = await response.json();
        let translatedText = translationData[0].map(item => item[0]).join("");

        response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${n}&tl=${t}&dt=t&q=${encodeURIComponent(translatedText)}`);
        if (!response.ok) throw new Error("Reverse translation failed");
        translationData = await response.json();
        translatedText = translationData[0].map(item => item[0]).join("");

        response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${t}&tl=ak&dt=t&q=${encodeURIComponent(translatedText)}`);
        if (!response.ok) throw new Error("Translation to `ak` failed");
        translationData = await response.json();
        translatedText = translationData[0].map(item => item[0]).join("");

        response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=ak&tl=en&dt=t&q=${encodeURIComponent(translatedText)}`);
        if (!response.ok) throw new Error("Translation to `en` failed");
        translationData = await response.json();
        translatedText = translationData[0].map(item => item[0]).join("");

        document.querySelector("#response").innerHTML = translatedText;
    } catch (error) {
        console.error(error.message);
        document.querySelector("#response").innerHTML = "An error occurred during translation :/";
    }
}

function triggerDoGet() {
    const inputText = document.getElementById('translation_text').value;
    if( inputText ) {
        doGet(inputText, "en", "sa");
    }
    
}
