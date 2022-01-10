import { reactive } from "vue";
import { withFunctionalStore } from "../core";

class ArrRegistry<T>{
    public store: T[] = []
    public register(o: T) {
        if (!this.store.includes(o))
            this.store.push(o)
    }
    public cancellation(o: T) {
        const index = this.store.indexOf(o)
        if (index > -1) {
            this.store.splice(index, 1)
        }
    }
    public get length() {
        return this.store.length
    }

}

function ArrDataStore() {
    return reactive(new ArrRegistry<string>())
}

export const useArrDataStore = withFunctionalStore(ArrDataStore)


interface User{
    name:string,
    sign?:string,
    avatar:string | URL | null,
    email:string,
    github:string,
    weiXinQRCode?:string,
}

function userDataDemo():User{
    return reactive({
        name:'jacob',
        sign:'山高自有客行路，水深自有渡船人',
        avatar:'https://ts1.cn.mm.bing.net/th?id=OIP-C.79smi7hB-2AHPbroJr8rnwAAAA&w=148&h=170&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2',
        email:'www.text@t.com',
        github:'https://github.com/raeimu',
    })
}

export const useUserData = withFunctionalStore(userDataDemo)

