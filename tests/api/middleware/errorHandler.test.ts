import { ResourceNotFoundError } from "utils/errors/resourceNotFoundError";
import { ValidationError } from "utils/errors/validationError";
import { BadError } from "utils/errors/badError";
import { StatusCode } from "utils/statusCode";
import { errorHandler } from "api/middlewares";

describe("errorHandler", () => {
    let mockRequest, mockResponse, mockNext;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    describe("When the error is an instance of ValidationError", () => {
        it("should handle the response format correctly", () => {
            const validationError = new ValidationError("Validation failed");
            errorHandler(validationError, mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(
                StatusCode.unprocessableEntity,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                code: StatusCode.unprocessableEntity,
                name: validationError.name,
                message: validationError.message,
            });
        });
    });

    describe("When the error is an instance of ResourceNotFoundError", () => {
        it("should handle the response format correctly", () => {
            const resourceNotFoundError = new ResourceNotFoundError(
                "Resource not found",
            );
            errorHandler(
                resourceNotFoundError,
                mockRequest,
                mockResponse,
                mockNext,
            );

            expect(mockResponse.status).toHaveBeenCalledWith(
                StatusCode.notFound,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                code: StatusCode.notFound,
                name: resourceNotFoundError.name,
                message: resourceNotFoundError.message,
            });
        });
    });

    describe("When the error is an instance of BadError", () => {
        it("should handle the response format correctly", () => {
            const badError = new BadError("Bad request");
            errorHandler(badError, mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(
                StatusCode.badRequest,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                code: StatusCode.badRequest,
                name: badError.name,
                message: badError.message,
            });
        });
    });

    describe("When the error is not of the known types", () => {
        it("should handlethe response format with default serverError", () => {
            const unknownError = new Error("Some unknown error");
            errorHandler(unknownError, mockRequest, mockResponse, mockNext);

            expect(mockResponse.status).toHaveBeenCalledWith(
                StatusCode.serverError,
            );
            expect(mockResponse.json).toHaveBeenCalledWith({
                code: StatusCode.serverError,
                name: unknownError.name,
                message: unknownError.message,
            });
        });
    });
});