import { Entity, Column } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, BaseValidator } from "./base";


@Entity( )
export class Blog extends BaseEntity {

    @Column( )
    name?: string;

    @Column( )
    content?: string;
} 

export class BlogValidator extends BaseValidator {
    
    @IsString( {message: `Content should be a string`} )
    @IsNotEmpty( {message: `Content should be defined`} )
    content?: string;
}