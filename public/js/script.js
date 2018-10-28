var socket = new WebSocket('ws://localhost:5000');
socket.addEventListener('open', function (event) {
    console.log("connected", event);
});
socket.addEventListener('message', function (event) {

    const tweetContainer = document.querySelector('#tweet-container');
    const e = document.createElement('span');
    e.innerHTML = event.data + " ";
    tweetContainer.appendChild(e);

    socket.send("message received");
});

//------------

const input = document.querySelector('#user-terminal-container input');
const result = document.getElementById('user-terminal-result');


const dictionary =  [
    {"word":"Donald Trump", "replace": "🍊"},{"word":"DonaldTrump", "replace": "🍊"},{"word":"Trump", "replace": "🍊"},
    {"word":" crime ", "replace": "🌸"},{"word":"crimes", "replace": "🌸"},{"word":"murder", "replace": "🌸"},
    {"word":" weapon ", "replace": "🍭"},{"word":"weapons", "replace": "🍭"},
    {"word":" war ", "replace": "🌈"},{"word":"military", "replace": "🌈"},
    {"word":" wall ", "replace": "🚪"},
    {"word":" muslim ", "replace": "🎅"},
    {"word":"shoot", "replace": "🎆"},{"word":"shooting", "replace": "🎆"},
];

input.focus();

input.addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){
        const inputValue = input.value;
        result.innerHTML = '';

        if(inputValue === "help"){
            result.innerHTML = `
                    <p>Command list</p>
                    <ul>
                        <li>dictionary : words list with their corresponding emoji</li>
                        <li>add (word) (emoji) : add censor</li>
                    </ul>
                `;
        }
        else if(inputValue === "dictionary"){
            displayDictonnary();
        }
        else if(inputValue.startsWith("add")){
            addToDictionnary();
        }
        else{
            result.innerHTML = `${inputValue} : command not found, try "help" command`;
        }
        input.value = '';
    }
});

function displayDictonnary(){
    dictionary.forEach(value => {
        const dictionnayItem = document.createElement('p');
        dictionnayItem.innerHTML = `
        <span>${value.word} = </span>
        <span>${value.replace}</span>
        `;
        result.appendChild(dictionnayItem);
    })
}

function addToDictionnary() {
    const addvalue = input.value;
    const addrequest = addvalue.split(' ');
    addrequest.shift();
    const addItem = {"word": addrequest[0], "replace": addrequest[1]};

    socket.send(JSON.stringify(addItem));
    dictionary.push(addItem);
}
