import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity, BaseValidator } from "./base.entity";


@Entity()
export class Product extends BaseEntity{

    @Column()
    name?: string;

    @Column()
    price?: number;
}

export class ProductValidator extends BaseValidator{
    
    @IsNotEmpty( {message: `price should be defined`} )
    price?: number;
}
