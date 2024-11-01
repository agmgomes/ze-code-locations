import { forwardRef, Module } from "@nestjs/common";
import { IsDocumentUniqueConstraint } from "./document-unique.validator";
import { PartnersService } from "../partners.service";
import { PartnersModule } from "../partners.module";

@Module({
    imports: [
        forwardRef(() => PartnersModule)
    ],
    providers: [
        IsDocumentUniqueConstraint
    ],
    exports: [IsDocumentUniqueConstraint]
})
export class ValidationModule {}