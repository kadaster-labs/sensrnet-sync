const fs = require('fs');
const path = require('path');
const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');

const adminName = 'admin';
const connectionFileName = 'connection-org1.json';
const certificateAuthority = 'ca.org1.example.com';

function getCertificate() {
    const ccpPath = path.resolve(__dirname, '..', connectionFileName);
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    return ccp['certificateAuthorities'][certificateAuthority];
}

async function init() {
    const caInfo = getCertificate();
    const caTLSCACerts = caInfo['tlsCACerts'].pem;

    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false },
        caInfo.caName);
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    let adminIdentity = await wallet.get(adminName);
    if (!adminIdentity) {
        const enrollment = await ca.enroll({enrollmentID: adminName, enrollmentSecret: 'adminpw'});
        adminIdentity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(adminName, adminIdentity);
    }
}

init().then(() => console.log('Enrolled admin and user.'), () => console.log(`Failed to enroll user: ${error}`));
