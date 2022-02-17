import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString,Matches } from 'class-validator';


@Entity( )
export class Blog {

    @PrimaryGeneratedColumn( )
    id?: number;

    @Column( )
    name?: string;

    @Column( )
    content?: string;
} 

export class BlogValidator {

    @Matches( (/^[a-zA-Z\-]+$/), {message: 'Name should be a String'} )
    @IsString( {message: 'Name should be a string'} )
    @IsNotEmpty( {message: 'Name should be defined'} )
    name?: string;

    @IsString( {message: `Content should be a string`} )
    @IsNotEmpty( {message: `Content should be defined`} )
    content?: string;
}