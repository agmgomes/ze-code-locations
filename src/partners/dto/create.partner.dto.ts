import { Type } from "class-transformer";
import { IsArray, IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { IsDocumentUnique } from "../validators/document-unique.decorator";

class CoverageAreaDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['MultiPolygon'])
    type: string;

    @IsArray()
    @IsArray({each: true})
    coordinates: number[][][];
}

class AddressDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(['Point'])
    type: string;

    @IsArray()
    @IsLongitude({each: true})
    @IsLatitude({each: true})
    coordinates: number[]
}

export class CreatePartnerDto {
    @IsString()
    @IsNotEmpty()
    tradingName: string;

    @IsString()
    @IsNotEmpty()
    ownerName: string;

    @IsString()
    @IsNotEmpty()
    @IsDocumentUnique()
    document: string;

    @ValidateNested()
    @Type(() => CoverageAreaDto)
    coverageArea: CoverageAreaDto

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto
}