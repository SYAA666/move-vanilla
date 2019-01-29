let count = 0;
function addElement() {
    count++;
    let innerWindow = document.createElement('div');
    innerWindow.classList.add('inner-window');
    let innerNumber = document.createElement('p');
    innerNumber.textContent = count;
    let innderDeleteButton =  document.createElement('button');
    innderDeleteButton.classList.add('delete-button');
    innderDeleteButton.textContent = "X";
    innerWindow.appendChild(innderDeleteButton);
    innerWindow.appendChild(innerNumber);
    document.querySelector('.window').appendChild(innerWindow);
    innerWindow.style.zIndex = count;
    innderDeleteButton.onclick = function (event) {
        event.target.parentNode.style.display = 'none';
    }
    innerWindow.onmousedown = function(event) {
        innerWindow.style.position = 'absolute';
        document.querySelector('.window').append(event.target);
        function move() {
            event.target.style.left = event.pageX;
            event.target.style.top = event.pageY;
        }

        event.target.addEventListener('mousemove', move);

        event.target.onmouseup = function () {
            event.target.removeEventListener('mousemove', move);
        }
    }
}




document.querySelector('button.add-button').addEventListener('click', addElement);
