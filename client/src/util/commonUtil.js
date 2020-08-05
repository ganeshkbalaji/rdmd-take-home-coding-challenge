
async function withError(operation) {
    try {
        return await operation()
    } catch (error) {
        if (!(error instanceof TypeError)) throw error
        this.setState({ error })
    }
}

module.exports.withError = withError