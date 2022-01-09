import { createVNode, defineComponent, h, reactive, render, VNode } from "vue";
import CLoading from './CLoading.vue'

export function createLoading(target?:HTMLElement){
    let vm:VNode | null = null
    const data = reactive({
        loading:true
    })

    const LoadingWarp = defineComponent({
        render(){
            return h(CLoading,{...data})
        }
    })

    vm = createVNode(LoadingWarp)

    render(vm,document.createElement('div'))

    function close(){
        if(vm?.el && vm.el.parentNode){
            vm.el.parentNode.removeChild(vm.el)
        }
    }

    function open(target:HTMLElement = document.body){
        if(!vm || !vm.el)
            return
        target.appendChild(vm.el as HTMLElement)
    }

    if(target){
        open(target)
    }

    return{
        vm,
        close,
        open,
        setLoading:(loading:boolean)=>{
            data.loading = loading
        },
        get loading(){
            return data.loading
        },
        get $el(){
            return vm?.el as HTMLElement
        }
    }
}