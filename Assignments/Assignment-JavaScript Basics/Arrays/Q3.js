const arr= [1, 2, 3, 4];    
let max=arr[0];  

for(let i=1; i<arr.length; i++){   
    if(arr[i]>max){ 
        max=arr[i];
    }
}

console.log(max);