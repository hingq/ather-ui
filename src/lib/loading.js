import { h, render } from "vue"
import loading from '../components/Loading/index'
// import he from "..";
const style = {
    display: 'grid',
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
}
function addStyle(el, styles) {
    for (let prop in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, prop)) {
            el.style[prop] = styles[prop]
        }
    }
}
export default {
    mounted: function (el, v) {
        // 元素的大小及其相对于视口的位置。
        const { height } = el.getBoundingClientRect()
        // element.setAttribute('style', 'color: red; background-color: #FFFF00');
        addStyle(el, style)
        const renderElement = h(loading, { size: height / 2, style: { position: 'absolute' } })
        render(renderElement, el)
        if (v.value === true) {
            el.querySelector('span.loading').style.display = 'block'
        } else {
            el.querySelector('span.loading').style.display = 'none'
        }
    },
    updated(el, v) {
        if (v.value === true) {
            el.querySelector('span.loading').style.display = 'block'
        } else {
            el.querySelector('span.loading').style.display = 'none'

        }
    },
    unmounted(el) {
        el.lastElementChild.remove()
    }
}