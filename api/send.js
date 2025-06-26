export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  if (!global.sock) return res.status(500).json({ error: 'Bot belum login / belum pairing' });

  const { number } = req.body;
  if (!number) return res.status(400).json({ error: 'Nomor harus diisi' });

  const jid = number + "@s.whatsapp.net";
  const bugMessage = `𝙎𝙋 𝘼𝙈 𝘽𝙔 𝘼𝙇𝙒𝘼𝙔𝙎 𝘼𝙉𝘼𝙉\n҉ͅ`;

  try {
    await global.sock.sendMessage(jid, { text: bugMessage });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
