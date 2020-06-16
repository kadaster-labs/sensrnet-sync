export abstract class Event {
  public readonly aggregateId: string;

  protected constructor(aggregateId: string) {
    this.aggregateId = aggregateId;
  }

  abstract streamRoot(): string;

}
