/**
 * version 1.1.7
 */
import request from 'request.js'
class apiconfig {
  constructor(config = {}) {
        this.baseurl= 'http://42.193.146.14/'
		this.pathconfig= {
			reg: this.baseurl +'register/register',
			conversation: this.baseurl + 'app/conversation'
		}
  }
  register(config){
  	   return request.post(this.pathconfig.reg, config);
  }
  getConversationList(config){
  	   return request.post(this.pathconfig.conversation, config);
  }
}

if (!global.$apiconfig) {
  global.$apiconfig = new apiconfig();
}

export default global.$apiconfig;