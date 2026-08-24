-- Votação da roda para "Gingou!" — janelas de escuta/votação e registro de votos.
-- Rodar no Postgres (Neon): psql "$DATABASE_URL" -f sql/003_votacao_roda.sql

alter table sorteios_ginga add column if not exists escuta_termina_em timestamptz;
alter table sorteios_ginga add column if not exists votacao_termina_em timestamptz;
alter table sorteios_ginga add column if not exists escuta_pulada_em timestamptz;

create table if not exists votos_ginga (
  id uuid primary key default gen_random_uuid(),
  sorteio_id uuid not null references sorteios_ginga(id) on delete cascade,
  jogador_id uuid not null references jogadores_ginga(id) on delete cascade,
  voto text not null check (voto in ('gingou', 'voltou')),
  criado_em timestamptz not null default now(),
  unique (sorteio_id, jogador_id)
);
create index if not exists idx_votos_sorteio on votos_ginga(sorteio_id);
