document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const totalTasksElement = document.getElementById('totalTasks');
    const completedTasksElement = document.getElementById('completedTasks');
    
    // Carregar tarefas do localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Inicializar a aplicação
    function init() {
        renderTasks();
        updateStats();
        taskInput.focus();
    }
    
    // Adicionar nova tarefa
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            showAlert('Por favor, digite uma tarefa!', 'warning');
            return;
        }
        
        if (taskText.length > 100) {
            showAlert('A tarefa deve ter no máximo 100 caracteres!', 'warning');
            return;
        }
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        updateStats();
        
        taskInput.value = '';
        taskInput.focus();
        
        showAlert('Tarefa adicionada com sucesso!', 'success');
    }
    
    // Renderizar lista de tarefas
    function renderTasks() {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <p>📝 Nenhuma tarefa encontrada</p>
                <small>Adicione uma tarefa para começar!</small>
            `;
            taskList.appendChild(emptyState);
            return;
        }
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.setAttribute('data-id', task.id);
            
            li.innerHTML = `
                <div class="task-content">
                    <span class="task-text">${escapeHtml(task.text)}</span>
                </div>
                <div class="task-actions">
                    <button class="complete-btn" aria-label="${task.completed ? 'Desmarcar' : 'Completar'} tarefa">
                        ${task.completed ? '↶' : '✓'}
                    </button>
                    <button class="delete-btn" aria-label="Excluir tarefa">
                        ✗
                    </button>
                </div>
            `;
            
            // Eventos dos botões
            const completeBtn = li.querySelector('.complete-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            
            completeBtn.addEventListener('click', () => toggleTask(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            // Duplo clique para editar (feature extra)
            li.addEventListener('dblclick', () => editTask(task.id));
            
            taskList.appendChild(li);
        });
    }
    
    // Alternar estado da tarefa
    function toggleTask(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    // Excluir tarefa
    function deleteTask(taskId) {
        if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
            return;
        }
        
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateStats();
        
        showAlert('Tarefa excluída com sucesso!', 'success');
    }
    
    // Editar tarefa (feature extra)
    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const newText = prompt('Editar tarefa:', task.text);
        if (newText !== null && newText.trim() !== '') {
            if (newText.trim().length > 100) {
                showAlert('A tarefa deve ter no máximo 100 caracteres!', 'warning');
                return;
            }
            
            task.text = newText.trim();
            saveTasks();
            renderTasks();
            showAlert('Tarefa atualizada com sucesso!', 'success');
        }
    }
    
    // Limpar tarefas concluídas
    function clearCompletedTasks() {
        const completedCount = tasks.filter(task => task.completed).length;
        
        if (completedCount === 0) {
            showAlert('Não há tarefas concluídas para limpar!', 'info');
            return;
        }
        
        if (!confirm(`Tem certeza que deseja limpar ${completedCount} tarefa(s) concluída(s)?`)) {
            return;
        }
        
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateStats();
        
        showAlert(`${completedCount} tarefa(s) concluída(s) foram removidas!`, 'success');
    }
    
    // Limpar todas as tarefas
    function clearAllTasks() {
        if (tasks.length === 0) {
            showAlert('Não há tarefas para limpar!', 'info');
            return;
        }
        
        if (!confirm('Tem certeza que deseja limpar TODAS as tarefas? Esta ação não pode ser desfeita!')) {
            return;
        }
        
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
        
        showAlert('Todas as tarefas foram removidas!', 'success');
    }
    
    // Atualizar estatísticas
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        
        totalTasksElement.textContent = `Total: ${total}`;
        completedTasksElement.textContent = `Concluídas: ${completed}`;
    }
    
    // Salvar tarefas no localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Mostrar alerta
    function showAlert(message, type = 'info') {
        // Remove alertas anteriores
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
        `;
        
        // Cores baseadas no tipo
        const colors = {
            success: '#28a745',
            warning: '#ffc107',
            danger: '#dc3545',
            info: '#17a2b8'
        };
        
        alert.style.background = colors[type] || colors.info;
        
        document.body.appendChild(alert);
        
        // Auto-remover após 3 segundos
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => alert.remove(), 300);
            }
        }, 3000);
    }
    
    // Utility: Escapar HTML para prevenir XSS
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Focar no input quando a página carregar
    taskInput.focus();
    
    // Inicializar a aplicação
    init();
    
    // Adicionar estilos para animações dos alertas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
