# Sistema de Controle de Equipamentos - IPPEL Equipamentos

Sistema moderno para gerenciar compras e controle de equipamentos de informática da IPPEL Equipamentos.

**Experience Qualities**: 
1. Profissional - Interface clean e organizada que transmite confiança empresarial
2. Eficiente - Navegação intuitiva que acelera o trabalho diário dos usuários
3. Moderno - Design contemporâneo com elementos visuais sofisticados

**Complexity Level**: Light Application (multiple features with basic state)
- Sistema com múltiplas funcionalidades de gerenciamento, formulários e listagens, mas sem necessidade de autenticação complexa ou recursos avançados

## Essential Features

### Cadastro de Equipamentos
- **Functionality**: Formulário completo para adicionar novos equipamentos com campos essenciais
- **Purpose**: Manter registro organizado de todos os equipamentos de TI
- **Trigger**: Botão "Adicionar Equipamento" na dashboard principal
- **Progression**: Click botão → Abrir modal/formulário → Preencher dados → Salvar → Confirmar sucesso → Voltar à lista
- **Success criteria**: Equipamento aparece na lista principal com todos os dados corretos

### Lista de Equipamentos
- **Functionality**: Visualização em grid/tabela de todos os equipamentos cadastrados
- **Purpose**: Visão geral rápida do inventário atual
- **Trigger**: Acesso direto na página principal
- **Progression**: Carregar página → Exibir lista → Permitir filtros/busca → Mostrar detalhes
- **Success criteria**: Todos os equipamentos são exibidos com informações claras e organizadas

### Solicitação de Compras
- **Functionality**: Sistema para criar pedidos de novos equipamentos
- **Purpose**: Formalizar e organizar requisições de compra
- **Trigger**: Botão "Nova Solicitação" na seção de compras
- **Progression**: Click botão → Formulário de solicitação → Definir prioridade → Justificativa → Submeter → Aguardar aprovação
- **Success criteria**: Solicitação é criada e aparece na lista de pendências

### Dashboard de Status
- **Functionality**: Visão geral com métricas e status dos equipamentos
- **Purpose**: Acompanhamento rápido da situação atual do parque tecnológico
- **Trigger**: Página inicial do sistema
- **Progression**: Login → Carregar dashboard → Exibir cards com métricas → Permitir drill-down
- **Success criteria**: Dados são apresentados de forma clara e atualizada

## Edge Case Handling
- **Campos obrigatórios**: Validação em tempo real com mensagens claras
- **Duplicatas**: Verificação de equipamentos já cadastrados por número de série
- **Dados inválidos**: Sanitização de inputs e feedback imediato
- **Lista vazia**: Estados vazios com call-to-action para primeiro cadastro
- **Falha na conexão**: Mensagens de erro amigáveis com opções de retry

## Design Direction
O design deve transmitir profissionalismo e modernidade, inspirado em dashboards corporativos premium. Interface limpa com hierarquia visual clara, utilizando elementos de glassmorphism sutil e sombras bem definidas para criar profundidade.

## Color Selection
Complementary (opposite colors) - Vermelho vibrante como cor principal contrastando com tons neutros e acentos em verde para ações positivas.

- **Primary Color**: Vermelho intenso (oklch(0.55 0.22 25)) - Representa a energia e determinação da marca IPPEL
- **Secondary Colors**: Cinza escuro (oklch(0.2 0 0)) para textos e cinza claro (oklch(0.95 0 0)) para backgrounds
- **Accent Color**: Verde esmeralda (oklch(0.6 0.15 145)) para ações de sucesso e confirmações
- **Foreground/Background Pairings**: 
  - Background (Branco #FFFFFF): Texto cinza escuro (oklch(0.2 0 0)) - Ratio 10.4:1 ✓
  - Primary (Vermelho): Texto branco (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Secondary (Cinza): Texto branco (oklch(1 0 0)) - Ratio 8.2:1 ✓
  - Accent (Verde): Texto branco (oklch(1 0 0)) - Ratio 5.1:1 ✓

## Font Selection
Tipografia moderna e legível que transmite profissionalismo corporativo, utilizando Inter para sua excelente legibilidade em interfaces digitais.

- **Typographic Hierarchy**:
  - H1 (Título Principal): Inter Bold/32px/tight letter spacing
  - H2 (Seções): Inter SemiBold/24px/normal spacing
  - H3 (Cards/Subtítulos): Inter Medium/18px/normal spacing
  - Body (Texto geral): Inter Regular/14px/relaxed line height
  - Small (Labels/Detalhes): Inter Medium/12px/wide letter spacing

## Animations
Animações sutis e funcionais que melhoram a experiência sem distrair, focando em transições suaves entre estados e feedback micro-interativo.

- **Purposeful Meaning**: Movimento comunica hierarquia e guia o olhar do usuário através dos fluxos principais
- **Hierarchy of Movement**: Cards principais têm hover elevado, botões de ação têm feedback tátil, transições de página são suaves

## Component Selection
- **Components**: Cards (equipamentos), Button (ações), Dialog (formulários), Table (listagens), Badge (status), Input (formulários), Select (categorias)
- **Customizations**: Cards com glassmorphism sutil, botões com gradiente vermelho, inputs com foco vermelho
- **States**: Hover elevado em cards, pressed em botões, focus ring vermelho em inputs, disabled com opacity reduzida
- **Icon Selection**: Phosphor icons - Computer, ShoppingCart, Plus, Edit, Trash, CheckCircle para representar ações
- **Spacing**: Sistema 4/8/16/24/32px para consistência visual
- **Mobile**: Stack vertical em telas pequenas, navigation drawer, cards full-width, botões touch-friendly