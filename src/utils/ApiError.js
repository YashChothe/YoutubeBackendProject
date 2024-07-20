class ApiError extends Error{

    constructor(
        statuscode,
        message = "Somethind went wrong",
        errors = [],
        stack =""

    ){

        super(message)
        this.statuscode = statuscode
        this.errors = errors
        this.message = message
        this.success = false
        this.data = null

        if (stack) {
            this.stack = stack
            
        }else{
            Error.captureStackTrace(this,this.constuctor)
        }

    }
}

export {ApiError}