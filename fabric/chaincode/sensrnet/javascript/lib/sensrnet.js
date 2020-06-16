const { Contract } = require('fabric-contract-api');

class Sensrnet extends Contract {

    async initLedger(ctx) {
        const sensors = [
            {
                sensorId: '1',
                nodeId: '1',
                ownerId: '1',
                name: 'Camera',
            }
        ];
        for (let i = 0; i < sensors.length; i++) {
            sensors[i].docType = 'sensor';
            await ctx.stub.putState('SENSOR' + i, Buffer.from(JSON.stringify(sensors[i])));
        }
    }

    async querySensor(ctx, sensorId) {
        const sensorAsBytes = await ctx.stub.getState(sensorId);
        if (!sensorAsBytes || sensorAsBytes.length === 0) {
            throw new Error(`${sensorId} does not exist`);
        }
        return sensorAsBytes.toString();
    }

    async createSensor(ctx, sensorId, nodeId, ownerId, name) {
        const sensor = {
            sensorId: sensorId,
            nodeId: nodeId,
            ownerId: ownerId,
            name: name,
            docType: 'sensor',
        };
        await ctx.stub.putState(sensorId, Buffer.from(JSON.stringify(sensor)));
    }

    async changeSensorOwner(ctx, sensorId, newOwnerId) {
        const sensorAsBytes = await ctx.stub.getState(sensorId);
        if (!sensorAsBytes || sensorAsBytes.length === 0) {
            throw new Error(`Sensor ${sensorId} does not exist.`);
        }
        const sensor = JSON.parse(sensorAsBytes.toString());
        sensor.ownerId = newOwnerId;

        await ctx.stub.putState(sensorId, Buffer.from(JSON.stringify(sensor)));
    }
}

module.exports = Sensrnet;
