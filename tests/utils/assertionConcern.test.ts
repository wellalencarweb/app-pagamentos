import { AssertionConcern } from "utils/assertionConcern";
import { ValidationError } from "utils/errors/validationError";

describe("Assertion Concern", () => {
    describe("Given assertArgumentNotEmpty", () => {
        describe("When the sent argument is empty", () => {
            it("should throw an Validation Error when a null value is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        null,
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
            it("should throw an Validation Error when a undefined value is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        undefined,
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
            it("should throw an Validation Error when an empty object is sent", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        {},
                        "Item should not be empty",
                    );
                }).toThrow(new ValidationError("Item should not be empty"));
            });
        });
        describe("When the sent argument is not empty", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentNotEmpty(
                        "not empty",
                        "Item should not be empty",
                    );
                }).not.toThrow(new ValidationError("Item should not be empty"));
            });
        });
    });
    describe("Given assertArgumentIsValid", () => {
        describe("When the sent argument is not present in the valid types", () => {
            it("should throw an Validation Error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValid(
                        "cerveja",
                        ["lanche", "bebida"],
                        "Invalid type",
                    );
                }).toThrow(new ValidationError("Invalid type"));
            });
        });
        describe("When the argument is valid", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsValid(
                        "lanche",
                        ["lanche", "bebida"],
                        "Invalid type",
                    );
                }).not.toThrow(new ValidationError("Invalid type"));
            });
        });
    });
    describe("Given assertArgumentIsBiggerThanZero", () => {
        describe("When the sent argument is not bigger than zero", () => {
            it("should throw an Validation Error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsBiggerThanZero(
                        -2,
                        "Value should be bigger than zero",
                    );
                }).toThrow(
                    new ValidationError("Value should be bigger than zero"),
                );
            });
        });
        describe("When the argument is bigger than zero", () => {
            it("should not throw any error", () => {
                expect(() => {
                    AssertionConcern.assertArgumentIsBiggerThanZero(
                        20,
                        "Value should be bigger than zero",
                    );
                }).not.toThrow(
                    new ValidationError("Value should be bigger than zero"),
                );
            });
        });
    });
});