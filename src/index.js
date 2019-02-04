class Window {
    constructor(index) {
        this.previousState = {
            Y: 0,
            X: 0
        };
        this.markup = document.createElement('div');
        this.markup.classList.add('inner-window');
        this.index = index;
        /*
        let buttons = ['X', 'O', '_'];
        buttons.forEach((el) => {
            let button = document.createElement('button');
                button.classList.add(el);
                button.textContent = el;
                this.markup.appendChild(button);
        }) */
        this.closeButton = document.createElement('button');
        this.closeButton.textContent = 'X';
        this.screenButton = document.createElement('button');
        this.screenButton.textContent = 'O';
        this.hideButton = document.createElement('button');
        this.hideButton.textContent = '_';
        this.textIndex = document.createElement('h3');
        this.textIndex.textContent = this.index;
        this.markup.appendChild(this.closeButton);
        this.markup.appendChild(this.screenButton);
        this.markup.appendChild(this.hideButton);
        this.markup.appendChild(this.textIndex)

        this.moveHandler = this.onMouseMove.bind(this);

        document.querySelector('.window').appendChild(this.markup);
        this.markup.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.markup.addEventListener('mouseup', this.onMouseUp.bind(this));
        
        this.closeButton.onclick = this.colse.bind(this);
        this.screenButton.onclick = this.fullScreen.bind(this);
        this.hideButton.onclick = this.hide.bind(this);
    }

    colse() {
        this.markup.parentElement.removeChild(this.markup);
    }

    fullScreen() {
        this.markup.classList.toggle('full');
        if(this.markup.classList.contains('full')) {
            this.previousState.X = this.markup.style.left;
            this.previousState.Y = this.markup.style.top;
            this.markup.style.left = 0;
            this.markup.style.top = 0;
        } else {
            this.markup.style.left = this.previousState.X;
            this.markup.style.top = this.previousState.Y;
        }
    }

    onMouseDown(event) {
        if (event.target === this.closeButton || event.target === this.screenButton || event.target === this.hideButton) return false;
        this.markup.addEventListener('mousemove', this.moveHandler);
    }
    onMouseMove(event) {
        if (this.markup.classList.contains('full')) return false;
        this.markup.style.top = event.pageY - this.markup.offsetHeight / 1.1;
        this.markup.style.left = event.pageX - this.markup.offsetWidth / 2;
    }
    onMouseUp() {
        this.markup.removeEventListener('mousemove', this.moveHandler);
    }
    hide() {
        this.previousState.X = this.markup.style.left;
        this.previousState.Y = this.markup.style.top;
        this.markup.parentElement.removeChild(this.markup);
        let hiddenFlag = document.createElement('div');
            hiddenFlag.classList.add('hide');
            hiddenFlag.innerHTML = `<p>${this.index}</p>`
        document.querySelector('.hidden').appendChild(hiddenFlag);
        hiddenFlag.onclick = () => {
            hiddenFlag.parentElement.removeChild(hiddenFlag);
            document.querySelector('.window').appendChild(this.markup);
            this.markup.style.left = this.previousState.X;
            this.markup.style.top = this.previousState.Y;
        }
    }
}

let count = 1;

document.querySelector('button.add-button').addEventListener('click', () => {
    var newEl = new Window(count);
    count++;
});
