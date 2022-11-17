import { Entity, Column } from "typeorm";
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { BaseEntity, BaseValidator } from "./base";


@Entity( )
export class Book extends BaseEntity {

    @Column( )
    name?: string;

    @Column( )
    price?: number;

    @Column( )
    summary?: string;
}

export class BookValidator extends BaseValidator {

    @IsNumber( {}, {message: `Price should be a number`} )
    @IsNotEmpty( {message: `Price should be defined`} )
    price?: number;

    @IsString( {message: `Summary should be a string`} )
    @IsNotEmpty( {message: `Summary should be defined`} )
    summary?: string;
}