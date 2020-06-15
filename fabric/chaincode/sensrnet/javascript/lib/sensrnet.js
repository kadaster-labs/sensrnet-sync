/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Sensrnet extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const sensors = [
            {
                sensorId: '1',
                nodeId: '1',
                ownerId: '1',
                name: 'Camera',
            },
            {
                sensorId: '2',
                nodeId: '1',
                ownerId: '1',
                name: 'Verkeerslicht',
            }
        ];

        for (let i = 0; i < sensors.length; i++) {
            sensors[i].docType = 'sensor';
            await ctx.stub.putState('SENSOR' + i, Buffer.from(JSON.stringify(sensors[i])));
            console.info('Added <--> ', sensors[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async querySensor(ctx, sensorNumber) {
        const sensorAsBytes = await ctx.stub.getState(sensorNumber); // get the sensor from chaincode state
        if (!sensorAsBytes || sensorAsBytes.length === 0) {
            throw new Error(`${sensorNumber} does not exist`);
        }
        console.log(sensorAsBytes.toString());
        return sensorAsBytes.toString();
    }

    async createSensor(ctx, sensorNumber, sensorId, nodeId, ownerId, name) {
        console.info('============= START : Create Car ===========');

        const car = {
            color: ownerId,
            docType: 'sensor',
            make: sensorId,
            model: nodeId,
            owner: name,
        };

        await ctx.stub.putState(sensorNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllSensors(ctx) {
        const startKey = 'SENSOR0';
        const endKey = 'SENSOR999';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeSensorOwner(ctx, sensorNumber, newOwnerId) {
        console.info('============= START : changeCarOwner ===========');

        const sensorAsBytes = await ctx.stub.getState(sensorNumber); // get the car from chaincode state
        if (!sensorAsBytes || sensorAsBytes.length === 0) {
            throw new Error(`${sensorNumber} does not exist`);
        }
        const car = JSON.parse(sensorAsBytes.toString());
        car.ownerId = newOwnerId;

        await ctx.stub.putState(sensorNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeSensorOwner ===========');
    }

}

module.exports = Sensrnet;
