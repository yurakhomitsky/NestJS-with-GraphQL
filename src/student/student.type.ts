import { Field, ID, ObjectType } from '@nestjs/graphql';

// We defining Type for GraphQl schema.
@ObjectType('Student')
export class StudentType {
    @Field(type => ID)
    id: string;

    @Field()
    firstname: string;

    @Field()
    lastname: string;
}
