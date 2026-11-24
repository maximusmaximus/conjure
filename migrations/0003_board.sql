-- Opt-in scoreboard. Handle, score, and streak only. No wallet, no email.

create table if not exists conjure_board (
  device_id text primary key,
  handle text not null,
  xp integer not null,
  streak integer not null,
  level text not null,
  updated_at timestamptz not null default now()
);
