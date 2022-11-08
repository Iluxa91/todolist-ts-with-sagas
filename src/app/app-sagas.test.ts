import {call, put} from "redux-saga/effects";
import {authAPI, MeResponseType} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {setAppInitializedAC} from "./app-reducer";
import {initializeAppWorkerSaga} from "./app-sagas";

let meResponse:MeResponseType;

beforeEach(()=>{
    meResponse = {
        resultCode: 0,
        data: { login: "", email: "", id: 12 },
        messages: []
    }
})

test("initializeAppWorkerSaga login success", () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setIsLoggedInAC(true)))

    result = gen.next()
    expect(result.value).toEqual(put(setAppInitializedAC(true)))
})

test("initializeAppWorkerSaga login unsuccess", () => {
    const gen = initializeAppWorkerSaga()
    let result = gen.next()
    expect(result.value).toEqual(call(authAPI.me))

    meResponse.resultCode = 1
    result = gen.next(meResponse)
    expect(result.value).toEqual(put(setAppInitializedAC(true)))
})