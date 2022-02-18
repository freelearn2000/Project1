import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';


@Entity()

export class Product {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    price?: number;
}

export class ProductValidator {

    @IsString( {message: `title should be string`} )
    @IsNotEmpty( {message: `title should be defined`} )
    name?: string;
    
    @IsString( {message: `price should be string`} )
    @IsNotEmpty( {message: `price should be defined`} )
    price?: number;
}
