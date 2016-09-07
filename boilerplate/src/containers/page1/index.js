require('./index.css');
module.exports = {
    init: function() {
        document.querySelector('#time').innerHTML = this.getTimer();
    },
    getTimer: function() {
        return new Date();
    }
}
