import React, { PureComponent as Component, PropTypes } from 'react'

export const AgGridRetainSorting = DecoratedComponent => {
    class AgGridRetainSorting extends Component {
        constructor() {
            super()

            this.state = {}
            this.state.gridParams = {}
            this.state.isGridReady = false
        }

        setColumnSortOptions = sortOptions => {
            this.api.setSortModel(sortOptions)
        }

        onGridReady = params => {
            this.setState({
                isGridReady: true,
                gridParams: params
            })

            let sortOptions = {}

            params.api.addEventListener('sortChanged', () => {
                sortOptions = params.api.getSortModel()
            })

            params.api.addEventListener('newColumnsLoaded', () => {
                this.setColumnSortOptions(sortOptions)
            })

            if (this.props.onGridReady) {
                this.props.onGridReady(params)
            }
        }

        render() {
            const { isGridReady, gridParams } = this.state

            return (
                <DecoratedComponent
                    {...this.props}
                    isGridReady={isGridReady}
                    gridParams={gridParams}
                    onGridReady={this.onGridReady}
                />
            )
        }
    }

    AgGridRetainSorting.propTypes = {
        onGridReady: PropTypes.func
    }

    AgGridRetainSorting.displayName = `AgGridRetainSorting(${DecoratedComponent.displayName})`

    return AgGridRetainSorting
}
