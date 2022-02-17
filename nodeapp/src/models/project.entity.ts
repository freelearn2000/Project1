import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsDefined } from "class-validator";



@Entity( )
export class Project {

    @PrimaryGeneratedColumn( )
    id?: number;

    @Column( )
    name?: string;

    @Column( )
    duration?: string;
}

export class ProjectValidator {

    //@IsDefined( {message:'Name should be defined'})
    @IsString( {message: 'Name should be a string'} )
    @IsNotEmpty( {message: 'Name should be defined'} )
    name?: string;
    
    @IsString( {message: 'Duration should be a string'} )
    @IsNotEmpty( {message: 'Duration should be defined'} )
    duration?: string;
}