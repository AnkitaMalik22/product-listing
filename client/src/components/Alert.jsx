import React,{useState} from 'react'

export const AlertError = ({errorMessage}) => {
  // const [close, setClose] = useState(false)

  return (
    <div className="alert-back" >
      <div className="alert-box">
        {/* <div className="close" onClick={setClose(true)}>X</div> */}
        <div className="alert flex flex-col">
         <h1 className={`alert-title alert-error`} >ERROR!</h1>
         <div className="alert-message">{errorMessage}!</div>
        </div>
      </div>
    </div>
  )
}
export const AlertSuccess = ({successMessage}) => {
  // const [close, setClose] = useState(false)

  return (
    <div className="alert-back" >
      <div className="alert-box">
        {/* <div className="close" onClick={setClose(true)}>X</div> */}
        <div className="alert flex flex-col">
         <h1 className={`alert-title alert-success`} >SUCCESS!</h1>
         <div className="alert-message">{successMessage}!</div>
        </div>
      </div>
    </div>
  )
}

