import { serverHttp } from './http'
import './websocket'
serverHttp.listen(8000, () => console.log("Server running! Let's Go"))
