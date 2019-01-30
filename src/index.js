let count = 0;
function addElement() {
    count++;
    // creating window
    let innerWindow = document.createElement('div');
    innerWindow.classList.add('inner-window');
    //indexing window
    let innerNumber = document.createElement('p');
    innerNumber.textContent = count;
    // adding a delete button 
    let innerDeleteButton =  document.createElement('button');
    innerDeleteButton.classList.add('delete-button');
    innerDeleteButton.textContent = "X";
    innerWindow.appendChild(innerDeleteButton);
    innerWindow.appendChild(innerNumber);   
    document.querySelector('.window').appendChild(innerWindow);
    innerWindow.style.zIndex = count;
    innerDeleteButton.onclick = function (event) {
        event.target.parentNode.style.display = 'none';
    }
    innerWindow.onmousedown = (event) => {
        event.target.style.position =  'absolute';
        event.target.style.zIndex = 999;
        
        function moveWithMouse(X, Y) {
            event.target.style.left = X - event.target.offsetWidth  / 2;
            event.target.style.top = Y - event.target.offsetHeight / 2;
        }
        //moveWithMouse(event.pageX, event.pageY);

        function move(event) {
            moveWithMouse(event.pageX, event.pageY);
        }
        innerWindow.addEventListener('mousemove', move);
        innerWindow.onmouseup = () => {
            innerWindow.removeEventListener('mousemove', move);
            innerWindow.onmouseup = null;
        }
    }
    
    innerWindow.ondragstart = () => false;
}



document.querySelector('button.add-button').addEventListener('click', addElement);
