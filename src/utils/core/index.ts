import { App, createApp, DefineComponent, Plugin, reactive } from 'vue';
import { ArticleList, getArticleList } from '../../api';
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

export function useOnwNotification(component: DefineComponent<{}, {}, any>) {
    const app = createApp(component)
    const dom = document.createElement('div')
    document.body.appendChild(dom)
    const instant: any = app.mount(dom)
    return reactive(new class {
        private instant = instant
        notification(title: string, { }) {
            instant.notification(title, {})
        }
    })
}

/**
 * 
 * @returns 新的文章数组对象
 */
export function useArticleList() {
    return reactive(new ArticleList(getArticleList))
}

export const withInstall = <T>(component: any, alias?: string) => {
    component.install = (app: App) => {
        app.component(component.name || component.displayName, component)
        if (alias) {
            app.config.globalProperties[alias] = component
        }
        return component as T & Plugin
    }
}