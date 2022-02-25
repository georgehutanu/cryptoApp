import { Action, IUser } from "../shared/interfaces"
import { Actions } from "../actions/types"
import { userDefault } from "./defaultValues"


export default (user: IUser = userDefault, action: Action<IUser>) => {
    const {type, payload} = action
    switch(type){
        case Actions.LOAD_USER:
            return {...payload }
        default:
            return user
    }
}