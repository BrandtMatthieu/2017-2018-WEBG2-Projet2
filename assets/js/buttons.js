document.getElementsByTagName('body')[0].addEventListener('load', buttonEvents());

function buttonEvents() {
    for (var i = 0; i < document.getElementsByTagName('button').length; i++) {
        document.getElementsByTagName('button')[i].onmousedown = function() {
            this.style.top = '3px';
            this.style.boxShadow = '0px 0px 0px 0px #BA2431';
        };
        document.getElementsByTagName('button')[i].onmouseup = function() {
            this.style.top = '0px';
            this.style.boxShadow = '0px 4px 0px 0px #BA2431';
        };
        document.getElementsByTagName('button')[i].onmouseleave = function() {
            this.style.top = '0px';
            this.style.boxShadow = '0px 4px 0px 0px #BA2431';
        };
    }
}
