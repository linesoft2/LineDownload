export default class Aria2Requester {
    constructor() {

    }
    async request(param) {
        if (!param.params) {
            param.params = []
        }
        param.params=["token:linedownloadtest",...param.params]
        const body = {
            jsonrpc: "2.0",
            id: 1,
            method: param.method,
            params: param.params
        }
        let result = await fetch("http://127.0.0.1:9695/jsonrpc", {
            method: "POST",
            body: JSON.stringify(body)
        })
        if (result.status !== 200 && param.ignoreError !==true ) {
            throw new Error("aria2通信错误：" + await result.text())
        }

        return (await result.json()).result
    }
}