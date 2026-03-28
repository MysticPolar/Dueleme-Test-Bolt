/*
  # Create app_config table for secure server-side settings

  1. New Tables
    - `app_config`
      - `key` (text, primary key) - setting name
      - `value` (text, not null) - setting value
      - `created_at` (timestamptz) - when the setting was added

  2. Security
    - RLS enabled
    - No public policies — only accessible via service role (Edge Functions)
    - This table stores sensitive values like API keys that must never reach the frontend
*/

CREATE TABLE IF NOT EXISTS app_config (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
