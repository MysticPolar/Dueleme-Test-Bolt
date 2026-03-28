/*
  # Add unique constraint on question_hash

  1. Modified Tables
    - `cached_responses`
      - Add unique constraint on `question_hash` to support upsert operations

  2. Notes
    - Required for the Edge Function cache-write upsert logic
*/

ALTER TABLE cached_responses
  ADD CONSTRAINT cached_responses_question_hash_unique UNIQUE (question_hash);
