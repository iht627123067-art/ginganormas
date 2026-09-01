-- Poderes do facilitador sobre o tempo da carta ativa e a vez do jogador.
-- Rodar no Postgres (Neon): psql "$DATABASE_URL" -f sql/004_poderes_facilitador.sql

alter table sorteios_ginga add column if not exists pausado_em timestamptz;
