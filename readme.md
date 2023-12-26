## 📝 Sobre

Você pode visualizar o código NextJS [aqui](https://lista-de-tarefas-wmanzoli.vercel.app).<br/>
Ou siga as instruções abaixo para executar a aplicação em sua máquina.

## 🏁 Iniciar a Aplicação

### 1. **Primeiro, instale as dependências dos repositorios que deseja executar:**
```
cd lista-de-tarefas && yarn
cd lista-de-tarefas/packages/app && yarn
   
cd lista-de-tarefas/apps/next && yarn
cd lista-de-tarefas/apps/expo && yarn
```
   
### 2. **Execute a aplicação que desejar:**

#### Web
```
cd lista-de-tarefas && yarn web
```
- Isso executa `next dev`


#### Mobile
```
cd lista-de-tarefas && yarn native
```
  - Isso executa `expo start`

⚠ Certifique-se de ter todas as dependências necessárias específicas para o ambiente de desenvolvimento React Native.
[Saiba Mais...](https://react-native.rocketseat.dev)

## 📦 Pacotes Incluídos

- `solito`: Para codigo multiplataforma.
- `moti`: Para animações.
- `nativewind`: Para temas/design.
- Expo SDK 49
- Next.js 13
- Expo Router 2

## 📁 Estrutura de Pastas

- `apps`: Pontos de entrada para cada aplicativo.

  - `expo`: Responsável pelo roteamento do sistema de arquivos no iOS e Android.
  - `next`: Roteamento do sistema Web.


- `packages`: Pacotes compartilhados entre aplicativos.

  - `app`
    - `api`: Serviços de requisição à API.
    - `types`: Tipagem e Interfaces Typescript.
    - `features`: Telas dos Aplicativos.
    - `provider`: Todos os provedores que envolvem o aplicativo.
    - `design`: O sistema de design do seu aplicativo (ícones, tipografia, layouts, etc.).
    