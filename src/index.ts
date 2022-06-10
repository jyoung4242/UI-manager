import './style.css';
import { UIManager } from './UI-Manager';

let UIM = new UIManager(500, true, true);

let eventToggle: boolean = false;
let queToggle: boolean = false;
let cntUIEvents: number = 0;
let LockID: string = '';

let txtArea = document.getElementById('mytext');

console.clear();

const toggleEvents = () => {
    if (eventToggle == true) {
        eventToggle = false;
    } else {
        eventToggle = true;
    }
};

const toggleQue = () => {
    if (queToggle == true) {
        queToggle = false;
    } else {
        queToggle = true;
    }
    UIM.pauseQue(queToggle);
};

const postLog = () => {
    console.log(UIM.getLog());
};

const userEvent = () => {
    UIM.clearLock(LockID, hideButton, []);
    cntUIEvents = 0;
};

document.getElementById('events').addEventListener('click', toggleEvents);
document.getElementById('que').addEventListener('click', toggleQue);
document.getElementById('log').addEventListener('click', postLog);
document.getElementById('user').addEventListener('click', userEvent);

const hideButton = () => {
    document.getElementById('user').classList.add('hidden');
    txtArea.innerHTML = '';
};

const sleep = (t: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('I can sleep!');
        }, t);
    });
};

const getRndColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);

    return `#${randomColor}`;
};

const random = (limit: number): number => {
    return Math.floor(Math.random() * limit);
};

const moveWidget = (element: string) => {
    document.getElementById(element).style.transform = `translateX(${random(500)}px) translateY(${random(300)}px) scale(1)`;
    sleep(1000);
};

const scaleWidget = (element: string) => {
    document.getElementById(element).style.transform = `translateX(${random(500)}px) translateY(${random(300)}px) scale(${random(Math.random() * 3)})`;
    sleep(1000);
};

const colorWidget = (element: string) => {
    let newcolor = getRndColor();

    document.getElementById(element).style.backgroundColor = `${newcolor}`;
    sleep(1000);
};

const opacWidget = (element: string) => {
    document.getElementById(element).style.opacity = `${Math.random()}`;
    sleep(1000);
};

const showButton = () => {
    document.getElementById('user').classList.remove('hidden');
};

const createEvent = () => {
    //type of Event, move, scale, color, opacity
    let selectedWidget = `unit${Math.floor(Math.random() * 4)}`;

    let event = Math.floor(Math.random() * 5);
    switch (event) {
        case 0:
            //move
            UIM.addQue(moveWidget, [selectedWidget]);
            break;
        case 1:
            //scale
            UIM.addQue(scaleWidget, [selectedWidget]);
            break;
        case 2:
            //color
            UIM.addQue(colorWidget, [selectedWidget]);
            break;
        case 3:
            //opacity
            UIM.addQue(opacWidget, [selectedWidget]);
            break;
        case 4:
            cntUIEvents += 1;
            if (cntUIEvents == 5) {
                LockID = UIM.lockUI(showButton, []);
                cntUIEvents = 0;
            }

        default:
            break;
    }
};

setInterval(() => {
    if (eventToggle) {
        createEvent();
    }

    let arryFunc: Function[] = UIM.getQue();
    arryFunc.forEach(event => {
        txtArea.innerHTML = txtArea.innerHTML + event.name + '\n';
        txtArea.scrollTop = txtArea.scrollHeight;
    });
}, 500);

UIM.startQue();
