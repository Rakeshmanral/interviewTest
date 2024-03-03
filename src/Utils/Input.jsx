import React from 'react'

const Input = ({ label, type, id, placeholder }) => {
  return (
    <div className="form-group mb-3">
          <label htmlFor={id}>{label}</label>
          <input
            type={type}
            className="form-control"
            id={id}
            placeholder={placeholder}
            required=""
            {...register("Title", {required: true, maxLength: 80})}
          />
        </div>
  )
}

export default Input