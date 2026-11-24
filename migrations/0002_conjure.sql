-- Shared cauldrons. Rows are unowned: anyone with the room code can play.
-- No emails, no raw audio, no camera frames.

create table if not exists conjure_rooms (
  code text primary key,
  host_id text not null,
  vibe text not null,
  locked boolean not null default false,
  consent text,
  updated_at timestamptz not null default now()
);

create table if not exists conjure_members (
  code text not null references conjure_rooms (code) on delete cascade,
  device_id text not null,
  name text not null,
  role text not null,
  seat text not null,
  color text not null,
  sensors text not null default '{}',
  last_seen timestamptz not null default now(),
  primary key (code, device_id)
);

create table if not exists conjure_drops (
  id text primary key,
  code text not null references conjure_rooms (code) on delete cascade,
  ingredient text not null,
  by_device text not null,
  at_ms bigint not null,
  neutral boolean not null default false
);

create index if not exists conjure_drops_code on conjure_drops (code, at_ms);

create table if not exists conjure_room_creates (
  id bigserial primary key,
  device_id text not null,
  created_at timestamptz not null default now()
);

create table if not exists conjure_reports (
  id bigserial primary key,
  creation_id text not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists conjure_events (
  id bigserial primary key,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists conjure_mints (
  id bigserial primary key,
  device_id text not null,
  creation_id text not null,
  created_at timestamptz not null default now(),
  unique (device_id, creation_id)
);
