export class UIManager {
    queue: Function[] = [];
    params: any[] = [];
    index: number = 0;
    debugLog: string[] = [];
    isDebugging: boolean = false;
    isRunning: boolean = false;
    speed: number;
    myInterval: NodeJS.Timer;
    ifStepping: boolean = false;
    ifUILock: boolean = false;
    UID: string = '';
    ifPurgeLock: boolean = false;
    activeque: Function[] = [];
    activeParams: any[] = [];
    ifAddLock: boolean = false;

    constructor(speed?: number, enabled?: boolean, debug?: boolean) {
        this.speed = speed ?? 1000;
        this.isDebugging = debug ?? false;
        this.isRunning = enabled ?? false;
    }

    addQue = async (entry: Function, params: any[]) => {
        let promise = new Promise(resolve => {
            //check for locking code
            this.ifAddLock = true;
            if (entry.name.search('UI_') == -1) {
                this.queue.push(entry);
                this.params.push(params);
            } else {
                if (!this.ifUILock) {
                    this.queue.push(entry);
                    this.params.push(params);
                } else {
                    console.log(`UI lock event blocked`);
                }
            }
            this.ifAddLock = false;
            resolve('');
        });
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

    getQue = () => {
        return this.queue;
    };

    clearLock = (lockID: string, entry: Function, params: any[]) => {
        if (lockID == this.UID) {
            this.ifUILock = false;
        }
        entry(...params);
    };

    lockUI = (entry: Function, params: any[]): string => {
        entry(...params);
        this.ifUILock = true;
        this.UID = Date.now().toString();
        return this.UID;
    };

    getUID = (): string => {
        return this.UID;
    };

    startQue = () => {
        this.myInterval = setInterval(async () => {
            if (this.isRunning && !this.ifUILock && !this.ifPurgeLock && !this.ifAddLock) {
                //append queus over
                this.activeque.push(...this.queue);
                this.activeParams.push(...this.params);
                this.activeque.forEach(item => {
                    this.queue.shift();
                    this.params.shift();
                });

                while (this.activeque.length) {
                    this.ifPurgeLock = true;
                    //check for UI event
                    let currentFunc = this.activeque.shift();
                    let currentParam: any[] = this.activeParams.shift();
                    console.log(`Running: `, currentFunc.name);
                    console.time();
                    await currentFunc(...currentParam);
                    console.timeEnd();
                    if (this.isDebugging) {
                        this.log(`UI-QUE RAN ${currentFunc.name} at ${Date.now()}`);
                    }
                }
                this.ifPurgeLock = false;

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
