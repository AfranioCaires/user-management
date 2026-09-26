# 0010. Idioma da interface e das mensagens de erro

## Contexto

O design no Figma, que é a referência visual e de conteúdo do projeto, está todo em inglês: o título "User Management", os rótulos "Name" e "Status", os cabeçalhos da tabela, a paginação ("First", "Last", "Showing results", "per page"), os modais ("Delete User", "Edit User", "Cancel") e os toasts ("User successfully deleted.", "Error deleting user."). A equipe escreve documentação e descrições de teste em português.

## Decisão

Todo texto voltado ao usuário é exibido em inglês, seguindo o Figma:

- **Frontend**: rótulos, botões, títulos, estados vazio, de carregamento e de erro ("No users found.", "We couldn’t load the users."), mensagens de validação de formulário ("Name is required.") e toasts de sucesso e de erro.
- **Backend**: as mensagens de erro da API (por exemplo, "Character with id 5 was not found" e "Request validation failed") e os códigos de erro (`CHARACTER_NOT_FOUND`, `VALIDATION_FAILED`), que também chegam ao cliente.
- **Textos acessíveis** (`aria-label`, `caption`, nomes de landmarks) ficam em inglês, para que o leitor de tela use o mesmo idioma da interface. O documento declara `lang="en"`.

O idioma interno do projeto continua como antes: o código é em inglês, e a documentação e as descrições dos testes são em português.

## Consequências

- A interface segue o Figma sem traduções parciais, e o leitor de tela pronuncia os textos corretamente.
- Se o produto precisar de outros idiomas, os textos terão de ser extraídos para uma camada de internacionalização. Hoje eles ficam nos componentes e nos erros de domínio.
