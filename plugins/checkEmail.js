import Vue from 'vue'

Vue.prototype.$checkEmail = (value) => {
    if(value)
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        } else {
            return false;
        }    
    }
    else {
        return false;
    }
	
}