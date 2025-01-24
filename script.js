var datas = {
    t1: 'Hello',
    t2: '!',
    todo: '',
    hapus: 'Delete',
    todoLi: [],
    todone: [],
    nama: '',
    name: ''
}

var app = new Vue({
    el:'#app',
    data: datas,
    methods: {
        addTodo, removeTodo, removeAll,
        setName, setTodo, changeName,
        resetAll: function() {
            this.removeAll();
            this.changeName();
            this.name = '';
        },
        doneAll
    },
    computed: {
        isListed: function() {
            return (this.todoLi.length != 0);
        },
        isDone, yetDone,
        getName,
        getTodo,
        greet: function() {
            let i = Math.random();
            if(i > 0.8)
                this.t1 = "Assalamu'alaikum";
            else if(i > 0.6)
                this.t1 = 'Have a nice day';
            else if(i > 0.5)
            {
                this.t2 = '?';
                this.t1 = 'How was your day';
            }
            else if(i > 0.3)
                this.t1 = 'Keep your spirits up';
            else
                this.t1 = 'Hello';

            return this.t1;
        }
    }
});

function addTodo() {
    if(this.todo.trim() != '') {
        this.todoLi.push(this.todo);
        this.todone.push(false);
    }
    this.todo = '';
}

function removeTodo(i) {
    this.todoLi.splice(i, 1);
    this.todone.splice(i, 1);
}

function removeAll() {
    this.todoLi.splice(0, this.todoLi.length);
    this.todone.splice(0, this.todone.length);
    localStorage.removeItem('todoLi');
    localStorage.removeItem('todone');
    this.todoLi = [];
    this.todone = [];
}

function doneAll(b) {
    if(this.todone) {
        for(let i = 0; i < this.todone.length; i++)
            this.todone.splice(i, 1, b);

        this.setTodo();
    }
}

function isDone() {
    for(var i = 0; i < this.todoLi.length; i++) {
        if(!this.todone[i])
            return false;
    }
    return true;
}

function yetDone() {
    var jml = 0;
    for(var i = 0; i < this.todoLi.length; i++) {
        if(!this.todone[i])
            jml++;
    }
    return jml;
}

function getName() {
    this.nama = localStorage.getItem('nama');
    if(!this.nama)
        return false;
    return true;
}

function getTodo() {
    let todoLi = localStorage.getItem('todoLi');
    let todone = localStorage.getItem('todone');
    if(todoLi && todone) {
        this.todoLi = JSON.parse(todoLi);
        this.todone = JSON.parse(todone);
        return true;
    }
    return false;
}

function setTodo() {
    localStorage.setItem('todoLi', JSON.stringify(this.todoLi));
    localStorage.setItem('todone', JSON.stringify(this.todone));
}

function setName() {
    this.nama = localStorage.setItem('nama', this.name);
    this.name = '';
}

function changeName() {
    localStorage.removeItem('nama');
    this.name = this.nama;
    this.nama = null;
}
