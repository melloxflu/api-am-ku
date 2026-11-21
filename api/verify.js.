export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { email, oobCode } = req.body;
    const API_KEY = 'AIzaSyDtG1AU22ErnQD60AzBAcaknySiz9_CEq0';
    
    // TOKEN INI BISA EXPIRED. KALAU GAGAL, GANTI PAKAI TOKEN BARU
    const PLAY_TOKEN = 'mmgaobamlahbbeccfplmbkbb.AO-J1OzqG0or_GJJIx-ms8GrTm-jaglCRfhQSRPUZKpl2YspYS-oN7_94uv8RC5vQbvd_Ios2pPDStZ2n7F0hLE3FiOU7HS3R6Fquulv5xLXFECSv4ctElw';

    try {
        // 1. Dapet Token Firebase
        const authRes = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/emailLinkSignin?key=${API_KEY}`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, oobCode, clientType: 'CLIENT_TYPE_ANDROID' })
        });
        
        const authData = await authRes.json();
        if (!authData.idToken) return res.status(400).json({ error: 'Gagal login firebase', raw: authData });

        const idToken = authData.idToken;

        // 2. Tembak Premium
        const vfyRes = await fetch('https://us-central1-alight-creative.cloudfunctions.net/verifyPurchase', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json; charset=utf-8', 
                'User-Agent': 'okhttp/3.12.1', 
                'Authorization': 'Bearer ' + idToken 
            },
            body: JSON.stringify({ 
                data: { 
                    productId: 'am.full.sub.annual.19q4', 
                    token: PLAY_TOKEN, 
                    skuType: 'subs', 
                    orderId: 'neo-' + Date.now() 
                } 
            })
        });
        
        const vfyData = await vfyRes.json();
        return res.status(200).json({ success: true, result: vfyData });
    } catch (e) { return res.status(500).json({ error: e.message }); }
}
