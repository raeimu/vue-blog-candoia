import { unref } from "vue"
import { withFunctionalStore } from "../../../utils/core"
import { createLoading } from "./createLoading"
/**
 * 获取一个loader的控制对象
 * @param target 挂载的EL对象插入的位置
 * @returns 一个loader控制对象
 */
export function useLoading(target?:any){
    target = target || document.body
    const instance = createLoading(target)

    const open = ()=>{
        const t = unref(target)
        if(!t) return
        instance.open(t)
    }

    const close = () => {
        instance.close()
    }

    return {
        open,close
    }
}