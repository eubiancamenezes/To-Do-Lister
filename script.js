javascript
class TodoLister {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
    }

   bindEvents() {
    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.addTask();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            this.setFilter(e.target.dataset.filter);
        });
    });

    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        this.toggleTheme('dark');
    });

    document.getElementById('high-contrast-toggle').addEventListener('click', () => {
        this.toggleTheme('high-contrast');
    });
    
    //  Navegação por teclado completa
    document.addEventListener('keydown', (e) => {
        // Ctrl+/ para focar no input
        if (e.ctrlKey && e.key === '/') {
            e.preventDefault();
            document.getElementById('task-input').focus();
        }
        
        // Escape para limpar foco
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
        
        // Navegação entre filtros com Ctrl+setas
        if (e.ctrlKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            e.preventDefault();
            this.navigateFilters(e.key);
        }
    });
}

//  Método adicional para navegar entre filtros
navigateFilters(key) {
    const filters = ['all', 'active', 'completed'];
    const currentIndex = filters.indexOf(this.currentFilter);
    let newIndex;

    if (key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : filters.length - 1;
    } else {
        newIndex = currentIndex < filters.length - 1 ? currentIndex + 1 : 0;
    }

    this.setFilter(filters[newIndex]);
}
    addTask() {
        const input = document.getElementById('task-input');
        const text = input.value.trim();

        if (text) {
            this.tasks.unshift({
                id: Date.now(),
                text: text,
                completed: false
            });
            this.save();
            this.render();
            input.value = '';
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.save();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    render() {
        const taskList = document.getElementById('task-list');
        const filteredTasks = this.getFilteredTasks();

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                    aria-label="${task.completed ? 'Desmarcar' : 'Marcar'} tarefa: ${task.text}"
                >
                <span class="task-text">${task.text}</span>
                <button onclick="app.deleteTask(${task.id})" aria-label="Excluir tarefa">
                    ✕
                </button>
            </li>
        `).join('');

        this.updateStats();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active': return this.tasks.filter(t => !t.completed);
            case 'completed': return this.tasks.filter(t => t.completed);
            default: return this.tasks;
        }
    }

    updateStats() {
        const remaining = this.tasks.filter(t => !t.completed).length;
        document.getElementById('task-counter').textContent = 
            `${remaining} tarefa${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`;
    }

    toggleTheme(theme) {
        const body = document.body;
        const isActive = body.getAttribute('data-theme') === theme;
        body.setAttribute('data-theme', isActive ? '' : theme);
        
        const btn = document.getElementById(`${theme}-mode-toggle`);
        btn.setAttribute('aria-pressed', !isActive);
    }

    save() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
}

const app = new TodoLister();
window.app = app;
