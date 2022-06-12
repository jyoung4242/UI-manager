import './style.css';
import { UIManager } from './UI-Manager';

let UIM = new UIManager(1000, true, false);

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

const sleep = async (t: number) => {
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

const moveWidget = async (element: string) => {
    //document.getElementById(element).style.transform = `translateX(${random(500)}px) translateY(${random(300)}px) scale(1)`;
    let promise = new Promise(async (resolve, reject) => {
        await sleep(2000);
        resolve('');
    });
    return promise;
};

const scaleWidget = async (element: string) => {
    //document.getElementById(element).style.transform = `translateX(${random(500)}px) translateY(${random(300)}px) scale(${random(Math.random() * 3)})`;
    let promise = new Promise(async (resolve, reject) => {
        await sleep(2500);
        resolve('');
    });
    return promise;
};

const colorWidget = async (element: string) => {
    //let newcolor = getRndColor();
    //document.getElementById(element).style.backgroundColor = `${newcolor}`;
    let promise = new Promise(async (resolve, reject) => {
        await sleep(3000);
        resolve('');
    });
    return promise;
};

const opacWidget = async (element: string) => {
    //document.getElementById(element).style.opacity = `${Math.random()}`;
    let promise = new Promise(async (resolve, reject) => {
        await sleep(4000);
        resolve('');
    });
    return promise;
};

const showButton = () => {
    document.getElementById('user').classList.remove('hidden');
};

const createEvent = async () => {
    //type of Event, move, scale, color, opacity
    let selectedWidget = `unit${Math.floor(Math.random() * 3)}`;

    let event = Math.floor(Math.random() * 5);
    switch (event) {
        case 0:
            //move
            await UIM.addQue(moveWidget, [selectedWidget]);
            break;
        case 1:
            //scale
            await UIM.addQue(scaleWidget, [selectedWidget]);
            break;
        case 2:
            //color
            await UIM.addQue(colorWidget, [selectedWidget]);
            break;
        case 3:
            //opacity
            await UIM.addQue(opacWidget, [selectedWidget]);
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

let generationCount = 0;

createEvent();
createEvent();
createEvent();
createEvent();

console.log(UIM.getQue());

setTimeout(() => {
    console.log(`running 2nd batch`);
    createEvent();
    createEvent();
    console.log(UIM.getQue());
}, 8000);

setTimeout(() => {
    console.log(`running 3rd batch`);
    createEvent();
    createEvent();
    createEvent();
    console.log(UIM.getQue());
}, 15000);

UIM.startQue();
