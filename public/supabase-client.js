/* ── Supabase REST client (no SDK) ───────────────────────── */
// Publishable key is intentionally embedded — it is safe for browser use
// when Row Level Security is enabled on the table.
const SUPA_URL = 'https://zqhpmyooctdcrjfniddp.supabase.co';
const SUPA_KEY = 'sb_publishable_BBClJv-XVLplkpCNf0uvOg_mPnECHMC';

/**
 * Insert a single row into a Supabase table.
 * @param {string} table
 * @param {object} data
 */
export async function supaInsert(table, data) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => String(res.status));
    throw new Error(`Supabase insert ${res.status}: ${msg}`);
  }
}

/**
 * Fetch rows from a Supabase table.
 * @param {string} table
 * @param {Record<string,string>} params  PostgREST query params
 * @returns {Promise<object[]>}
 */
export async function supaFetch(table, params = {}) {
  const url = new URL(`${SUPA_URL}/rest/v1/${table}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    headers: {
      apikey: SUPA_KEY,
      Authorization: `Bearer ${SUPA_KEY}`,
    },
  });
  if (!res.ok) throw new Error(`Supabase fetch ${res.status}`);
  return res.json();
}
