export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!global.sock) return res.status(500).json({ error: 'Bot belum login / belum pairing' })

  const { number } = req.body
  if (!number) return res.status(400).json({ error: 'Nomor target kosong!' })

  try {
    const jid = number + "@s.whatsapp.net"
    await global.sock.sendMessage(jid, { text: "🚨 YARCRASHER ACTIVE\nSPAM ACTIVATED 💣" })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.toString() })
  }
}
