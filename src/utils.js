export const callWrapperComponentOnGridReady = ({ props, params }) => {
    if (props.onGridReady != null) {
        props.onGridReady(params)
    } else if (props.agGridApiProps.onGridReady != null) {
        props.agGridApiProps.onGridReady(params)
    }
}

export const warnThatAgGridHasNotLoadedYet = () => {
    console.warn('Ag grid has not loaded yet or you haven\'t passed onGridReady callback to AgGridReact component')
}
