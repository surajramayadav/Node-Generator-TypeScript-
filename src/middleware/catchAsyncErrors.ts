const catchAsyncErrors = asyncFun => (req, res, next) => {
        Promise.resolve(asyncFun(req, res, next))
                .catch(next)
}

export default catchAsyncErrors;