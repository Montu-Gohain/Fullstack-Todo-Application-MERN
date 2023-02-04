import axios from "axios"

export default function protectedRequest () {
    const user = JSON.parse(localStorage.getItem("user"))
    return axios.create({
        headers : {
            "Authorization" :  `Bearer ${user?.token}`
        }
    })
}