import React from 'react'
import baseURL from '../../shared/baseURL'
import useFetch from '../../hooks/useFetch'

const FeaturedProperty = () => {
    const url = `${baseURL}properties/featured`

    const featuredPropterties = async () => {
        const response = await fetch(`${url}/${id}`)
        const data = await response.json()
        return data
    }
  return (
    <div>
      
    </div>
  )
}

export default FeaturedProperty
