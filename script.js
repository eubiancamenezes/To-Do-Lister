// Variáveis globais
let currentFilter = 'all';

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateTaskCount();
});

// Adicionar nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const timestamp = new Date().toLocaleString();
    
    li.innerHTML = `
        <span>${taskText}</span>
        <small class="task-time">${timestamp}</small>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
            <button class="delete-btn" onclick="deleteTask(this)">✕</button>
        </div>
    `;
    
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
    updateTaskCount();
    
    // Aplicar filtro atual
    applyFilter(li, currentFilter);
}

// Adicionar tarefa com Enter
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        addTask();
    }
}

// Alternar estado de conclusão
function toggleComplete(button) {
    const li = button.closest('li');
    li.classList.toggle('completed');
    saveTasks();
    updateTaskCount();
    
    // Reaplicar filtro se necessário
    if (currentFilter !== 'all') {
        applyFilter(li, currentFilter);
    }
}

// Excluir tarefa
function deleteTask(button) {
    const li = button.closest('li');
    li.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        li.remove();
        saveTasks();
        updateTaskCount();
    }, 300);
}

// Filtrar tarefas
function filterTasks(filter) {
    currentFilter = filter;
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Aplicar filtro a todas as tarefas
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        applyFilter(task, filter);
    });
}

// Aplicar filtro individual
function applyFilter(task, filter) {
    const isCompleted = task.classList.contains('completed');
    
    switch (filter) {
        case 'all':
            task.style.display = 'flex';
            break;
        case 'pending':
            task.style.display = isCompleted ? 'none' : 'flex';
            break;
        case 'completed':
            task.style.display = isCompleted ? 'flex' : 'none';
            break;
    }
}

// Limpar tarefas concluídas
function clearCompleted() {
    const completedTasks = document.querySelectorAll('#taskList li.completed');
    
    if (completedTasks.length === 0) {
        alert('Não há tarefas concluídas para limpar!');
        return;
    }
    
    if (confirm(`Deseja limpar ${completedTasks.length} tarefa(s) concluída(s)?`)) {
        completedTasks.forEach(task => {
            task.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => task.remove(), 300);
        });
        
        setTimeout(() => {
            saveTasks();
            updateTaskCount();
        }, 400);
    }
}

// Salvar tarefas no localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            time: li.querySelector('.task-time')?.textContent || new Date().toLocaleString(),
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Carregar tarefas do localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        const taskList = document.getElementById('taskList');
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            }
            
            li.innerHTML = `
                <span>${task.text}</span>
                <small class="task-time">${task.time}</small>
                <div class="task-actions">
                    <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
                    <button class="delete-btn" onclick="deleteTask(this)">✕</button>
                </div>
            `;
            
            taskList.appendChild(li);
        });
    }
}

// Atualizar contador de tarefas
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('#taskList li').length;
    const completedTasks = document.querySelectorAll('#taskList li.completed').length;
    const pendingTasks = totalTasks - completedTasks;
    
    const taskCount = document.getElementById('taskCount');
    taskCount.textContent = `Total: ${totalTasks} | Pendentes: ${pendingTasks} | Concluídas: ${completedTasks}`;
}

// Adicionar animação de fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-100px); }
    }
`;
document.head.appendChild(style);
// ====== FUNÇÕES DE ACESSIBILIDADE ======

// 1. TOGGLE ALTO CONTRASTE
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isActive = document.body.classList.contains('high-contrast');
    
    // Salvar preferência
    localStorage.setItem('highContrast', isActive);
    
    // Feedback visual
    const btn = document.getElementById('highContrastBtn');
    btn.textContent = isActive ? '☀️ Contraste Normal' : '🌙 Alto Contraste';
    btn.setAttribute('aria-label', 
        isActive ? 'Desativar modo alto contraste' : 'Ativar modo alto contraste');
    
    // Anunciar para leitores de tela
    announceToScreenReader(
        isActive ? 'Modo alto contraste ativado' : 'Modo alto contraste desativado'
    );
}

// 2. ANUNCIAR PARA LEITOR DE TELA
function announceToScreenReader(message) {
    const announcer = document.getElementById('ariaAnnouncer');
    if (announcer) {
        announcer.textContent = message;
    }
}

// 3. CARREGAR PREFERÊNCIA SALVA
function loadAccessibilityPreferences() {
    const highContrast = localStorage.getItem('highContrast') === 'true';
    if (highContrast) {
        document.body.classList.add('high-contrast');
        const btn = document.getElementById('highContrastBtn');
        if (btn) {
            btn.textContent = '☀️ Contraste Normal';
            btn.setAttribute('aria-label', 'Desativar modo alto contraste');
        }
    }
}

// 4. INICIALIZAR AO CARREGAR A PÁGINA
document.addEventListener('DOMContentLoaded', function() {
    loadAccessibilityPreferences();
});

// 5. MELHORAR NAVEGAÇÃO POR TECLADO
document.addEventListener('keydown', function(e) {
    // Tecla ESC para limpar foco
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
});
