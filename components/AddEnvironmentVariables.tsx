'use client'

import { useEffect } from 'react'

interface AddEnvironmentVariablesProps {
  names: string[]
  values: Record<string, string>
}

const AddEnvironmentVariables: React.FC<AddEnvironmentVariablesProps> = ({ names, values }) => {
  useEffect(() => {
    names.forEach(name => {
      if (values[name]) {
        process.env[name] = values[name]
      }
    })
  }, [names, values])

  return null
}

export default AddEnvironmentVariables

