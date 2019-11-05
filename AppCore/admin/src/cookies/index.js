import { Cookies } from 'react-cookie'
class Token{
    constructor(){
        this.cookies = new Cookies()
    }
}
export default Token