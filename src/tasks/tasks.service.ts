import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto, UpdateTaskDto } from './task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async getAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async markTaskAsCompleted(id: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { isCompleted: true }, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }

  async markTaskAsNotCompleted(id: string): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { isCompleted: false }, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return updatedTask;
  }
}
