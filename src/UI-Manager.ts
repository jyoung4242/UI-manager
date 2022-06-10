export class UIManager {
    queue: Function[] = [];
    index: number = 0;
    debugLog: string[] = [];
    isDebugging: boolean = false;
    isRunning: boolean = false;
    speed: number;
    myInterval: NodeJS.Timer;
    ifStepping: boolean = false;

    constructor(speed?: number, enabled?: boolean, debug?: boolean) {
        this.speed = speed ?? 1000;
        this.isDebugging = debug ?? false;
        this.isRunning = enabled ?? false;
    }

    addQue = (entry: Function) => {
        this.queue.push(entry);
    };

    stepQue = () => {
        this.ifStepping = true;
        this.isRunning = true;
    };

    clearQue = () => {
        this.queue = [];
    };

    pauseQue = (flag: boolean) => {
        this.isRunning = flag;
    };

    startQue = () => {
        this.myInterval = setInterval(async () => {
            if (this.isRunning) {
                const asyncFunctions = this.queue;
                this.queue = [];
                for (const asyncFn of asyncFunctions) {
                    let result = await asyncFn();
                    if (this.isDebugging) {
                        this.log(`UI-QUE RAN ${asyncFn} at ${Date.now()} with result: ${result}`);
                    }
                }

                if (this.ifStepping) {
                    this.isRunning = false;
                    this.ifStepping = false;
                }
            }
        }, this.speed);
    };

    setDebug = (flag: boolean) => {
        this.isDebugging = flag;
    };

    getLog = (): string[] => {
        return this.debugLog;
    };

    clearLog = () => {
        this.debugLog = [];
    };

    log = (entry: string) => {
        this.debugLog.push(entry);
    };
}
