import { App, ComponentPublicInstance, inject, Plugin, provide, reactive } from 'vue';
import { GlobalColorDARK, GlobalColorLIGHT } from './../../pro-config'

/**
 * @description 网站的颜色变量改变，使用这些变量的属性将响应变化
 */

export function useDark() {
    const declaration = document.body.style;
    declaration.setProperty('--app-back', GlobalColorDARK.APP_BACKGROUND)
    declaration.setProperty('--cont-back', GlobalColorDARK.CONTAINER_BACKGROUND)
    declaration.setProperty('--art-title-color', GlobalColorDARK.ARTICLE_TITLE_COLOR)
    declaration.setProperty('--art-content-color', GlobalColorDARK.ARTICLE_CONTENT_COLOR)
    declaration.setProperty('--li-link-color', GlobalColorDARK.LIST_LINK_COLOR)
    declaration.setProperty('--li-link-ac-color', GlobalColorDARK.LIST_LINK_ACTIVE_COLOR)
    declaration.setProperty('--menu-link-color', GlobalColorDARK.MENU_LINK_COLOR)
    declaration.setProperty('--menu-link-ac-color', GlobalColorDARK.MENU_LINK_ACTIVE_COLOR)
    declaration.setProperty('--loader-color', GlobalColorDARK.LOADER_COLOR)
}

/**
 * @description 网站的颜色变量改变，使用这些变量的属性将响应变化
 */

export function useLight() {
    const declaration = document.body.style;
    declaration.setProperty('--app-back', GlobalColorLIGHT.APP_BACKGROUND)
    declaration.setProperty('--cont-back', GlobalColorLIGHT.CONTAINER_BACKGROUND)
    declaration.setProperty('--art-title-color', GlobalColorLIGHT.ARTICLE_TITLE_COLOR)
    declaration.setProperty('--art-content-color', GlobalColorLIGHT.ARTICLE_CONTENT_COLOR)
    declaration.setProperty('--li-link-color', GlobalColorLIGHT.LIST_LINK_COLOR)
    declaration.setProperty('--li-link-ac-color', GlobalColorLIGHT.LIST_LINK_ACTIVE_COLOR)
    declaration.setProperty('--menu-link-color', GlobalColorLIGHT.MENU_LINK_COLOR)
    declaration.setProperty('--menu-link-ac-color', GlobalColorLIGHT.MENU_LINK_ACTIVE_COLOR)
    declaration.setProperty('--loader-color', GlobalColorLIGHT.LOADER_COLOR)
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
    let token,root,name:string
    if(typeof input === 'symbol'){
        token = input
    } else {

        token = input.token
        root = input.root
        name = input.name
    }

    switch(type){
        case 'optional':
            return inject<T>(token) || null
        case 'root':
            return input.root
    }
}


