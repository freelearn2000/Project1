import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';


@Entity( )
export class BaseEntity{

    @PrimaryGeneratedColumn( )
    id?: number;
}

export class BaseValidator {
    
    @IsString( {message: `Name should be a string`} )
    @IsNotEmpty( {message: `Name should be defined`} )
    name?: string;
}    
