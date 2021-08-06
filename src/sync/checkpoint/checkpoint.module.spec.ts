import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CheckpointService } from './checkpoint.service';

const testCheckpoints = [
    { _id: 'test-checkpoint', offset: 5 },
    { _id: 'test-checkpoint-2', offset: 3 },
];

const mockRepository = {
    findOne: (conditions) => {
        const filteredTestObjects = testCheckpoints.filter((elem) => elem._id === conditions._id);
        return filteredTestObjects.length ? filteredTestObjects[0] : undefined;
    },
    updateOne: () => void 0,
};

describe('Checkpoint (integration)', () => {
    let moduleRef;

    beforeAll(async () => {
        moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: getModelToken('Checkpoint'),
                    useValue: mockRepository,
                },
                CheckpointService,
            ],
        }).compile();
    });

    it(`Should retrieve a checkpoint`, async () => {
        const conditions = { _id: testCheckpoints[0]._id };
        const checkpointService: CheckpointService = moduleRef.get(CheckpointService);
        const checkpoint = await checkpointService.findOne(conditions);

        expect(checkpoint).toBeDefined();
        expect(checkpoint._id).toBe(conditions._id);
    });

    it(`Should not retrieve a checkpoint`, async () => {
        const conditions = { _id: 'non-existing-checkpoint' };
        const checkpointService: CheckpointService = moduleRef.get(CheckpointService);
        const checkpoint = await checkpointService.findOne(conditions);

        expect(checkpoint).not.toBeDefined();
    });

    it(`Should update a checkpoint`, async () => {
        const update = { offset: 5 };
        const conditions = { _id: testCheckpoints[0]._id };
        const checkpointService: CheckpointService = moduleRef.get(CheckpointService);

        let success;
        try {
            await checkpointService.updateOne(conditions, update);
            success = true;
        } catch {
            success = false;
        }

        expect(success).toBeTruthy();
    });
});
