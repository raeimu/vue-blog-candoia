import { off } from "process";
import { reactive, Ref } from "vue";
import { withFunctionalStore } from "../../../utils/core";

function subItemRegistry() {
    return reactive(new SubItemRegistry())
}

export type targetStyleType = { left: string, zIndex: number }
export type tagHelper = { target: targetStyleType, active: boolean }
/**
 * 
 */
class SubItemRegistry {

    //
    private styles: Array<targetStyleType> = []

    backups: Array<tagHelper> = []

    private activeTagHelper: tagHelper | undefined = undefined;

    public register(off: targetStyleType) {
        if (!this.styles.includes(off))
            this.styles.push(off)
        else {
            this.cancellation(off)
            this.styles.push(off)
        }
        this.appendBackup(off)
        this.setStyle()
    }

    public cancellation(off: targetStyleType) {
        const index = this.styles.indexOf(off)
        this.styles.splice(index, 1)
        this.removeBackup(off)
    }

    public get windowIndex() {
        return Math.floor(this.length / 2)
    }

    public get length() {
        return this.styles.length
    }

    private setStyle() {
        for (const index in this.styles) {
            this.styles[index].left = this.windowIndex - parseInt(index) + '00%'
            this.styles[index].zIndex = -1
        }
        this.styles[this.windowIndex].zIndex = 0
    }


    public pop() {
        return this.styles.pop()
    }

    public push(target: targetStyleType | undefined) {
        if (target && !this.styles.includes(target)) {
            this.styles.push(target)
            this.setStyle()
        }
    }

    public shift() {
        return this.styles.shift()
    }

    public unshift(target: targetStyleType | undefined) {
        if (target && !this.styles.includes(target)) {
            this.styles.unshift(target)
            this.setStyle()
        }
    }

    public computedNeedScroll(index: number) {
        if (index < this.backups.length) {
            const findIndex = this.styles.findIndex(
                v =>
                    v == this.backups[index].target
            )
            if (findIndex > -1) {
                let offset = this.windowIndex - findIndex
                return offset
            }
        }
    }

    changeActiveTagHelper() {
        if (this.activeTagHelper) {
            this.activeTagHelper.active = false
        }
        this.activeTagHelper = this.backups.find(
            v =>
                v.target == this.styles[this.windowIndex]
        )
        if (this.activeTagHelper) {
            this.activeTagHelper.active = true
        }
    }


    private appendBackup(off: targetStyleType) {
        this.backups.push({ target: off, active: false })
    }


    private removeBackup(off: targetStyleType) {
        let index = this.backups.findIndex((v) => {
            v.target == off
        })
        if (index > -1) {
            this.backups.splice(index, 1)
        }
    }

    private get showedSubStyle() {
        return this.styles[this.windowIndex]
    }
}


export const useRegistry = withFunctionalStore(subItemRegistry)