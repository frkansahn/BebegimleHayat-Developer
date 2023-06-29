import Vue from 'vue'

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});
Vue.directive('desktop', (el, binding, vnode) => {
    if (!(window.screen.width > 992)) {
        // replace HTMLElement with comment node
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined,
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;

        if (vnode.componentInstance) {
            vnode.componentInstance.$el = comment;
        }

        if (el.parentNode) {
            el.parentNode.replaceChild(comment, el);
        }
    }
});

Vue.directive('tablet', (el, binding, vnode) => {
    if (!(window.screen.width < 993 && window.screen.width > 767)) {
        // replace HTMLElement with comment node
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined,
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;

        if (vnode.componentInstance) {
            vnode.componentInstance.$el = comment;
        }

        if (el.parentNode) {
            el.parentNode.replaceChild(comment, el);
        }
    }
});

Vue.directive('mobile', (el, binding, vnode) => {
    if (!(window.screen.width < 768)) {
        // replace HTMLElement with comment node
        const comment = document.createComment(' ');
        Object.defineProperty(comment, 'setAttribute', {
            value: () => undefined,
        });
        vnode.elm = comment;
        vnode.text = ' ';
        vnode.isComment = true;
        vnode.context = undefined;
        vnode.tag = undefined;
        vnode.data.directives = undefined;

        if (vnode.componentInstance) {
            vnode.componentInstance.$el = comment;
        }

        if (el.parentNode) {
            el.parentNode.replaceChild(comment, el);
        }
    }
});