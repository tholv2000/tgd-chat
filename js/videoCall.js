let peerConnection = new SimplePeer({
    initator: location.hash === '#1',
    trickle: false,
});
console.log(peerConnection);
let offerSignal;
console.log("offerSignal: ", offerSignal);

const callBtn = document.getElementById('callBtn');
const answerBtn = document.getElementById('answerBtn');

let signalingWebsocket = new WebSocket("ws://https://chatwebapp-websocketserver.herokuapp.com/videochat");

signalingWebsocket.onmessage = function(msg) {
    console.log("Got message", msg.data);
    const signal = JSON.parse(msg.data);
    if (signal.type === "offer") offerSignal = signal;
    if (signal.type === "answer") peerConnection.signal(JSON.parse(msg.data));
};

peerConnection.on('error', err => console.log('error', err))

peerConnection.on('signal', (data) => {
    console.log(data);
    signalingWebsocket.send(JSON.stringify(data));
})

peerConnection.on('connect', () => {
    console.log('Connect');
    peerConnection.send('Hello guy');
})

peerConnection.on('stream', (stream) => {
    const remoteVideo = document.getElementById('remoteVideo');
    remoteVideo.srcObject = strem;
    remoteVideo.play();
})

async function callOrAnswer(initator, offer) {
    console.log('Calling...');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });

    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = stream;
    localVideo.play();

    peerConnection.addStream(stream);
}

callBtn.addEventListener('click', (e) => callOrAnswer(true));
answerBtn.addEventListener('click', (e) => callOrAnswer(false, offerSignal));
