export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
}

export class UpdateTaskDto {
  readonly title?: string;
  readonly description?: string;
  readonly completionStatus?: string;
}
