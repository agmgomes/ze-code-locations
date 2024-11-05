import { IsMongoId } from "class-validator";

export class FindPartnerByIdDto {
    @IsMongoId({message: "Invalid partner ID"})
    id: string;
}