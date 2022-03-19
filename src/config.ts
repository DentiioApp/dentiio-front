import { $ } from '../jquery-3.1.1';


$('img').mousedown(function (e : any) {
    if(e.button == 2) { // right click
        return false; // do nothing!
    }
});

export{

    
}