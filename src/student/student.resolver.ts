import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { CreateStudentInput } from './create-student.input';
import { StudentService } from './student.service';

// Resolver class we can think of it as the equivalent for a controller
// in a RESTful services
/*
    The resolver will handle  incoming request and then
    return the response.

*/

@Resolver(of => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    // Query for retrieve all students
    @Query(returns => [StudentType])
    students() {
        return this.studentService.getStudents();
    }

    // Query for retrieve student
    @Query(returns => StudentType)
    student(@Args('id') id: string) {
        return this.studentService.getStudent(id);
    }

    // Mutation for createStudent
    @Mutation(returns => StudentType)
    createStudent(
        @Args('createStudentInput') createStudentInput: CreateStudentInput,
    ) {
        return this.studentService.createStudent(createStudentInput);
    }
}
