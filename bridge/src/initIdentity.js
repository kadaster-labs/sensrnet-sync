const fs = require('fs');
const path = require('path');
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const adminName = 'admin';
const adminSecret = 'adminpw';
const connectionFileName = 'connection.json';

async function init() {
    const ccpPath = path.resolve(__dirname, '..', connectionFileName);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const caKey = Object.keys(ccp['certificateAuthorities'])[0]
    const caInfo = ccp['certificateAuthorities'][caKey];
    const caTLSCACerts = caInfo['tlsCACerts'].pem;

    const orgKey = Object.keys(ccp['organizations'])[0]
    const mspId = ccp['organizations'][orgKey].mspid;

    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    let adminIdentity = await wallet.get(adminName);
    if (!adminIdentity) {
        const enrollment = await ca.enroll({enrollmentID: adminName, enrollmentSecret: adminSecret});
        adminIdentity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: mspId,
            type: 'X.509',
        };
        await wallet.put(adminName, adminIdentity);
    }

}

init().then(() => console.log('Enrolled admin and user.'), (error) => console.log(`Failed to enroll user: ${error}`));
