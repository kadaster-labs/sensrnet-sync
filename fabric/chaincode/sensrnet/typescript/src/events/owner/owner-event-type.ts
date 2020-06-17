import {OwnerDeleted, OwnerRegistered, OwnerUpdated} from '.';

class OwnerEventType {
  constructor() {
    this.add(OwnerRegistered);
    this.add(OwnerUpdated);
    this.add(OwnerDeleted);
  }

  private supportedTypes: { [key: string]: any; } = {};

  getType(eventTypeName: string) {
    const t = this.supportedTypes[eventTypeName];
    if (!t) {
      // tslint:disable-next-line:no-console
      console.warn(`Unsupported event received! eventType: ${eventTypeName}`);
    }
    return t;
  }

  private add(event: any) {
    this.supportedTypes[event.name] = event;
  }

  getSupportedEventTypes(): string[] {
    return this.supportedTypes.map((k, _) => k);
  }
}

export const ownerEventType = new OwnerEventType();
