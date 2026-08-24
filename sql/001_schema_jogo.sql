-- Entre na Roda GINGA — schema do jogo online
-- Rodar no Postgres (Neon): psql "$DATABASE_URL" -f sql/001_schema_jogo.sql

create extension if not exists "pgcrypto";

create table if not exists baralho_ginga (
  id text primary key,
  dimensao text not null,
  cor_hex text not null,
  carta text not null,
  definicao text not null,
  pergunta text not null
);

create table if not exists mesas_ginga (
  id uuid primary key default gen_random_uuid(),
  codigo text unique not null,
  nome text not null,
  host_token text not null,
  estado text not null default 'lobby', -- lobby | em_jogo | encerrada
  turno_jogador_id uuid,
  carta_ativa_id uuid,
  vencedor_jogador_id uuid,
  criada_em timestamptz not null default now()
);

create table if not exists jogadores_ginga (
  id uuid primary key default gen_random_uuid(),
  mesa_id uuid not null references mesas_ginga(id) on delete cascade,
  nome text not null,
  fichas int not null default 3,
  device_token text not null unique,
  entrou_em timestamptz not null default now()
);
create index if not exists idx_jogadores_mesa on jogadores_ginga(mesa_id);

create table if not exists sorteios_ginga (
  id uuid primary key default gen_random_uuid(),
  mesa_id uuid not null references mesas_ginga(id) on delete cascade,
  carta_id text not null references baralho_ginga(id),
  jogador_id uuid not null references jogadores_ginga(id),
  resultado text not null default 'ativa', -- ativa | gingou | voltou | entrei_na_roda
  criado_em timestamptz not null default now(),
  resolvido_em timestamptz,
  unique (mesa_id, carta_id) -- trava concorrência: 1 carta por mesa, no banco
);
create index if not exists idx_sorteios_mesa on sorteios_ginga(mesa_id);

create table if not exists conquistas_ginga (
  id uuid primary key default gen_random_uuid(),
  mesa_id uuid not null references mesas_ginga(id) on delete cascade,
  jogador_id uuid not null references jogadores_ginga(id),
  dimensao text not null,
  carta_id text not null references baralho_ginga(id),
  criada_em timestamptz not null default now(),
  unique (jogador_id, dimensao) -- 1 conquista por dimensão por jogador
);
create index if not exists idx_conquistas_mesa on conquistas_ginga(mesa_id);
