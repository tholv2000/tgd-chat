let peerConnection = new SimplePeer({
    initiator: location.hash === '#1',
    trickle: false
})

let offerSignal;
let sendSignal;
let firstTime = true;

const callBtn = document.getElementById('callBtn');
const answerBtn = document.getElementById('answerBtn');
const videoGrid = document.getElementById('video-call');
const answerNotice = document.getElementById('modal-notice')

// let signalingWebsocket = new WebSocket("wss://chatwebapp-websocketserver.herokuapp.com/videochat");
let signalingWebsocket = new WebSocket("ws://localhost:8080/videochat");

signalingWebsocket.onmessage = async function(msg) {
    const signal = JSON.parse(msg.data);
    console.log(signal);
    if (signal.type === "offer") {
        offerSignal = signal;
        if (firstTime) {
            peerConnection.signal(signal);
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });

            peerConnection.addStream(newStream);
            firstTime = false;
        } else {
            answerNotice.style.display = 'block';
        }
    }
    if (signal.type === "answer") peerConnection.signal(signal);
};

signalingWebsocket.onopen = () => {
    console.log('Opened');
}

signalingWebsocket.onerror = () => {
    console.log('Error');
}

peerConnection.on('error', err => console.log('error', err))

peerConnection.on('connect', () => {
    console.log('Connect');
})

peerConnection.on('data', (data) => {
    console.log(data);
})

peerConnection.on('signal', (data) => {
    if (signalingWebsocket.readyState === 1) {
        signalingWebsocket.send(JSON.stringify(data));
    }
})

peerConnection.on('stream', async (stream) => {
    const remoteVideo = document.getElementById('remoteVideo');

    remoteVideo.srcObject = stream;
    remoteVideo.play();
})

async function call() {
    console.log('Calling...');
    chatPage.classList.add('hidden');
    videoGrid.classList.remove('hidden');
    videoGrid.classList.add('d-flex');
    videoGrid.classList.add('content-between');
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });

    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = stream;
    localVideo.play();

    peerConnection.addStream(stream);
}

async function answer() {
    if (offerSignal) peerConnection.signal(offerSignal);

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });

    const localVideo = document.getElementById('localVideo');
    localVideo.srcObject = stream;
    localVideo.play();

    answerNotice.style.display = 'none';
    chatPage.classList.add('hidden');
    videoGrid.classList.remove('hidden');
    videoGrid.classList.add('d-flex');
    videoGrid.classList.add('content-between');

}

callBtn.addEventListener('click', (e) => call());
answerBtn.addEventListener('click', (e) => answer());
