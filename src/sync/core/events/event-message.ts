export class EventMessage {
  constructor(
    public readonly streamId: string,
    public readonly eventType: string,
    public readonly data: object = {},
    public readonly metadata: object = {},
  ) {
  }
}
