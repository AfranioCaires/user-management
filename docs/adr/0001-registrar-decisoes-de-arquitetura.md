# 0001. Registrar decisões de arquitetura

## Contexto

O projeto tem duas aplicações e várias escolhas transversais: ferramentas, validação, gerenciamento de estado. Sem registro escrito, o motivo dessas escolhas se perde, e quem revisa não distingue um trade-off deliberado de um acidente.

## Decisão

As decisões relevantes são registradas como ADRs (Architecture Decision Records) em `docs/adr`, no formato leve popularizado por Michael Nygard. Cada registro tem número, título e as seções Contexto, Decisão e Consequências. Depois de aceito, um registro não é reescrito: uma nova ADR o substitui.

## Consequências

- Quem chega ao projeto entende por que o sistema é como é sem precisar escavar o histórico do git.
- Mudar uma decisão exige escrever uma nova ADR, o que deixa a reversão explícita.
