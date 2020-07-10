import {
    Resolver,
    Query,
    Mutation,
    Args,
    Parent,
    ResolveField,
} from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
    constructor(
        private lessonService: LessonService,
        private studentService: StudentService,
    ) {}

    @Query(returns => LessonType)
    lesson(@Args('id') id: string): Promise<Lesson> {
        return this.lessonService.getLesson(id);
    }

    @Query(returns => [LessonType])
    lessons(): Promise<Lesson[]> {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
        @Args('createLessonInput') createLessonInput: CreateLessonInput,
    ) {
        return this.lessonService.createLesson(createLessonInput);
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args('assignStudentsToLesson')
        assignStudentsToLesson: AssignStudentsToLessonInput,
    ) {
        const { lessonId, studentIds } = assignStudentsToLesson;
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
    }

    /* 
        The Lesson resolver
        Whenever I try resolve a student's field
        run this function
    
    */

    /*
        Parent object will looks like
        Lesson {
            id: 'a385c40a-d477-489f-8420-5303a3919845',
            name: 'Java3',
            startDate: '2020-03-28T18:30:00Z',
            endDate: '2020-03-28T18:00:00Z',
            students: [ '48426b44-6e60-4262-8cc0-af55a8853286' ],
            _id: 5f0877e649841d2028f42e04
        }
    */
    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        console.log(lesson);
        return this.studentService.getManyStudents(lesson.students);
    }
}
