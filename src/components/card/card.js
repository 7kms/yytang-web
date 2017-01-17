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

Card.newInstance = properties => {
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
                // Object.keys(user).forEach((val, index) => {
                //     this.$set(this.user, val, user[user]);
                // })
                this.position = position;
                this.user = user;
                this.visible = true;
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
    return {
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
}
module.exports = Card;
