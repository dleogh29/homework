var doc = document;

window.onload = init;

function init() {
    doc.addEventListener('keydown', toggleGrid);

    setToggleHander('btn-check', 'active');
    setToggleHander('btn-star', 'active');
}

function setToggleHander(item_class_name, toggle_class_name) {
    var arr = doc.getElementsByClassName(item_class_name);
    for(var i = 0; i < arr.length; i++) {
        arr[i].addEventListener('click', toggleHandler.bind(arr[i], toggle_class_name));
    }
}

function toggleHandler(toggle_class_name) {
    this.classList.toggle(toggle_class_name);
}

function toggleGrid(e) {
    
    if(e.shiftKey && e.keyCode === 71) {
        doc.getElementsByClassName('container')[0].classList.toggle('grid');
    }
}