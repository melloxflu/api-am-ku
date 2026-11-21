export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { email } = req.body;
    const API_KEY = 'AIzaSyDtG1AU22ErnQD60AzBAcaknySiz9_CEq0';
    
    try {
        const response = await fetch(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-android-package': 'com.alightcreative.motion' },
            body: JSON.stringify({
                requestType: 6, email: email, androidInstallApp: true, canHandleCodeInApp: true,
                continueUrl: 'https://alightcreative.com', androidPackageName: 'com.alightcreative.motion',
                androidMinimumVersion: '585', clientType: 'CLIENT_TYPE_ANDROID'
            })
        });
        const data = await response.json();
        return res.status(200).json({ success: true, raw_google: data });
    } catch (e) { return res.status(500).json({ error: e.message }); }
}
