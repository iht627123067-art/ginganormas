-- Redesenha "Entro na roda": vira uma reserva de fala real. Quem clica reserva
-- a vez (só 1 pessoa por rodada, liberado 30s após a carta atual ser puxada);
-- ao fim da votação da carta atual, o sistema puxa uma carta da mesma dimensão
-- para quem reservou, com 2 minutos de fala própria, decidida por votação da
-- roda (gingou/voltou) — deixa de ser conquista instantânea.
-- Rodar no Postgres (Neon): psql "$DATABASE_URL" -f sql/005_entrar_na_roda_v2.sql

alter table sorteios_ginga add column if not exists roda_solicitante_id uuid references jogadores_ginga(id);
alter table sorteios_ginga add column if not exists eh_entrada_roda boolean not null default false;
