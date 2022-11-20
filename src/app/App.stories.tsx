import React from "react"
import {
    ReduxStoreProviderDecorator
} from "../stories/decorators/ReduxStoreProviderDecorator"
import {App} from "./App";

export default {
    title: 'App Stories',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = () => {
    return (<App demo={true} />)
}
