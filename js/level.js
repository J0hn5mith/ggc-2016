var LevelComposite = function(levels){
    this.levels = [new Level()];
}

LevelComposite.prototype.heightOfLevel = function(levelNum){
    var total = 0;
    for(iLevel in this.levels) {
        total += this.levels[iLevel].height;
    }
    return total;
}


var Level = function(){
    this.height = 200;
}
