import Vue from 'vue';
Vue.directive('drag', {
    bind: (el, b, vnode) => {
        let that = vnode.context;
        let odiv = el;
        odiv.onmousedown = (e) => {
            e.preventDefault();
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;
            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                let top = e.clientY - disY;
                odiv.style.left = left + "px";
                odiv.style.top = top + "px";
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    }
})