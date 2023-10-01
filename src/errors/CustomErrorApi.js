class CustomErrorApi extends Error {
    constructor(message, error) {
        super(message)
        this.error = error
    }
}

export default CustomErrorApi