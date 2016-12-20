import Vue from 'vue';
import Toast from './toast';
Toast.newInstance = properties => {
    var _props = properties || {};
    const div = document.createElement('div');
    div.innerHTML = `
        <Toast :visible="visible" :duration="duration">{{text}}</Toast>
    `;
    document.body.appendChild(div);
    const toast = new Vue({
        el: div,
        data: Object.assign({
           duration: 2500,
           text: 'thanks!'
        }, _props),
        components: { Toast },
        mothods: {
            ready () {
                setTimeout(() => {
                    this.destroy();
                }, this.duration);
            },
            destroy () {
                this.$destroy();
                document.body.removeChild(div);
                this.onRemove();
            }
        }
    }).$children[0];
    return {
        show () {
            toast.show()
        }
    }
}
module.exports = Toast;

