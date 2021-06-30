/**
 * version 1.1.7
 */
import request from 'request.js'
class apiconfig {
  constructor(config = {}) {
        this.baseurl= 'http://120.27.95.106:9998/';
		this.pathconfig={
			reg: this.baseurl +'/register/register'
		}
  }
  register(config){
  	   return request.post(this.pathconfig.reg,config);
  }
}

if (!global.$apiconfig) {
  global.$apiconfig = new apiconfig();
}

export default global.$apiconfig;