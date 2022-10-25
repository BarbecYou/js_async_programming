document.getElementById('betoltesGomb').addEventListener('click', async () => {
    let szoveg = document.getElementById('szovegInput').value;
    console.log(szoveg);

    setTimeout(() => {
        document.body.style.backgroundColor = 'green';
    }, 2000);

    // Szinkron:
    // let tartalom = letoltes('http://127.0.0.1:5500/index.html');

    // Aszinkron:

    try {
        let response = await fetch('http://127.0.0.1:5500/index.html');
        console.log(response.ok);
        console.log(response.status);
        console.log(response.statusText);
        
        response.blob();

        let text = await response.text();
        console.log('Letöltés kész');
        document.getElementById('tartalom').value = text;
    } catch(reason){
        console.log('Hiba');
        console.log(reason);
    }
    
});

document.getElementById('kamera').addEventListener('click', async () => {

    try{
        let stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        console.log('Kaptunk jogot');
        let v = document.getElementById('kameraKep');
        v.srcObject = stream;
        v.addEventListener('loadedmetadata', () => v.play());
    } catch (reason){
        console.log('nem sikerült kamera');
        console.log(reason);
    }
});

async function adatBetoltes(){
    let response = await fetch('/products.json');
    let eredmeny = await response.json();

    let appleTermekek  = eredmeny.products.filter(x => x.brand == 'Apple');

    let termekLista = document.getElementById('termekLista');
    termekLista.textContent = '';
    for (let p of appleTermekek){
        let li = document.createElement('li');
        li.textContent = p.title;
        termekLista.appendChild(li);
    }
}

document.getElementById('adatok').addEventListener('click', () => {
    adatBetoltes();
});

document.addEventListener('DOMContentLoaded', () => {
    adatBetoltes();
})

