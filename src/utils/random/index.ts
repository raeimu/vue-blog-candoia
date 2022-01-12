export function randomID(){
    let res =  Math.random().toString(36).slice(-8)
    while(idIsExist(res)){
        res =  Math.random().toString(36).slice(-8)
    }
    return res;
}
const  existedId:string[] = []
function idIsExist(id:string){
    if(existedId.includes(id))
        return true
    existedId.push(id)
    return false
}