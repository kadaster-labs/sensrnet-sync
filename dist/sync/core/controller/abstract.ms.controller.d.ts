import { AbstractMsConsumer } from '../processor/abstract.mc.consumer';
import { OffsetBody } from './model/offset-body';
export declare class AbstractMultiChainController {
    private readonly multichainConsumer;
    constructor(multichainConsumer: AbstractMsConsumer);
    retrieveMultichainOffset(): Promise<number>;
    setMultichainOffset(body: OffsetBody): Promise<void>;
}
