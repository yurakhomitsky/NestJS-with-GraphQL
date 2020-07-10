import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';
import { Student } from './student/student.entity';

@Module({
    imports: [
        // TypeOrmModule for connect to database
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://localhost/school',
            synchronize: true,
            useUnifiedTopology: true,
            entities: [Lesson, Student], // Entities for database
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        LessonModule, // Here we need to provide our modules
        StudentModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
