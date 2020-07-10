import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateStudentInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @Field()
    @IsString()
    @IsNotEmpty()
    lastname: string;
}
