import React from 'react'
import {
  iconStyle,
  labelStyle,
  networkStyle,
  statusStyle,
  txMetaRowRightStyle,
  txMetaRowStyle
} from '../utils/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { editNetwork, saveNetwork, setError, connectToNetwork } from '../actions'
import { InputTooltip } from './InputTooltip'

export function Network () {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const {
    editing,
    status,
    endpoint,
  } = state.network

  const [endpointInput, setEndpointInput] = React.useState(endpoint)

  React.useEffect(() => {
    // in case network changes after render
    setEndpointInput(endpoint)
  }, [endpoint])

  const onEdit = () => {
    dispatch(editNetwork(true))
  }
  const onSave = async () => {
    dispatch(saveNetwork(endpointInput))
  }
  const onCancel = () => {
    // reset to state values
    setEndpointInput(endpoint)
    dispatch(editNetwork(false))
    dispatch(setError())
  }

  const onRefresh = () => {
    dispatch(connectToNetwork(endpoint))
  }

  return <form style={networkStyle}
    onSubmit={async (e) => {
      e.preventDefault()
      await onSave()
    }}>
    <div style={txMetaRowStyle}>
      <div style={labelStyle}>
        Conflux RPC
      </div>
      <InputTooltip
        enabled={editing}
        text="This should be the url for your conflux node\'s RPC endpoint. It should include http(s), host/ip, and port. For example: http://localhost:12539/">
        <input className="form-control"
               // placeholder="http://localhost:12539"
               type="text"
               disabled={!editing}
               value={endpointInput}
               onChange={(e) => setEndpointInput(
               e.target.value)}/>
      </InputTooltip>
    </div>
    {editing ?
      <div style={txMetaRowRightStyle}>
        <i style={iconStyle} className="fa fa-close"
           onClick={() => onCancel()}/>
        <i style={iconStyle} className="fa fa-check" onClick={() => onSave()}/>
      </div>
      :
      <div style={txMetaRowRightStyle}>
        <div style={statusStyle(status)}>{status}</div>
        <i style={iconStyle} className="fa fa-refresh"
           onClick={() => onRefresh()}/>
        <i style={iconStyle} className="fa fa-pencil" onClick={() => onEdit()}/>
      </div>
    }
    <button type="submit" style={{display: 'none'}} />
  </form>
}
