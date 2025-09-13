import React from "react"

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-brand rounded-full animate-spin" />
    </div>
  )
}

export default Loader
