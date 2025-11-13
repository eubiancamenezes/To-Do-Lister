# To-Do-Lister
📋 To-Do-Lister - Lista de Tarefas Acessível

https://img.shields.io/badge/WCAG-2.1_AA-green
https://img.shields.io/badge/Versionamento-GitFlow-blue
https://img.shields.io/badge/Deploy-GitHub_Pages-success

🎯 Sobre o Projeto

O To-Do-Lister é uma aplicação web de lista de tarefas desenvolvida com foco em acessibilidade e boas práticas de desenvolvimento. Este projeto foi criado como parte da Entrega IV da disciplina, demonstrando implementação profissional de versionamento, acessibilidade WCAG 2.1 AA e deploy em produção.

🔗 Acesse a aplicação: (https://eubiancamenezes.github.io/To-Do-Lister/)

✨ Funcionalidades

📝 Gerenciamento de Tarefas

· ✅ Adicionar novas tarefas
· ✅ Marcar/desmarcar tarefas como concluídas
· ✅ Excluir tarefas individualmente
· ✅ Filtrar tarefas (Todas/Ativas/Concluídas)
· ✅ Contador de tarefas restantes
· 💾 Persistência com LocalStorage

♿ Acessibilidade (WCAG 2.1 AA)

· 🎹 Navegação completa por teclado
  · Tab - Navegação entre elementos
  · Ctrl + / - Foco rápido no campo de entrada
  · Ctrl + ←/→ - Navegação entre filtros
  · Escape - Remover foco
· 🗣️ Suporte a leitores de tela
  · ARIA labels e roles
  · Anúncios dinâmicos com aria-live
  · Estrutura semântica HTML5
· 🎨 Sistema de temas acessíveis
  · Modo claro (padrão)
  · Modo escuro
  · Alto contraste para baixa visão
· 📏 Contraste 4.5:1 garantido em todo o texto
· ⚡ Skip links para navegação rápida

🛠️ Tecnologias Utilizadas

Tecnologia Finalidade
HTML5 Estrutura semântica e acessível
CSS3 Estilização com variáveis e temas
JavaScript ES6+ Lógica da aplicação com classes
Git & GitHub Versionamento e deploy
GitHub Pages Deploy automático

🚀 Como Usar

📱 Online (Recomendado)

Acesse diretamente pelo GitHub Pages:

```
(https://eubiancamenezes.github.io/To-Do-Lister/)
```

💻 Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/eubiancamenezes/To-Do-Lister.git

# 2. Acesse a pasta
cd To-Do-Lister

# 3. Abra o arquivo (métodos alternativos)
# Opção A: Servidor local
python -m http.server 3000
# Acesse: http://localhost:3000

# Opção B: Abrir diretamente
# Clique duplo no arquivo index.html
```

🎨 Sistema de Temas

Modo Claro (Padrão)

· Fundo branco com texto escuro
· Azul como cor primária

Modo Escuro

· Fundo escuro com texto claro
· Azul mais vibrante para contraste

Alto Contraste

· Fundo preto com texto branco/amarelo
· Contraste máximo (21:1)
· Ideal para usuários com baixa visão

♿ Guia de Acessibilidade

Navegação por Teclado

Atalho Ação
Tab Navegar entre elementos interativos
Shift + Tab Navegar backwards
Ctrl + / Focar no campo de nova tarefa
Ctrl + ←/→ Alternar entre filtros
Escape Remover foco do elemento atual
Enter Ativar botões/links

Para Usuários de Leitores de Tela

· NVDA/JAWS: Anúncios automáticos de ações
· VoiceOver: Navegação por headings e landmarks
· TalkBack: Estrutura semântica otimizada

📁 Estrutura do Projeto

```
To-Do-Lister/
├── index.html          # Estrutura HTML semântica
├── style.css           # Estilos com sistema de temas
├── script.js           # Lógica da aplicação
├── package.json        # Configuração do projeto
└── README.md           # Documentação
```

Arquitetura do Código

```javascript
// Estrutura modular da aplicação
class TodoLister {
    constructor()        // Inicialização
    init()              // Configuração inicial
    bindEvents()        // Gerenciamento de eventos
    addTask()           // Adicionar tarefa
    toggleTask()        // Alternar estado
    deleteTask()        // Remover tarefa
    setFilter()         // Aplicar filtros
    toggleTheme()       // Alternar temas
    save()              // Persistência
    render()            // Atualizar UI
}
```

📊 Relatório de Acessibilidade

✅ Conformidade WCAG 2.1 AA

Critério Status Detalhes
1.3.1 Info and Relationships ✅ Conforme Estrutura semântica adequada
1.4.3 Contrast (Minimum) ✅ Conforme Contraste mínimo 4.5:1
2.1.1 Keyboard ✅ Conforme Navegação 100% por teclado
2.4.3 Focus Order ✅ Conforme Ordem lógica de foco
4.1.2 Name, Role, Value ✅ Conforme ARIA attributes corretos

🧪 Testes Realizados

· axe DevTools: 0 violations
· Navegação por teclado: 100% funcional
· Contraste de cores: Todos os textos ≥ 4.5:1
· Leitores de tela: Testado com NVDA e VoiceOver

🔄 Versionamento

Estratégia GitFlow

```
main          → Produção (GitHub Pages)
├── develop   → Integração
└── feature/* → Funcionalidades
```

Commits Semânticos

· feat: Nova funcionalidade
· fix: Correção de bugs
· docs: Documentação
· style: Formatação
· refactor: Refatoração
· test: Testes

Release v1.0.0

· ✅ Funcionalidades core implementadas
· ✅ Acessibilidade WCAG 2.1 AA
· ✅ Deploy em produção
· ✅ Documentação completa

🐛 Reportar Problemas

Encontrou um bug ou tem sugestões?
Abra uma issue no GitHub.

📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

👨‍💻 Desenvolvido por

Bianca Menezes- Entrega IV
Disciplina: Desenvolvimento Front-End Para Web - Turma_004
Instituição: Cruzeiro do Sul Virtual

---

<div align="center">⭐ Se este projeto foi útil, deixe uma estrela no repositório!

</div>🔗 Links Úteis

· Documentação WCAG 2.1
· GitFlow Workflow
· GitHub Pages

---

Última atualização: 12/11/2025
