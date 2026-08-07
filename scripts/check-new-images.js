// Verify all newly-assigned Pexels image IDs return HTTP 200
const ids = [
  27647440,13219418,37320179,16370914,19279351,934586,15173334,28586234,17707574,
  30929605,35596695,31763620,7996793,15301578,37214905,16408959,32370506,27062931,
  30557705,35101084,33974297,7031405,31640021,31656173,5674684,14424262,13812522,
  11643330,33244441,21071043,7031411,30580640,9170385,31656143,27459248,7031581,
  37224965,16110999,27675475,3027448,5403840,14433524,12993967,7510459,15422346,
  6342356,36611285,32666364,27307400,7031604,16631149,16583796,13070528,87223,
  7735233,20296321
];
const url = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;
(async () => {
  const results = await Promise.all(ids.map(async (id) => {
    try {
      const r = await fetch(url(id), { method: "HEAD" });
      return { id, ok: r.status === 200, status: r.status };
    } catch (e) {
      return { id, ok: false, status: "ERR " + e.message };
    }
  }));
  const bad = results.filter((r) => !r.ok);
  console.log("Checked " + results.length + " new images; " + (results.length - bad.length) + " OK; " + bad.length + " FAILED");
  bad.forEach((b) => console.log("  FAIL id " + b.id + " -> " + b.status));
})().catch((e) => { console.error(e); process.exit(1); });
