const fs = require("fs");
var request = require('./request.js') 

request.GETValue((result)=> {
	let all_list = result.nodes;
	const keys = result.key; 
	let old_list = [];                                                                                                    // parent level node id list
	let new_list = [];                                                                                                    //  down level node id list
	let return_text = '';
	const position = [0,1]                                                                                                // 0 - left child, 1 - right child
	
	if (typeof all_list === 'undefined') {
		console.log('Data is missing!');
	} else {
		// searching the root node
		for(var i in all_list) { 
			if (all_list[i].parent === "") {
				return_text += keys[(all_list[i].value)];                                                     // adding find letter
				new_list.push(all_list[i].id);                                                                // parent level node
				all_list.splice(i,1);                                                                         // delete node for list
				break;
			}
		}
		while (all_list.length > 0) {
				for (var k in old_list) {                                                                      // parent level
					for (var pos in position){                                                             // going for position (first left, secode right)
						for (var j in all_list) {                                                      // going for all list
							if (all_list[j].parent === old_list[k]) {  
								if ((position[pos] === 0 && all_list[j].weight%2 == 0)||       // left child
									(position[pos] === 1 && all_list[j].weight%2 == 1)) {  // right child
									return_text += keys[(all_list[j].value)];              // adding find letter
									new_list.push(all_list[j].id);                         // adding node to down level list
									all_list.splice(j,1);                                  // delete node for list
									break;	
								} 
							}
						}
					}
				}
			old_list = new_list;                                                                                  // down level become parent level in next step
			new_list = [];                                                                                        // down level empty
		}
	}
	console.log(return_text);
	request.POSTValue(return_text);
});



