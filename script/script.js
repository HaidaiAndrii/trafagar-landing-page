const modal = `
<form onsubmit="return false" class="search-item-form modal__search">
        <input type='text' class="search-input" /><br/>
        <span class='search-span-error'>Elemet not found (404)</span><br/>
        <button name="search" class="search-button">search</button>
        <button name="Clear" class="clear-search-select" disabed>Clear</button>
        <div class="search-form-elemnet-change">
        
        <button name="next" class="select-next-element" disabled>Next</button>
        <button name="prev" class="select-prec-element" disabled>Prev</button>
        <button name="child" class="select-child-element" disabled>Child</button>
            <button name="parent" class="select-parent-element" disabled>Parent</button>
            </div>
            </form>`;
const main = document.querySelector('body');
main.insertAdjacentHTML('afterend', modal);

const searchModal = document.querySelector('.modal__search');

let searchButton = document.querySelector('.search-button');
let nextElButton = document.querySelector('.select-next-element');
let searchInput = document.querySelector('.search-input');
let prevElButton = document.querySelector('.select-prec-element');
let childElButton = document.querySelector('.select-child-element');
let parentElButton = document.querySelector('.select-parent-element');
let clearInputButton = document.querySelector('.clear-search-select');
let searchformButtonSection = document.querySelector('.search-form-elemnet-change');
let searchSpanError = document.querySelector('.search-span-error');

searchSpanError.style.color = 'white';
searchSpanError.style.visibility = 'hidden';

searchModal.style.padding = '50px';
searchModal.style.width = `300 px `;
searchModal.style.height = `300 px `;
searchModal.style.backgroundColor = `black `;
searchModal.style.position = 'absolute';
searchModal.style.top = 0;

function scrollToElemnt(element) {
    searchModal.style.position = 'fixed';
    window.scrollTo(pageXOffset, element.offsetTop);
    searchModal.style.top = searchModal.offsetTop;

};


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

    if(!searchInput.value) {
        if(element) {
            unSelectElement();
            element = '';
            checkElements();
        }
        return;
    }

        element = document.querySelector(`${searchInput.value}`);
        if (!element) {
            searchSpanError.style.visibility = '';

        } else {
            scrollToElemnt(element);
            searchSpanError.style.visibility = 'hidden';
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
        checkElements();
    }
    searchSpanError.style.visibility = 'hidden';
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
// searchModal.style.position = 'fixed';

let x = 0;
let y = 0;


const mouseDownHandler = function(e) {
    x = e.clientX;
    y = e.clientY;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function(e) {
    searchModal.style.zIndex = 100;
    const dx = e.clientX - x;
    const dy = e.clientY - y;

    searchModal.style.top = `${searchModal.offsetTop + dy}px`;
    searchModal.style.left = `${searchModal.offsetLeft + dx}px`;

    x = e.clientX;
    y = e.clientY;
};

const mouseUpHandler = function() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
};

searchModal.addEventListener('mousedown', mouseDownHandler);


