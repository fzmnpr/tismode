import axios from 'axios'

export const getCityList = (value) => axios.get(`https://iran-locations-api.vercel.app/api/v1/cities?state=${value}`)
export const getProvinceList = () => axios.get('https://iran-locations-api.vercel.app/api/v1/states')
