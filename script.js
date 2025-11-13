class TodoLister {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        this.currentFilter = 'all';
        this.currentTheme = localStorage.getItem('todoTheme') || '';
        this.init();
    }

    init() {
        this.applySavedTheme();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        // Form submission
        const form = document.getElementById('task-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTask();
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Theme controls
        const themeButtons = document.querySelectorAll('.theme-btn');
        themeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setTheme(e.target.dataset.theme);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '/') {
                e.preventDefault();
                this.focusTaskInput();
            }
        });

        // Task input events
        const taskInput = document.getElementById('task-input');
        if (taskInput) {
            taskInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.addTask();
                }
            });
        }
    }

    addTask() {
        const input = document.getElementById('task-input');
        const text = input.value.trim();

        if (text) {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false,
                createdAt: new Date().toISOString()
            };

            this.tasks.unshift(newTask);
            this.save();
            this.render();
            input.value = '';
            input.focus();
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

    setTheme(theme) {
        const isSameTheme = this.currentTheme === theme;
        
        if (isSameTheme) {
            document.body.removeAttribute('data-theme');
            this.currentTheme = '';
        } else {
            document.body.setAttribute('data-theme', theme);
            this.currentTheme = theme;
        }
        
        document.querySelectorAll('.theme-btn').forEach(btn => {
            const isActive = btn.dataset.theme === this.currentTheme;
            btn.classList.toggle('active', isActive);
        });
        
        localStorage.setItem('todoTheme', this.currentTheme);
    }

    applySavedTheme() {
        if (this.currentTheme) {
            document.body.setAttribute('data-theme', this.currentTheme);
            document.querySelectorAll('.theme-btn').forEach(btn => {
                const isActive = btn.dataset.theme === this.currentTheme;
                btn.classList.toggle('active', isActive);
            });
        }
    }

    render() {
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('empty-state');
        
        if (!taskList) return;

        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '';
            if (emptyState) emptyState.style.display = 'block';
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        taskList.innerHTML = filteredTasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" 
                data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox"
                    ${task.completed ? 'checked' : ''}
                    onchange="app.toggleTask(${task.id})"
                    aria-label="${task.completed ? 'Desmarcar' : 'Marcar'} tarefa: ${task.text}"
                >
                <span class="task-text">
                    ${this.escapeHtml(task.text)}
                </span>
                <button class="delete-btn" 
                        onclick="app.deleteTask(${task.id})" 
                        aria-label="Excluir tarefa: ${task.text}">
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

    focusTaskInput() {
        const input = document.getElementById('task-input');
        if (input) input.focus();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    save() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    window.app = new TodoLister();
});