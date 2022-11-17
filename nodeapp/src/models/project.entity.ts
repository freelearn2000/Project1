import { Entity, Column } from "typeorm";
import { IsNotEmpty, IsString } from "class-validator";
import { BaseEntity, BaseValidator } from "./base";


@Entity( )
export class Project extends BaseEntity {

    @Column( )
    name?: string;

    @Column( )
    duration?: string;
}

export class ProjectValidator extends BaseValidator {
  
    @IsString( {message: 'Duration should be a string'} )
    @IsNotEmpty( {message: 'Duration should be defined'} )
    duration?: string;
}