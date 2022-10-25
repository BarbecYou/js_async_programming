document.getElementById('betoltesGomb').addEventListener('click', () => {
    let szoveg = document.getElementById('szovegInput').value;
    console.log(szoveg);

    setTimeout(() => {
        document.body.style.backgroundColor = 'green';
    }, 2000);

    // Szinkron:
    // let tartalom = letoltes('http://127.0.0.1:5500/index.html');

    // Aszinkron:
    fetch('http://127.0.0.1:5500/index.html').then((response) => {
        console.log(response.ok);
        console.log(response.status);
        console.log(response.statusText);
        return response.text();
    }).then((text) => {
        console.log('Letöltés kész');
        document.getElementById('tartalom').value = text;
    })
    .catch((reason) => {
        console.log('Hiba');
        console.log(reason);
    });
    console.log('Letöltés');
});

document.getElementById('kamera').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
    }).then((stream) => {
        console.log('Kaptunk jogot');
        let v = document.getElementById('kameraKep');
        v.srcObject = stream;
        v.addEventListener('loadedmetadata', () => v.play());
    }).catch((reason) => {
        console.log('nem sikerült kamera');
        console.log(reason);
    });
    console.log('kamera gomb katt');
})

