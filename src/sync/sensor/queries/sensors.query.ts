import { IQuery } from '@nestjs/cqrs';

export class RetrieveSensorsQuery implements IQuery {
    constructor(
        public readonly id: string,
    ) {}
}
