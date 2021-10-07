document.getElementsByTagName("body")[0].addEventListener("load", selectEvents());


function selectEvents() {
    for(var i =0;i<document.getElementsByTagName("select").length;i++){
        document.getElementsByTagName("select")[i].onfocus = function() {
            this.style.borderBottomLeftRadius='0px';
            this.style.boxShadow='0px 0px 0px 0px #BA2431';
        };
        document.getElementsByTagName("select")[i].onblur = function() {
            this.style.borderBottomLeftRadius='5px';
            this.style.boxShadow='0px 5px 0px 0px #BA2431';
        };
        document.getElementsByTagName("select")[i].onchange = function() {
            this.style.borderBottomLeftRadius='5px';
            this.style.boxShadow='0px 5px 0px 0px #BA2431';
        };
    }
}