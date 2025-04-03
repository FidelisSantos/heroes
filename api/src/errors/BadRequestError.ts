class BadRequestError extends Error{
    constructor(message:string | string[]) {
        super(message instanceof Array ? message.join('; '):  message);
    }
};

export default BadRequestError;