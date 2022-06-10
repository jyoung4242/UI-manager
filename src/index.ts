import './style.css';
import { UIManager } from './UI-Manager';

let widget1 = document.getElementById('unit1');
let widget2 = document.getElementById('unit2');
let widget3 = document.getElementById('unit3');
let widget4 = document.getElementById('unit4');

const getRndColor = (): string => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
};
