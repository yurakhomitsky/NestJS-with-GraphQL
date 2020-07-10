import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
    constructor(
        // Injecting Student repository in order easy manage database operations
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async createStudent(
        createStudentInput: CreateStudentInput,
    ): Promise<Student> {
        const student = this.studentRepository.create({
            id: uuid(),
            ...createStudentInput,
        });
        return this.studentRepository.save(student);
    }

    async getStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async getStudent(id: string): Promise<Student> {
        return this.studentRepository.findOne({ id });
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                },
            },
        });
    }
}
