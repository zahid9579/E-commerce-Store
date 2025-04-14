
// import { isValidObjectId } from "mongoose";

// function checkId(req, res, next) {
//     if(!isValidObjectId(req.params.checkId)){
//         res.status(404)
//         throw new Error(`Invalid object of: ${req.params.id}`)
//     }
//     next()
// }

// export default checkId;



import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    const id = req.params.id?.trim();

    if (!isValidObjectId(id)) {
        res.status(400); // 400 = Bad Request (not found is 404)
        throw new Error(`Invalid object of: ${id}`);
    }

    next();
}

export default checkId;
