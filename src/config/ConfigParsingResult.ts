export class ConfigParsingResult<TResult, TError> {
    public readonly result?: TResult;
    public readonly error?: TError;

    private constructor(result?: TResult, error?: TError) {
        this.result = result;
        this.error = error;
    }

    static createSuccessful<TResult, TError>(result: TResult) {
        return new ConfigParsingResult<TResult, TError>(result);
    }

    static createFailed<TResult, TError>(error: TError) {
        return new ConfigParsingResult<TResult, TError>(undefined, error);
    }
}
