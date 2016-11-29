move(){
    var j;
    const {key, blocks} = this.state;
    switch(key){
      case 'U':
        for(let i = 0; i < 4; i++){
          for (let k = 0; k < 4; k++){
            j = i+4*k;
            while(j <12){
              this.merge(j, j+4);
              j += 4;
            }
          }
        }
        console.log('U');
        break;
      case 'D':
        for(let i = 0; i < 4; i++){
          for (let k = 0; k < 4; k++){
            j = 15-i-4*k;
            while(j > 3){
              this.merge(j, j-4);
                j -= 4;
            }
          }
        }
        console.log('D');
        break;
      case 'L':
        for(let i = 0; i < 4; i++){
          for (let k = 0; k < 4; k++){
            j = 4*i+k;
            while(j < 4*i+3){
              this.merge(j, j+1);
              j += 1;
            }
          }
        }
        console.log('L');
        break;
      case 'R':
        for(let i = 0; i < 4; i++){
          for (let k = 0; k < 4; k++){
            j = 4*i+3-k;
            while(j> 4*i){
              this.merge(j, j-1);
                j -= 1;
            }
          }
        }
        console.log('L');
        break;
    };
    this.newblock();
  }

