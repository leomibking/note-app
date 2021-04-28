# NoteApp

- NestJS API + CQRS
- Prisma (ORM)
- React (web)

## cria um workspace

` npx create-nx-workspace`

## adiciona os plugins

`yarn add -D nx @nrwl/node @nrwl/react @nrwl/nest`

## cria uma lib node chamada shared

`yarn nx generate @nrwl/node:library shared`

## cria um app react chamado web

`yarn nx g @nrwl/react:app web`

## cria um app nestjs chamado api

`yarn nx generate @nrwl/nest:application api`

## referencias

- https://nx.dev/latest/react/cli/generate
- https://nx.dev/latest/react/node/overview
- https://nx.dev/latest/react/react/overview
- https://nx.dev/latest/react/nest/overview

This project was generated using [Nx](https://nx.dev).
