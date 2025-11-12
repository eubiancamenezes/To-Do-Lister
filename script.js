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
        const form = document.getElementById('task-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        const darkBtn = document.getElementById('dark-mode-toggle');
        if (darkBtn) {
            darkBtn.addEventListener('click', () => {
                this.toggleTheme('dark');
            });
        }

        const contrastBtn = document.getElementById('high-contrast-toggle');
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => {
                this.toggleTheme('high-contrast');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                const input = document.getElementById('task-input');
                if (input) input.focus();
            }
        });
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
        if (!taskList) return;

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
                <button onclick="app.deleteTask(${task.id})" aria-label="Excluir tarefa: ${task.text}">
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
        const counter = document.getElementById('task-counter');
        if (!counter) return;
        
        const remaining = this.tasks.filter(t => !t.completed).length;
        counter.textContent = `${remaining} tarefa${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`;
    }

    toggleTheme(theme) {
        const body = document.body;
        const isActive = body.getAttribute('data-theme') === theme;
        body.setAttribute('data-theme', isActive ? '' : theme);
        
        const btn = document.getElementById(`${theme}-mode-toggle`);
        if (btn) {
            btn.setAttribute('aria-pressed', !isActive);
        }
    }

    save() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', function() {
    window.app = new TodoLister();
    console.log('✅ To-Do-Lister carregado com sucesso!');
});

// Fallback para casos onde DOM já está carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.app = new TodoLister();
    });
} else {
    window.app = new TodoLister();
}
