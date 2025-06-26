import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import pino from 'pino'
import path from 'path'
import { fileURLToPath } from 'url'
import { makeWAS } from '../all/place.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sessionPath = path.join(__dirname, '../session')

let sock = null

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { number } = req.body
  if (!number) return res.status(400).json({ error: 'Nomor tidak boleh kosong' })

  const { state, saveCreds } = await useMultiFileAuthState(sessionPath)
  const { version } = await fetchLatestBaileysVersion()

  sock = makeWAS({
    version,
    logger: pino({ level: 'silent' }),
    auth: state,
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "20.0.04"]
  })

  sock.ev.on('creds.update', saveCreds)
  try {
    const code = await sock.requestPairingCode(number)
    global.sock = sock
    res.json({ pairingCode: code })
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil pairing code', detail: err.toString() })
  }
}
