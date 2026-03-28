/*
  # Create cached_responses table for Gemini response caching

  1. New Tables
    - `cached_responses`
      - `id` (uuid, primary key)
      - `question_hash` (text, indexed) - SHA-256 of normalized question + mode
      - `mode` (text) - normal, air, or max
      - `question_text` (text) - original question for debugging
      - `response_json` (jsonb) - the full Gemini response
      - `created_at` (timestamptz) - when cached
      - `ttl_hours` (integer, default 72) - how long the cache entry is valid

  2. Security
    - RLS enabled
    - No public policies — only accessible via service role (Edge Functions)

  3. Notes
    - Identical questions return cached results instead of calling Gemini again
    - Dramatically reduces API costs during development and repeated queries
*/

CREATE TABLE IF NOT EXISTS cached_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_hash text NOT NULL,
  mode text NOT NULL DEFAULT 'normal',
  question_text text NOT NULL DEFAULT '',
  response_json jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  ttl_hours integer NOT NULL DEFAULT 72
);

CREATE INDEX IF NOT EXISTS idx_cached_responses_hash
  ON cached_responses (question_hash);

ALTER TABLE cached_responses ENABLE ROW LEVEL SECURITY;
