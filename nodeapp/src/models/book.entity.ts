import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';


@Entity( )
export class Book {

    @PrimaryGeneratedColumn( )
    id?: number;

    @Column( )
    name?: string;

    @Column( )
    price?: number;

    @Column( )
    summary?: string;
}

export class BookValidator {
    
    @IsString( {message: `Name should be a string`} )
    @IsNotEmpty( {message: `Name should be defined`} )
    name?: string;

    @IsNumber( {}, {message: `Price should be a number`} )
    @IsNotEmpty( {message: `Price should be defined`} )
    price?: number;

    @IsString( {message: `Summary should be a string`} )
    @IsNotEmpty( {message: `Summary should be defined`} )
    summary?: string;
}