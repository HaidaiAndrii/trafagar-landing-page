let searchButton = document.querySelector('.search-button');
let nextElButton = document.querySelector('.select-next-element');
let searchInput = document.querySelector('.search-input');
let prevElButton = document.querySelector('.select-prec-element');
let childElButton = document.querySelector('.select-child-element');
let parentElButton = document.querySelector('.select-parent-element');
let clearInputButton = document.querySelector('.clear-search-select');
let searchformButtonSection = document.querySelector('.search-form-elemnet-change');

let element;
let border = '';

function checkElements() {
    prevElButton.disabled = !element.previousElementSibling;
    nextElButton.disabled = !element.nextElementSibling;
    parentElButton.disabled = !element.parentElement;
    childElButton.disabled = !element.firstElementChild;
}

function selectElement() {
    element.style.border ? border = element.style.border : border = ``;
    element.style.border = '1px solid red';
}

function unSelectElement() {
    element.style.border = border;
}

searchButton.addEventListener('click', () => {
    if (element) {
        unSelectElement();
    }
    if (searchInput.value) {
        element = document.querySelector(`${searchInput.value}`);
        console.log(element.nextElementSibling);
    }
    if (element) {
        checkElements();
        selectElement();
    }
})

clearInputButton.addEventListener('click', () => {
    if (element) {
        unSelectElement();
        element = '';
    }
    checkElements();
    searchInput.value = '';
})



searchformButtonSection.addEventListener('click', function(event) {
    unSelectElement();
    switch (event.target.name) {
        case 'next':
            element = element.nextElementSibling;
            break;
        case 'prev':
            element = element.previousElementSibling;
            break;
        case 'parent':
            element = element.parentElement;
            break;
        case 'child':
            element = element.firstElementChild;
            break;
        default:
            return false;
    }

    selectElement();
    checkElements();
    return undefined;
})
const searchModal = document.querySelector('.modal__search');

searchModal.style.padding = '50px';
searchModal.style.position = 'absolute';
searchModal.style.top = '100px';
searchModal.style.width = `300 px `;
searchModal.style.height = `300 px `;
searchModal.style.backgroundColor = `black `;

searchModal.onmousedown = function(event) {
    let shiftX = event.clientX - searchModal.getBoundingClientRect().left;
    let shiftY = event.clientY - searchModal.getBoundingClientRect().top;
    searchModal.style.zIndex = 10;

    function moveAt(pageX, pageY) {
        searchModal.style.left = pageX - shiftX + 'px';
        searchModal.style.top = pageY - shiftY + 'px';
    }

    moveAt(event.pageX, event.pageY);

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);
    searchModal.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        searchModal.onmouseup = null;
    };
};
searchModal.ondragstart = function() {
    return false;
};