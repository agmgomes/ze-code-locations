import { registerDecorator, ValidationOptions } from "class-validator";
import { IsDocumentUniqueConstraint } from "./document-unique.validator";

export function IsDocumentUnique(validationsOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsDocumentUnique',
            target: object.constructor,
            propertyName,
            options: validationsOptions,
            constraints: [],
            validator: IsDocumentUniqueConstraint,
        });
    };  
}