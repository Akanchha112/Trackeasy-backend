const zod=require('zod');
const Userzod=zod.object({
    username:zod.string(),
    password:zod.string().min(3, { message: "Must be 3 or more characters long" })
})
const createtodozod=zod.object({
    title:zod.string(),
    description:zod.string()
})
const updatetodo=zod.object({
    id:zod.string()
})
module.export={
    Userzod:Userzod,
    createtodozod:createtodozod,
    updatetodo:updatetodo
}