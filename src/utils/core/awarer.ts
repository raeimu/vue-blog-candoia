/**
 * @description window 的滚动对象
 */
class WindowScroller {
    private downHooks: Array<() => void> = []
    private upHooks: Array<() => void> = []
    private hooks: Array<() => void> = []

    private lastKnownScrollPosition = 0
    private currentScrollY = 0
    public constructor() {
        this.lastKnownScrollPosition = window.scrollY
        RegisterEventSlowly('scroll', () => {
            for(const hook of this.hooks)
                hook()
            if (this.currentScrollY - this.lastKnownScrollPosition > 40) {
                for (const hook of this.upHooks)
                    hook()

            } else if (this.currentScrollY - this.lastKnownScrollPosition < -40){
                for (const hook of this.downHooks)
                    hook()
            }
        }, window)
    }
    public UpHooksRegistry(callback: () => void) {
        this.upHooks.push(callback)
    }
    public DownHooksRegistry(callback: () => void) {
        this.downHooks.push(callback)
    }
}

const WINDOW_SCROLLER = new WindowScroller()

export function awareOfScrollRoll(event: 'up' | 'down', callback: () => void) {
    if (event == 'up')
        WINDOW_SCROLLER.UpHooksRegistry(callback)
    else if (event == 'down')
        WINDOW_SCROLLER.DownHooksRegistry(callback)
}




const FREQUENCY = 100


function RegisterEventSlowly<T extends keyof GlobalEventHandlersEventMap>(event: T, callback: (e: Event) => void, ob: EventTarget) {
    let ticking = false;
    ob.addEventListener(event, (e) => {
        if (!ticking) {
            ticking = true
            setTimeout(() => {
                callback(e)
                ticking = false
            }, FREQUENCY)
        }
    })
}