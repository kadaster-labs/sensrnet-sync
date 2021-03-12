export declare class EventMessage {
    readonly streamId: string;
    readonly eventType: string;
    readonly data: Record<string, any>;
    readonly metadata: Record<string, any>;
    constructor(streamId: string, eventType: string, data?: Record<string, any>, metadata?: Record<string, any>);
}
