export class OperationResult<TResult, TError> {
    public readonly result?: TResult;
    public readonly error?: TError;

    private constructor(result?: TResult, error?: TError) {
        this.result = result;
        this.error = error;
    }

    static createSuccessful<TResult>(result: TResult) {
        return new OperationResult(result);
    }

    static createFailed<TError>(error: TError) {
        return new OperationResult(undefined, error);
    }
}
