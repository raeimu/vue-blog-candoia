import { App, ComponentPublicInstance, inject, Plugin, provide, reactive } from 'vue';
import { GlobalColorDARK, GlobalColorLIGHT } from './../../pro-config'

/**
 * @description 网站的颜色变量改变，使用这些变量的属性将响应变化
 */

export function useDark() {
    const declaration = document.body.style;
    declaration.setProperty('--app-background-color',GlobalColorDARK.APP_BACKGROUND_COLOR.toString())
    declaration.setProperty('--app-background-darken10-color',GlobalColorDARK.APP_BACKGROUND_COLOR.darken(0.1).toString())
    declaration.setProperty('--border-color',GlobalColorDARK.APP_BACKGROUND_COLOR.darken(0.03).toString())
    declaration.setProperty('--primary-color',GlobalColorDARK.PRIMARY_COLOR.toString())
    declaration.setProperty('--primary-alpha20-color',GlobalColorDARK.PRIMARY_COLOR.alpha(0.2).toString())
    declaration.setProperty('--primary-alpha80-color',GlobalColorDARK.PRIMARY_COLOR.alpha(0.8).toString())
    declaration.setProperty('--primary--lighten5-color',GlobalColorDARK.PRIMARY_COLOR.lighten(0.05).toString())
    declaration.setProperty('--primary--lighten3-color',GlobalColorDARK.PRIMARY_COLOR.lighten(0.03).toString())
    declaration.setProperty('--primary--lighten10-color',GlobalColorDARK.PRIMARY_COLOR.lighten(0.1).toString())

    declaration.setProperty('--primary--darken10-color',GlobalColorDARK.PRIMARY_COLOR.darken(0.1).toString())
    declaration.setProperty('--primary--darken3-color',GlobalColorDARK.PRIMARY_COLOR.darken(0.03).toString())

    declaration.setProperty('--primary--darken10-alpha20-color',GlobalColorDARK.PRIMARY_COLOR.darken(0.1).alpha(0.2).toString())
    declaration.setProperty('--primary-text-color',GlobalColorDARK.PRIMARY_TEXT_COLOR.toString())
    declaration.setProperty('--regular-text-color',GlobalColorDARK.PRIMARY_TEXT_COLOR.fade(0.2).toString())
    declaration.setProperty('--secondary-text-color',GlobalColorDARK.PRIMARY_TEXT_COLOR.fade(0.4).toString())
    declaration.setProperty('--placeholder-text-color',GlobalColorDARK.PRIMARY_TEXT_COLOR.fade(0.6).toString())


}

/**
 * @description 网站的颜色变量改变，使用这些变量的属性将响应变化
 */

export function useLight() {
    const declaration = document.body.style;
    declaration.setProperty('--app-background-color',GlobalColorLIGHT.APP_BACKGROUND_COLOR.toString())
    declaration.setProperty('--app-background-darken10-color',GlobalColorLIGHT.APP_BACKGROUND_COLOR.darken(0.1).toString())
    declaration.setProperty('--border-color',GlobalColorLIGHT.APP_BACKGROUND_COLOR.darken(0.03).toString())
    declaration.setProperty('--primary-color',GlobalColorLIGHT.PRIMARY_COLOR.toString())
    declaration.setProperty('--primary-alpha20-color',GlobalColorLIGHT.PRIMARY_COLOR.alpha(0.2).toString())
    declaration.setProperty('--primary-alpha80-color',GlobalColorLIGHT.PRIMARY_COLOR.alpha(0.8).toString())
    declaration.setProperty('--primary-lighten5-color',GlobalColorLIGHT.PRIMARY_COLOR.lighten(0.05).toString())
    declaration.setProperty('--primary-lighten3-color',GlobalColorLIGHT.PRIMARY_COLOR.lighten(0.03).toString())
    declaration.setProperty('--primary-lighten10-color',GlobalColorLIGHT.PRIMARY_COLOR.lighten(0.1).toString())

    declaration.setProperty('--primary-darken10-color',GlobalColorLIGHT.PRIMARY_COLOR.darken(0.1).toString())
    declaration.setProperty('--primary-darken3-color',GlobalColorLIGHT.PRIMARY_COLOR.darken(0.03).toString())

    declaration.setProperty('--primary-darken10-alpha20-color',GlobalColorLIGHT.PRIMARY_COLOR.darken(0.1).alpha(0.2).toString())
    declaration.setProperty('--primary-text-color',GlobalColorLIGHT.PRIMARY_TEXT_COLOR.toString())
    declaration.setProperty('--regular-text-color',GlobalColorLIGHT.PRIMARY_TEXT_COLOR.fade(0.2).toString())
    declaration.setProperty('--secondary-text-color',GlobalColorLIGHT.PRIMARY_TEXT_COLOR.fade(0.4).toString())
    declaration.setProperty('--placeholder-text-color',GlobalColorLIGHT.PRIMARY_TEXT_COLOR.fade(0.6).toString())

}

/**
 * @description 写入粘贴板
 * @param text 写进粘贴板中的字符串
 * @param callback 在完成时执行的hook
 * @param err 当捕捉到异常时执行的hook
 */

export function useClipboard(text?: string, callback?: () => void, err?: () => void) {
    if (text != undefined)
        navigator.clipboard
            .writeText(text)
            .then(callback)
            .catch(err)
}

/**
 * @description 调用浏览器的通知api，它会响应在操作系统
 * @param title 通知标题
 * @param body 通知文本
 */

export function useWebNotification(title: string, body: string) {
    Notification.requestPermission(status => {
        if (status == 'granted')
            return new Notification(title, { body: body })
        else
            console.error("failed attempt to notification")
    })
}

/**
 * 
 * @param component 通知组件
 * @returns 
 */

export function useOnwNotification(component: ComponentPublicInstance<any>) {
    return reactive(new class {
        private instant = component
        notification(title: string, { }) {
            this.instant.notification(title, {})
        }
    })
}


export const withInstall = <T>(component: any, alias?: string) => {
    component.install = (app: App) => {
        app.component(component.name || component.displayName, component)
        if (alias) {
            app.config.globalProperties[alias] = component
        }
    }
    return component as T & Plugin
}

export interface FunctionalStore<T>{
    ():T
    token:symbol
    root:T
}

/**
 * 使一个store函数完成特定接口
 * @see FunctionalStore 
 * @param func store 函数
 * @param sym 指定一个symbol实例
 * @returns 封装好的store函数
 */
export function withFunctionalStore<T>(func:()=>T,sym?:symbol){
    const functionalStore = func as any
    functionalStore.token = sym || Symbol()
    functionalStore.root = func()
    return functionalStore as FunctionalStore<T>
}

export function useProvider<T>(func:FunctionalStore<T>){
    const depends = func()
    provide(func.token,depends)
    return depends
}   

type InjectType = 'root' | 'optional'

export function useInjector<T>(input:FunctionalStore<T>,type:InjectType){
    let token:symbol
    if(typeof input === 'symbol'){
        token = input
    } else {
        token = input.token
    }

    switch(type){
        case 'optional':
            return inject<T>(token) || null
        case 'root':
            return input.root
    }
}


