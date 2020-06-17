const { Contract } = require('fabric-contract-api');

class Sensrnet extends Contract {

    async initLedger(ctx) {
        const sensors = [
            {
                sensorId: '1',
                nodeId: '1',
                ownerId: '1',
                name: 'Test Sensor',
            }
        ];
        for (let i = 0; i < sensors.length; i++) {
            sensors[i].docType = 'sensor';
            await ctx.stub.putState('SENSOR' + i, Buffer.from(JSON.stringify(sensors[i])));
        }
    }

    async querySensor(ctx, eventId) {
        const sensorAsBytes = await ctx.stub.getState(eventId);
        if (!sensorAsBytes || sensorAsBytes.length === 0) {
            throw new Error(`${eventId} does not exist`);
        }
        return sensorAsBytes.toString();
    }

    async publishEvent(ctx, payload) {
        const obj = JSON.parse(payload);
        await ctx.stub.putState(obj.messageId, Buffer.from(JSON.stringify(obj)));
    }
}

module.exports = Sensrnet;
