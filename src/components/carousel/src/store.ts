import { reactive, Ref } from "vue";
import { withFunctionalStore } from "../../../utils/core";

function subItemRegistry(){
    return reactive(new SubItemRegistry())
}

export type targetOffset =  {left:string,zIndex:number}

/**
 * 
 */
class SubItemRegistry{

    private offsets:Array< targetOffset > = []

    register(off:targetOffset){
        if(!this.offsets.includes(off))
            this.offsets.push(off)
        else {
            this.cancellation(off)
            this.offsets.push(off)
        }
        this.setOffset()
    }

    cancellation(off:targetOffset){
        const index = this.offsets.indexOf(off)
        this.offsets.splice(index,1)
    }

    get windowIndex(){
        return Math.floor(this.length/2)
    }

    get length(){
        return this.offsets.length
    }
    
    setOffset(){
        for(const index in this.offsets){
            this.offsets[index].left = this.windowIndex - parseInt(index) + '00%'
            this.offsets[index].zIndex = -1
        }
        this.offsets[this.windowIndex].zIndex = 0   
    }


    pop(){
        return this.offsets.pop()
    }

    push(target:targetOffset | undefined){
        if(target){
            this.register(target) 
        }
    }  
    
    shift(){
        return this.offsets.shift()
    }

    unshift(target:targetOffset | undefined){
        if(target && !this.offsets.includes(target)){
            this.offsets.unshift(target)
            this.setOffset()
        }
    }

}


export const useRegistry =  withFunctionalStore(subItemRegistry)