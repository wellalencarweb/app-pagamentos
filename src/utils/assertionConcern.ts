import { ValidationError } from "utils/errors/validationError";

export class AssertionConcern {
    public static assertArgumentNotEmpty<T>(arg: T, message: string): void {
        if (
            arg === null ||
            arg === undefined ||
            (typeof arg === "object" && Object.keys(arg).length === 0)
        ) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsValid(
        arg: string,
        acceptedTypes: string[],
        message: string,
    ): void {
        if (!acceptedTypes.includes(arg)) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsBiggerThanZero(
        arg: number,
        message: string,
    ): void {
        if (arg <= 0) {
            throw new ValidationError(message);
        }
    }

    public static assertArgumentIsObjectId(id: string, message: string): void {
        const ObjectIdRegex = /^[a-f\d]{24}$/i;
        if (!ObjectIdRegex.test(id)) {
            throw new ValidationError(message);
        }
    }
}
