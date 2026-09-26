# 0003. DDD e Clean Architecture no backend

## Contexto

O backend precisa de uma fonte de dados que permita consultar, renomear e remover personagens, com modelagem inspirada na API Rick and Morty. Mesmo nesse tamanho, queremos que as regras de negócio, como o que torna um nome válido, sejam testáveis sem HTTP e sem framework, e que a persistência seja substituível.

## Decisão

Cada contexto delimitado fica em `src/modules/<contexto>`, em quatro camadas. As dependências apontam apenas para dentro:

| Camada           | Conteúdo                                                             | Pode depender de    |
| ---------------- | -------------------------------------------------------------------- | ------------------- |
| `domain`         | Entidades, value objects, portas de repositório, erros de domínio    | nada                |
| `application`    | Use cases, uma classe por operação, com um único `execute`           | domain              |
| `infrastructure` | Adaptadores que implementam as portas (repositório em memória, seed) | domain, application |
| `presentation`   | Controllers, schemas Zod de requisição, presenters                   | application         |

- **Domínio e aplicação** são TypeScript puro, sem decorators do Nest. Os use cases são registrados no módulo via `useFactory`.
- **Portas** são classes abstratas, que também servem de token de injeção do Nest, sem tokens em string.
- **`CharacterName`** garante as próprias invariantes: remove espaços nas pontas, colapsa espaços internos e aceita de 1 a 100 caracteres.
- **Erros de domínio** estendem `NotFoundError` ou `ValidationError`. Um único exception filter os converte em 404 e 422, e o domínio não conhece HTTP.
- **Presenters** montam as respostas no formato da API Rick and Morty (`info` + `results`). Entidades nunca são serializadas diretamente.
- **O repositório em memória** é populado com 6.748 personagens gerados por um PRNG com semente fixa, então os dados são idênticos a cada execução. Ele clona as entidades na leitura e na escrita, para que alterações não salvas não vazem.
- **Os imports** usam os aliases `@/*` (para `src`) e `@test/*` (para `test`), declarados em `paths` no `tsconfig.json`, em vez de caminhos relativos longos. Como o `tsc` não reescreve `paths` no JavaScript emitido, o build roda o `tsc-alias` em seguida, e o Vitest resolve os mesmos aliases.
- **O TypeScript 7** compila o código com `tsc`. O Nest CLI não é usado, porque depende da API JS do compilador, que o TypeScript 7 não expõe mais. Nos testes, o SWC (`unplugin-swc`) emite os metadados de decorators.

## Consequências

- Os use cases são testados contra o repositório em memória, em milissegundos.
- Trocar para um banco real significa adicionar um adaptador e trocar um provider.
- Cada operação tem um pouco mais de código, em troca de responsabilidades claras.
