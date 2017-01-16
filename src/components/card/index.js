import Vue from 'vue';
import Card from './card.vue';

function generateDom () {
    let div = document.createElement('div');
    div.innerHTML = `
        <Card :show="visible" :position="position" :dataObj="user"></Card>
    `;
    div = document.body.appendChild(div);
    return div;
}

const card = new Vue({
    el: generateDom(),
    data: {
        visible: false,
        user: {},
        position: {}
    },
    components: { Card },
    methods: {
        show (user = {}, position = {}) {
            this.visible = true;
            this.position = Object.assign(position);
            this.user = Object.assign(user);
        },
        hide () {
            this.visible = false;
        },
        remove () {
            this.$destroy();
            document.body.removeChild(this.$el);
        }
    }
}).$children[0];

module.exports = {
    show (user, position) {
        card.$parent.show(user, position)
    },
    hide () {
        card.$parent.hide()
    },
    remove () {
       card.$parent.remove();
    }
}
